<?php

//header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case 'GET':
<<<<<<< HEAD
        
        switch($_GET['pas']){
            case 'eleccions':
                $pas = assegurarInputs($_GET['pas']);
                $query="SELECT * FROM events WHERE paseleccions = 'proces electoral';";
                
                $result = dbconnselect($query);
                $msg = array();

                while($values = mysqli_fetch_assoc($result)){
                    $msg[$values['paseleccions']] = $values['valor'];
                }

                break;
            case 'pasos':
                $pas = assegurarInputs($_GET['pas']);
                $query="SELECT * FROM events WHERE paseleccions != 'proces electoral';";

                $result = dbconnselect($query);
                $msg = array();

                while($values = mysqli_fetch_assoc($result)){
                    $msg[$values['paseleccions']] = $values['valor'];
                }

                break;
            default:
                $query = "";
                break;
        }
=======
        $query='SELECT guanyadora FROM llistes';
        $result = dbconnselect($query);
        $msg = array();

        while($values = mysqli_fetch_assoc($result)){
          $msg[] = $values;
      }
        break;
>>>>>>> 457274107b7e8c9abf0615212b6a7a085333c843

        break;

    case 'POST':
        
        break;

    case 'PUT':
    
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