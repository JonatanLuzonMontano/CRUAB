<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case'GET':
        $id = assegurarInputs($_GET['id']);
        $query="SELECT nom, pseudonim, email FROM membres WHERE numsoci=$id";

        $result = dbconnselect($query);
        $msg = array();

        while($values = mysqli_fetch_assoc($result)){
            $msg[] = $values;
        }
        
        break;

    default:
        http_response_code(400);
        echo "wrong method";
        break;
}

echo json_encode($msg, JSON_NUMERIC_CHECK, JSON_UNESCAPED_UNICODE);

?>