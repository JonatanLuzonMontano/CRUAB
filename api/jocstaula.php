<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case'GET':
        $query='SELECT * FROM jocstaula';
        $result = dbconnselect($query);
        $msg = array();

        while($values = mysqli_fetch_assoc($result)){
            $msg[] = $values;
        }

        break;
    case 'POST':

        $nom = assegurarInputs($_POST["nom"]);
        $querychecknom = "SELECT Nom FROM jocstaula WHERE Nom='$nom';";
        $resultcheck = dbconnselect($querychecknom);

        if($resultcheck = mysqli_fetch_array($resultcheck)){
            $msg["Error"] = "Ja existeix un joc amb aquest nom";
        }else{

            $uploaddir = '../img/jocs/';
            $uploadfile = $uploaddir . basename($nom) . ".jpg";
            $dbdir = mysqli_real_escape_string(getconn(), 'img\\jocs\\' . basename($nom) . ".jpg");
            
            $query = sprintf(
                "INSERT INTO jocstaula (Nom, MinJugadors, MaxJugadors, Duracio, Dificultat, Editorial, Tipus, Imatge)"
                ." VALUES ('%s', '%d', '%d', %d, '%d', '%s', '%s', '%s')",
                $nom,
                assegurarInputs($_POST["minjugadors"]),
                assegurarInputs($_POST["maxjugadors"]),
                assegurarInputs($_POST["duracio"]),
                assegurarInputs($_POST["dificultat"]),
                assegurarInputs($_POST["editorial"]),
                assegurarInputs($_POST["tipus"]),
                $dbdir
            );

            $resultat = dbconninsert($query);

            if(substr($resultat, 0, 5) == "Error"){
                $msg["Error"] = "Error al inserir les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultat;
            } else {
                $msg["Correcte"] = "Tot ok";
            }

            
            if (move_uploaded_file(assegurarInputs($_FILES['img-uploader']['tmp_name']), $uploadfile)) {
                $msg["img-correcte"] = "File is valid, and was successfully uploaded.";
            } else {
                $msg["img-error"] = "Possible file upload attack!";
            }
            
            header('Location: /jocstaula.html');
        }

        break;
    case 'DELETE':
        $nom = assegurarInputs($_GET['nom']);
        $query = "DELETE FROM jocstaula WHERE Nom='$nom'";
        $resultat = dbconndelete($query);
        unlink('../img/jocs/'.$nom.'.jpg');
        if(substr($resultat, 0, 5) == "Error"){
            $msg["Error"] = "Error al esborrar les dades. comproba que tot estigui correcte";
            $msg["DeBug"] = $resultat;
        } else {
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