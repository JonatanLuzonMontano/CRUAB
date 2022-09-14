<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case 'GET':
      $any = date("Y");
      $query = "SELECT llista.Nom, llista.Carreg, llista.Membre, membres.nom, membres.pseudonim, membres.primercognom
      FROM ( llista LEFT JOIN llistes ON llista.Any = llistes.Any AND llista.Convocatoria = llistes.Convocatoria AND llista.Nom = llistes.Nom )
      LEFT JOIN membres ON membres.numsoci = llista.Membre
      WHERE llista.ANY = 2021;";

      $result = dbconnselect($query);
      $msg = array();

      while($values = mysqli_fetch_assoc($result)) {
        $msg[] = $values;
      }

        break;

    case 'POST':
      $_POST = json_decode(file_get_contents('php://input'), true);

          $any = date("Y");
          $query = 
              "SELECT Any, Convocatoria
              FROM eleccions
              WHERE Convocatoria =(SELECT MAX(Convocatoria) FROM eleccions WHERE Any =(SELECT MAX(Any) FROM eleccions));";
              

              // agafar l'ultim element de la taula eleccions, any, convocatoria
              //afegir aixo i el nom de la llista i un 0 per guanyadora

            
            $resultat = dbconninsert($query);

            if(substr($resultat, 0, 5) == "Error"){
                $msg["Error"] = "Error al inserir les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultat;
            } else {
                $msg["Correcte"] = "Tot ok";
            }

        
        
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