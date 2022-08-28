<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case 'GET':
        $query='SELECT guanyadora FROM llistes';
        $result = dbconnselect($query);
        $msg = array();

        while($values = mysqli_fetch_assoc($result)){
          $msg[] = $values;
      }
        break;

    case 'PUT':
    
        break;

    case 'POST':
        
        break;

    case 'DELETE':
        
        break;

    default:
        http_response_code(400);
        echo "wrong method";
        break;
}

echo json_encode($msg, JSON_NUMERIC_CHECK, JSON_UNESCAPED_UNICODE);

?>