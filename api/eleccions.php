<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case 'GET':
        switch($_GET['opcio']){
            case 'eleccio':
                $pas = assegurarInputs($_GET['opcio']);
                $query="SELECT * FROM events WHERE paseleccions = 'proces electoral';";
                
                $result = dbconnselect($query);
                $msg = array();

                while($values = mysqli_fetch_assoc($result)){
                    $msg[$values['paseleccions']] = $values['valor'];
                }

                break;
            case 'passos':
                $pas = assegurarInputs($_GET['opcio']);
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

        break;

    case 'POST':
      $_POST = json_decode(file_get_contents('php://input'), true);


        
          $any = date("Y");
          $query = sprintf(
              "INSERT INTO llista (Any, Convocatoria Nom  VALUES ('%s', '%s', '%s', %d, '%s', '%s', '%s', '%s', '%s', '%s', %d, '%s', '%s', '%s')", // esto hay que rehacerlo
                assegurarInputs($_POST["president"]),
                assegurarInputs($_POST["vicepresident"]),
                assegurarInputs($_POST["tresorer"]),
                assegurarInputs($_POST["secretari"]),
                assegurarInputs($_POST["vocal"])// hay que hacer este por cada vocal que haya, keys: vocal1, vocal2, vocal3, etc
                $any
            );
            
            $resultat = dbconninsert($query);

            if(substr($resultat, 0, 5) == "Error"){
                $msg["Error"] = "Error al inserir les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultat;
            } else {
                $msg["Correcte"] = "Tot ok";
            }

        }
        
        break;

    case 'PUT':
      $query = "UPDATE `events` SET `valor` = '1' WHERE `events`.`paseleccions` = 'proces electoral';";
      $resultinsert = dbconnupdate($query);

      if(substr($resultinsert, 0, 5) == "Error"){
        $msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
        $msg["DeBug"] = $resultinsert;
    } else {
        $msg["Correcte"] = "Tot ok";
    }

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