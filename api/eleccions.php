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
        $any = date("Y");
        $queryselect = "SELECT MAX(eleccions.Convocatoria)
                        FROM eleccions
                        WHERE eleccions.any = $any;";
        
        $result = dbconnselect($queryselect);
        $msg["result"] = $result;
        if($values = mysqli_fetch_assoc($result)){
            $values = mysqli_fetch_array($result);
            $convocatoria = $values['Convocatoria'] + 1;
        } else {
            $convocatoria = 1;
        }
        $msg["Convocatoria"] = $convocatoria;

        $queryinsert = sprintf(
            "INSERT INTO `cruab`.`eleccions` (`Any`, `Convocatoria`, `Tipus`) VALUES ('%s', '%d', 1);",
            $any,
            $convocatoria,
        );
        
        $resultat = dbconninsert($queryinsert);

        if(substr($resultat, 0, 5) == "Error"){
            $msg["Error"] = "Error al inserir les dades. comproba que tot estigui correcte";
            $msg["DeBug"] = $resultat;
        } else {
            $msg["Correcte"] = "Tot ok";
        }
        
        break;

    case 'PUT':
      switch($_GET['opcio']){
        case 'obrireleccions':
            $pas = assegurarInputs($_GET['opcio']);
            $query = "UPDATE `events` SET `valor` = '1' WHERE `events`.`paseleccions` = 'proces electoral';";
            $resultinsert = dbconnupdate($query);

            if(substr($resultinsert, 0, 5) == "Error"){
                $msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultinsert;
            } else {
                $msg["Correcte"] = "Tot ok";
            }

            break;
        case 'obrirllistes':
          $pas = assegurarInputs($_GET['opcio']);
            $query = "UPDATE `events` SET `valor` = '1' WHERE `events`.`paseleccions` = 'presentacio de llistes';";
            $resultinsert = dbconnupdate($query);

            if(substr($resultinsert, 0, 5) == "Error"){
                $msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultinsert;
            } else {
                $msg["Correcte"] = "Tot ok";
            }
            break;
        case 'obrirvotacio':
          $pas = assegurarInputs($_GET['opcio']);
            $query = "UPDATE `events` SET `valor` = '1' WHERE `events`.`paseleccions` = 'votacio';";
            $resultinsert = dbconnupdate($query);

            if(substr($resultinsert, 0, 5) == "Error"){
                $msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultinsert;
            } else {
                $msg["Correcte"] = "Tot ok";
            }
            break;
        case 'obriractivacio':
          $pas = assegurarInputs($_GET['opcio']);
            $query = "UPDATE `events` SET `valor` = '1' WHERE `events`.`paseleccions` = 'activacio membres';";
            $resultinsert = dbconnupdate($query);

            if(substr($resultinsert, 0, 5) == "Error"){
                $msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultinsert;
            } else {
                $msg["Correcte"] = "Tot ok";
            }
            break;
        case 'tancareleccions':
          $pas = assegurarInputs($_GET['opcio']);
            $query = "UPDATE `events` SET `valor` = '0' WHERE `events`.`paseleccions` = 'proces electoral';";
            $resultinsert = dbconnupdate($query);

            if(substr($resultinsert, 0, 5) == "Error"){
                $msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultinsert;
            } else {
                $msg["Correcte"] = "Tot ok";
            }
            break;
        case 'tancarllistes':
          $pas = assegurarInputs($_GET['opcio']);
            $query = "UPDATE `events` SET `valor` = '0' WHERE `events`.`paseleccions` = 'presentacio de llistes';";
            $resultinsert = dbconnupdate($query);

            if(substr($resultinsert, 0, 5) == "Error"){
                $msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultinsert;
            } else {
                $msg["Correcte"] = "Tot ok";
            }
            break;
        case 'tancarvotacio':
          $pas = assegurarInputs($_GET['opcio']);
            $query = "UPDATE `events` SET `valor` = '0' WHERE `events`.`paseleccions` = 'votacio';";
            $resultinsert = dbconnupdate($query);

            if(substr($resultinsert, 0, 5) == "Error"){
                $msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultinsert;
            } else {
                $msg["Correcte"] = "Tot ok";
            }
            break;
        case 'tancaractivacio':
          $pas = assegurarInputs($_GET['opcio']);
            $query = "UPDATE `events` SET `valor` = '0' WHERE `events`.`paseleccions` = 'activacio membres';";
            $resultinsert = dbconnupdate($query);

            if(substr($resultinsert, 0, 5) == "Error"){
                $msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultinsert;
            } else {
                $msg["Correcte"] = "Tot ok";
            }
            break;
        default:
            http_response_code(400);
            echo "wrong method";
            break;
      }

    case 'DELETE':
        
        break;

    default:
            http_response_code(400);
            echo "wrong method";
            break;
}

var_dump(json_encode($msg, JSON_NUMERIC_CHECK, JSON_UNESCAPED_UNICODE));

?>