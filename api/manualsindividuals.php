<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case'GET':
        $nom = assegurarInputs($_GET['nom']);
        $query = "  SELECT manualindividual.Nom, manualindividual.Numcopia, llogamanual.NumLloguer, llogamanual.Solicitud, llogamanual.Recollida, llogamanual.Retorn, manuals.Imatge
                    FROM (llogamanual RIGHT JOIN
                        manualindividual ON llogamanual.Nommanual=manualindividual.Nom
                                            AND llogamanual.Copia=manualindividual.Numcopia) LEFT JOIN
                                            manuals ON manualindividual.Nom=manuals.Nom
                    WHERE manualindividual.Nom='$nom' AND (llogamanual.NumLloguer IN
                        (SELECT MAX(llogamanual.NumLloguer)
                        FROM (llogamanual RIGHT JOIN manualindividual
                            ON llogamanual.Copia = manualindividual.Numcopia)
                        WHERE manualindividual.Nom='$nom' GROUP BY llogamanual.Nommanual, llogamanual.Copia) or
                        llogamanual.NumLloguer IS NULL)
                    ORDER BY manualindividual.Numcopia";

        $result = dbconnselect($query);
        $msg = array();

        while($values = mysqli_fetch_assoc($result)){
            $msg[] = $values;
        }
        break;

    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'), true);
        $nom = assegurarInputs($_POST["nom"]);

        $getnum = "SELECT NumCopia FROM manualindividual WHERE Nom='$nom';";
        $resultselect = dbconnselect($getnum);
        
        $cont = 1;
        $trobat = false;

        while(!$trobat){
            if($values = mysqli_fetch_assoc($resultselect)){
                if($values["NumCopia"] == $cont){
                    $cont = $cont + 1;
                } else {
                    $trobat = true;
                }
            } else {
                $trobat = true;
            }

        }

        $query = "INSERT INTO `cruab`.`manualindividual` (`Nom`, `NumCopia`) VALUES ('$nom', '$cont');";
        $resultinsert = dbconninsert($query);
        if(substr($resultinsert, 0, 5) == "Error"){
            $msg["Error"] = "Error al inserir les dades. comproba que tot estigui correcte";
            $msg["DeBug"] = $resultinsert;
        } else {
            $msg["Correcte"] = "Tot ok";
        }
        
        break;

    case 'DELETE':
        
        $nom = assegurarInputs($_GET["Nom"]);
        $numcopia = assegurarInputs($_GET["NumCopia"]);
        $query = "DELETE FROM manualindividual WHERE NumCopia=$numcopia AND Nom='$nom';";
        echo $query;
        $resultdelete = dbconndelete($query);
        if(substr($resultdelete, 0, 5) == "Error"){
            $msg["Error"] = "Error al esborrar les dades. comproba que tot estigui correcte";
            $msg["DeBug"] = $resultdelete;
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