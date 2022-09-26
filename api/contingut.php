<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch ($_SERVER['REQUEST_METHOD']) {
	case 'GET':
		$query = "SELECT * FROM `contingut`;";

		$result = dbconnselect($query);
		$msg = array();

		while ($values = mysqli_fetch_assoc($result)) {
			$msg[] = $values;
		}

		break;
	case 'POST':
		$_POST = json_decode(file_get_contents('php://input'), true);

		$titol = utf8_decode(assegurarInputs($_POST['titol']));
		$text = utf8_decode(assegurarInputs($_POST['text']));
		$id = intval(assegurarInputs($_POST['id']));
		$juntari = intval(assegurarInputs($_POST['juntari']));

		$query = "INSERT INTO `cruab`.`contingut` (`Titol`, `Text`, `juntari`, `id`) VALUES ('$titol', '$text', '$juntari', $id)";

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

		$titol = utf8_decode(assegurarInputs($_POST['titol']));
		$text = utf8_decode(assegurarInputs($_POST['text']));
		
		$id = intval(assegurarInputs($_POST['id']));
		$juntari = intval(assegurarInputs($_POST['juntari']));

		$query = "UPDATE `cruab`.`contingut` SET `Titol`='$titol', `Text`='$text', `juntari`='$juntari'  WHERE `id`=$id;";

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

		$id = intval(assegurarInputs($_POST['id']));

		$query = "DELETE FROM `cruab`.`contingut` WHERE `id`=$id;";

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

echo (json_encode($msg, JSON_NUMERIC_CHECK, JSON_UNESCAPED_UNICODE));
