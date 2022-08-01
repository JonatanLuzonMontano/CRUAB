<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case'GET':
        $query='SELECT * FROM manuals';
        $result = dbconnselect($query);
        $msg = array();

        while($values = mysqli_fetch_assoc($result)){
            $msg[] = $values;
        }

        break;
    case 'POST':

        $nom = assegurarInputs($_POST["nom"]);
        $querychecknom = "SELECT Nom FROM manuals WHERE Nom='$nom';";
        $resultcheck = dbconnselect($querychecknom);

        if($resultcheck = mysqli_fetch_array($resultcheck)){
            $msg["Error"] = "Ja existeix un manual amb aquest nom";
        }else{
                        
            $uploaddir = '../img/manuals/';
            $uploadfile = $uploaddir . basename($nom) . ".jpg";
            $dbdir = mysqli_real_escape_string(getconn(), 'img\\manuals\\' . basename($nom) . ".jpg");

            $query = sprintf(
                "INSERT INTO manuals (Nom, Genere, Ambientacio, Editorial, Coleccio, Adquirit, Imatge)"
                ." VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s')",
                $nom,
                assegurarInputs($_POST["genere"]),
                assegurarInputs($_POST["ambientacio"]),
                assegurarInputs($_POST["editorial"]),
                assegurarInputs($_POST["coleccio"]),
                assegurarInputs($_POST["adquirit"]),
                $dbdir
            );

            $resultat = dbconninsert($query);

            if(substr($resultat, 0, 5) == "Error"){
                $msg["Error"] = "Error al inserir les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultat;
            } else {
                $msg["Correcte"] = "Tot ok";
            }

            if (move_uploaded_file($_FILES['img-uploader']['tmp_name'], $uploadfile)) {
                $msg["img-correcte"] = "File is valid, and was successfully uploaded.";
            } else {
                $msg["img-error"] = "Possible file upload attack!";
            }
            
            header('Location: http://www.cruab.local/manuals.html');

        }

        break;
    case 'DELETE':
        $nom = assegurarInputs($_GET['nom']);
        $query = "DELETE FROM manuals WHERE Nom='$nom'";
        $resultdelete = dbconndelete($query);
        if(substr($resultdelete, 0, 5) == "Error"){
            $msg["Error"] = "Error al esborrar les dades. comproba que tot estigui correcte";
            $msg["DeBug"] = $resultdelete;
        } else {
            unlink('../img/manuals/'.$nom.'.jpg');
            $msg["Correcte"] = "Tot ok";
        }
        break;
    default:
        http_response_code(400);
        echo "wrong method";
        break;
}

echo json_encode($msg, JSON_NUMERIC_CHECK, JSON_UNESCAPED_UNICODE);

?>