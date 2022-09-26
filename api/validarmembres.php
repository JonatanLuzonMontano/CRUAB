<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case'GET':
        $query = "SELECT numsoci, nom, primercognom, email, pseudonim
                  FROM membres
                  WHERE membres.validat=0";

        $result = dbconnselect($query);
        $msg = array();

        while($values = mysqli_fetch_assoc($result)){
            $msg[] = $values;
        }        

        break;
    case 'PUT':
        $_POST = json_decode(file_get_contents('php://input'), true);

        $numsoci = assegurarInputs($_POST["numsoci"]);
        $query = "UPDATE `cruab`.`membres` SET `estat`='actiu', `validat`='1' WHERE `numsoci`=$numsoci";
        $result = dbconnupdate($query);
        if(substr($result, 0, 5) == "Error"){
            $msg["Error"] = "Error al modificar les dades. Comproba que tot estigui correcte";
            $msg["DeBug"] = $result;
        } else {
            $msg["Correcte"] = "Tot ok";
        }
        break;
    case 'DELETE':

        $numsoci = $_GET["numsoci"];
        $query = "DELETE FROM `cruab`.`membres` WHERE  `numsoci`=$numsoci;";
        $result = dbconndelete($query);
        if(substr($result, 0, 5) == "Error"){
            $msg["Error"] = "Error a l'hora d'eliminar les dades. comproba que tot estigui correcte";
            $msg["DeBug"] = $result;
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