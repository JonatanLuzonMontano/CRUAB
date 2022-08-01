<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case'GET':
        $query = "SELECT llogamanual.NumLloguer, llogamanual.Copia, llogamanual.Solicitud, llogamanual.Recollida, llogamanual.Retorn, membres.numsoci, membres.nom, membres.primercognom, manuals.Imatge
                  FROM (llogamanual LEFT JOIN membres ON llogamanual.Numsoci=membres.numsoci) LEFT JOIN manuals ON manuals.Nom=llogamanual.Nommanual
                  WHERE Recollida IS NULL AND Retorn IS NULL AND llogamanual.NumLloguer NOT IN (SELECT llogamanual.NumLloguer FROM autoritzamanual, llogamanual WHERE autoritzamanual.Lloguer = llogamanual.NumLloguer)";

        $result = dbconnselect($query);
        $msg = array();

        while($values = mysqli_fetch_assoc($result)){
            $msg[] = $values;
        }        
        break;
    case 'POST';
        $_POST = json_decode(file_get_contents('php://input'), true);
        
        $numlloguer = assegurarInputs($_POST["numlloguer"]);
        $numsoci = assegurarInputs($_POST["numsoci"]);
        $data = date("Y-m-d");

        $queryselect = "SELECT *
                FROM llista
                WHERE membre=$numsoci AND JuntaActual=1";
        $result = dbconnselect($queryselect);
        $membre = array();
        $membre = mysqli_fetch_assoc($result);
        
        $queryinsert = "INSERT INTO `cruab`.`autoritzamanual` (`Lloguer`, `Any`, `Convocatoria`, `Nom`, `Carrec`, `Dataautoritzacio`, `Autoritzat`)
                VALUES ($numlloguer, '".$membre["Any"]."', ".$membre["Convocatoria"].", '".$membre["Nom"]."', '".$membre["Carreg"]."', '$data', 1)";

        $result = dbconninsert($queryinsert);
        if(substr($result, 0, 5) == "Error"){
            $msg["InsertError"] = "Error al inserir les dades. comproba que tot estigui correcte";
            $msg["InsertDeBug"] = $result;
        } else {
            $msg["InsertCorrecte"] = "Tot ok";
        }

        break;
    case 'DELETE':

        $numlloguer = assegurarInputs($_GET["numlloguer"]);
        $numsoci = assegurarInputs($_GET["numsoci"]);
        $data = date("Y-m-d");

        $queryselect = "SELECT *
                  FROM llista
                  WHERE membre=$numsoci AND JuntaActual=1";
        $result = dbconnselect($queryselect);
        $membre = array();
        $membre = mysqli_fetch_assoc($result);

        $queryinsert = "INSERT INTO `cruab`.`autoritzamanual` (`Lloguer`, `Any`, `Convocatoria`, `Nom`, `Carrec`, `Dataautoritzacio`, `Autoritzat`)
                  VALUES ($numlloguer, '".$membre["Any"]."', ".$membre["Convocatoria"].", '".$membre["Nom"]."', '".$membre["Carreg"]."', '$data', 0)";

        $result = dbconninsert($queryinsert);
        if(substr($result, 0, 5) == "Error"){
            $msg["InsertError"] = "Error al inserir les dades. comproba que tot estigui correcte";
            $msg["InsertDeBug"] = $result;
        } else {
            $msg["InsertCorrecte"] = "Tot ok";
        }

        $queryupdate = "UPDATE `cruab`.`llogamanual` SET `Retorn`='$data' WHERE  `NumLloguer`=$numlloguer;";

        $result = dbconnupdate($queryupdate);
        if(substr($result, 0, 5) == "Error"){
            $msg["UpdateError"] = "Error al inserir les dades. comproba que tot estigui correcte";
            $msg["UpdateDeBug"] = $result;
        } else {
            $msg["UpdateCorrecte"] = "Tot ok";
        }

        break;
    default:
        http_response_code(400);
        echo "wrong method";
        break;
}

echo json_encode($msg, JSON_NUMERIC_CHECK, JSON_UNESCAPED_UNICODE);

?>