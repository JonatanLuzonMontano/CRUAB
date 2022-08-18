<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case'GET':
        $msg = null;
        $numsoci = assegurarInputs($_GET["numsoci"]);
        $query = "SELECT manuals.Imatge, llogamanual.NumLloguer, llogamanual.Copia, llogamanual.Recollida, llogamanual.Retorn
                  FROM (llogamanual INNER JOIN autoritzamanual ON llogamanual.NumLloguer=autoritzamanual.Lloguer) LEFT JOIN manuals ON llogamanual.Nommanual=manuals.Nom
                  WHERE llogamanual.numsoci=$numsoci AND autoritzamanual.Autoritzat=1 AND llogamanual.Retorn IS NULL";
        $result=dbconnselect($query);
        while($values=mysqli_fetch_assoc($result)){
            $msg[]=$values;
        }
        break;

    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'), true);
        $usuari = assegurarInputs($_POST["usuari"]);
        $manual = assegurarInputs($_POST["manual"]);
        $copia = assegurarInputs($_POST["copia"]);

        $queryselect = "SELECT llogamanual.NumLloguer
                        FROM llogamanual
                        WHERE llogamanual.Nommanual='$manual' 
                            AND llogamanual.Copia=$copia 
                            AND llogamanual.Solicitud IS NOT NULL 
                            AND llogamanual.Retorn IS null";
        $resultselect = dbconnselect($queryselect);
        
        if($value=mysqli_fetch_assoc($resultselect)){
            $msg["Error"] = "Hi ha hagut un error. Aquest manual ja està reservat. La pàgina s'actualitzarà per veure els canvis.";
        } else {
            $data = date("Y-m-d");
            $query = "INSERT INTO `cruab`.`llogamanual` (`Numsoci`, `Nommanual`, `Copia`, `Solicitud`) VALUES ('$usuari', '$manual', '$copia', '$data');";
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
        $query = "UPDATE `cruab`.`llogamanual` SET `Recollida`='$data' WHERE  `NumLloguer`=$numlloguer;";
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
        $query = "UPDATE `cruab`.`llogamanual` SET `Retorn`='$data' WHERE  `NumLloguer`=$numlloguer;";
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