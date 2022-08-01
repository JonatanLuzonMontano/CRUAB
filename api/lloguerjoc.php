<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case'GET':
        $numsoci = assegurarInputs($_GET["numsoci"]);

        $query = "SELECT jocstaula.Imatge, llogajoc.NumLloguer, llogajoc.Copia, llogajoc.Recollida, llogajoc.Retorn
                  FROM (llogajoc INNER JOIN autoritzajoc ON llogajoc.NumLloguer=autoritzajoc.Lloguer) LEFT JOIN jocstaula ON llogajoc.Nomjoc=jocstaula.Nom
                  WHERE llogajoc.numsoci=$numsoci AND autoritzajoc.Autoritzat=1 AND llogajoc.Retorn IS NULL";
        $result=dbconnselect($query);

        while($values=mysqli_fetch_assoc($result)){
            $msg[]=$values;
        }
        break;

    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'), true);
        $usuari = assegurarInputs($_POST["usuari"]);
        $joc = assegurarInputs($_POST["joc"]);
        $copia = assegurarInputs($_POST["copia"]);
        $queryselect = "SELECT llogajoc.NumLloguer
                        FROM llogajoc
                        WHERE llogajoc.Nomjoc='$joc' 
                            AND llogajoc.Copia=$copia 
                            AND llogajoc.Solicitud IS NOT NULL 
                            AND llogajoc.Retorn IS null";
        $resultselect = dbconnselect($queryselect);
        
        if($value=mysqli_fetch_assoc($resultselect)){
            $msg["Error"] = "Hi ha hagut un error. Aquest manual ja està reservat. La pàgina s'actualitzarà per veure els canvis.";
        } else {
            $data = date("Y-m-d");
            $query = "INSERT INTO `cruab`.`llogajoc` (`Numsoci`, `Nomjoc`, `Copia`, `Solicitud`) VALUES ('$usuari', '$joc', '$copia', '$data');";
            $resultinsert = dbconninsert($query);
            if(substr($resultinsert, 0, 5) == "Error"){
                $msg["Error"] = "Error al inserir les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultinsert;
            } else {
                $msg["Correcte"] = "Tot ok";
            }
        }
        
        break;

    case 'PUT':
        $_POST = json_decode(file_get_contents('php://input'), true);

        $numlloguer = assegurarInputs($_POST["numlloguer"]);
        $data = date("Y-m-d");
        $query = "UPDATE `cruab`.`llogajoc` SET `Recollida`='$data' WHERE  `NumLloguer`=$numlloguer;";
        $resultinsert = dbconnupdate($query);
        
        if(substr($resultinsert, 0, 5) == "Error"){
            $msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
            $msg["DeBug"] = $resultinsert;
        } else {
            $msg["Correcte"] = "Tot ok";
        }

        break;
        
    case 'DELETE':

        $numlloguer = assegurarInputs($_GET["numlloguer"]);
        $data = date("Y-m-d");
        $query = "UPDATE `cruab`.`llogajoc` SET `Retorn`='$data' WHERE  `NumLloguer`=$numlloguer;";
        $resultinsert = dbconnupdate($query);
        
        if(substr($resultinsert, 0, 5) == "Error"){
            $msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
            $msg["DeBug"] = $resultinsert;
        } else {
            $msg["Correcte"] = "Tot ok";
        }

        break;
        break;
    default:
        http_response_code(400);
        echo "wrong method";
        break;
}

echo json_encode($msg, JSON_NUMERIC_CHECK, JSON_UNESCAPED_UNICODE);

?>