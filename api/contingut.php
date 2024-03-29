<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');



switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $query = "SELECT * FROM `articles`;";

    $result = dbconnselect($query);
    $msg = array();

    

    if ($result == false) {
      $msg = "No hi ha articles a la base de dades";
    } else {

      while ($values = mysqli_fetch_assoc($result)) {
        $msg[] = $values;
      }
    }

    break;
  case 'POST':
    $_POST = json_decode(file_get_contents('php://input'), true);
    $msg['comprovaciones'] = $_POST;

    $data = date("Y-m-d");
    $titol = assegurarInputs($_POST['titol']);
    $text = assegurarInputs($_POST['text']);
    $id = assegurarInputs($_POST['id']);
    $autor = assegurarInputs($_POST['autor']);

    $query = "INSERT INTO `cruab`.`articles` (`Titol`, `Text`, `Autor`, `Id` , `Data`) VALUES ('$titol', '$text', '$autor', $id, '$data');";

    $result = dbconninsert($query);

    if (substr($result, 0, 5) == "Error") {
      $msg["Error"] = "Error al afegir l'article. Comproba que tot estigui correcte";
      $msg["DeBug"] = $result;
    } else {
      $msg["Correcte"] = "Tot ok";
    }

    break;
  case 'PUT':
    $_POST = json_decode(file_get_contents('php://input'), true);

    $data = date("Y-m-d");
    $titol = utf8_decode(assegurarInputs($_POST['titol']));
    $text = utf8_decode(assegurarInputs($_POST['text']));

    $id = intval(assegurarInputs($_POST['id']));
    $autor = intval(assegurarInputs($_POST['autor']));

    $query = "UPDATE `cruab`.`articles` SET `Titol`='$titol', `Text`='$text', `Autor`='$autor', `Data`='$data'  WHERE `id`=$id;";

    $result = dbconnupdate($query);
    if (substr($result, 0, 5) == "Error") {
      $msg["Error"] = "Error al modificar l'article. Comproba que tot estigui correcte";
      $msg["DeBug"] = $result;
    } else {
      $msg["Correcte"] = "Tot ok";
    }
    break;
  case 'DELETE':
    $_POST = json_decode(file_get_contents('php://input'), true);

    $id = assegurarInputs($_POST['id']);
    $query = "DELETE FROM `cruab`.`articles` WHERE `id`=$id;";

    $result = dbconndelete($query);
    if (substr($result, 0, 5) == "Error") {
      $msg["Error"] = "Error al esborrar l'article. Comproba que tot estigui correcte";
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
