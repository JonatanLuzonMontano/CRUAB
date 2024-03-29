<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch ($_SERVER['REQUEST_METHOD']) {

	case 'GET':
		$opcio = assegurarInputs($_GET['opcio']);
		switch ($opcio) {
			case 'eleccio':
				$query = "SELECT * FROM events WHERE paseleccions = 'proces electoral';";

				$result = dbconnselect($query);
				$msg = array();

				while ($values = mysqli_fetch_assoc($result)) {
					$msg[$values['paseleccions']] = $values['valor'];
				}

				break;
			case 'passos':
				$query = "SELECT * FROM events WHERE paseleccions != 'proces electoral';";

				$result = dbconnselect($query);
				$msg = array();

				while ($values = mysqli_fetch_assoc($result)) {
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
		$queryselect = "SELECT MAX(eleccions.Convocatoria) as Convocatoria
                        FROM eleccions
                        WHERE eleccions.any = $any;";
		$result = dbconnselect($queryselect);
		if ($values = mysqli_fetch_assoc($result)) {
			$convocatoria = $values['Convocatoria'] + 1;
		} else {
			$convocatoria = 1;
		}

		$queryinsert = sprintf(
			"INSERT INTO `cruab`.`eleccions` (`Any`, `Convocatoria`, `Tipus`) VALUES ('%s', '%d', 1);",
			$any,
			$convocatoria,
		);

		$resultat = dbconninsert($queryinsert);

		if (substr($resultat, 0, 5) == "Error") {
			$msg["Error"] = "Error al inserir les dades. comproba que tot estigui correcte";
			$msg["DeBug"] = $resultat;
		} else {
			$msg["Correcte"] = "Tot ok";
		}

		break;

	case 'PUT':
		$_POST = json_decode(file_get_contents('php://input'), true);
		$opcio = assegurarInputs($_POST['opcio']);
		switch ($opcio) {
			case 'obrireleccions':
				$query = "UPDATE `events` SET `valor` = '1' WHERE `events`.`paseleccions` = 'proces electoral';";
				$resultinsert = dbconnupdate($query);

				if (substr($resultinsert, 0, 5) == "Error") {
					$msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
					$msg["DeBug"] = $resultinsert;
				} else {
					$msg["Correcte"] = "Tot ok";
				}

				break;
			case 'obrirllistes':
				$query = "UPDATE `events` SET `valor` = '1' WHERE `events`.`paseleccions` = 'presentacio de llistes';";
				$resultinsert = dbconnupdate($query);

				if (substr($resultinsert, 0, 5) == "Error") {
					$msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
					$msg["DeBug"] = $resultinsert;
				} else {
					$msg["Correcte"] = "Tot ok";
				}
				break;
			case 'obrirvotacio':
				$query = "UPDATE `events` SET `valor` = '1' WHERE `events`.`paseleccions` = 'votacio';";
				$resultinsert = dbconnupdate($query);

				if (substr($resultinsert, 0, 5) == "Error") {
					$msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
					$msg["DeBug"] = $resultinsert;
				} else {
					$msg["Correcte"] = "Tot ok";
				}
				break;
			case 'obriractivacio':
				$query = "UPDATE `events` SET `valor` = '1' WHERE `events`.`paseleccions` = 'activacio membres';";
				$resultinsert = dbconnupdate($query);

				if (substr($resultinsert, 0, 5) == "Error") {
					$msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
					$msg["DeBug"] = $resultinsert;
				} else {
					$msg["Correcte"] = "Tot ok";
				}
				break;
			case 'tancareleccions':
				$query = "UPDATE `events` SET `valor` = '0' WHERE `events`.`paseleccions` = 'proces electoral';";
				$resultinsert = dbconnupdate($query);

				if (substr($resultinsert, 0, 5) == "Error") {
					$msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
					$msg["DeBug"] = $resultinsert;
				} else {
					$msg["Correcte"] = "Tot ok";
				}
				break;
			case 'tancarllistes':
				$query = "UPDATE `events` SET `valor` = '0' WHERE `events`.`paseleccions` = 'presentacio de llistes';";
				$resultinsert = dbconnupdate($query);

				if (substr($resultinsert, 0, 5) == "Error") {
					$msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
					$msg["DeBug"] = $resultinsert;
				} else {
					$msg["Correcte"] = "Tot ok";
				}
				break;
			case 'tancarvotacio':
				$query = "UPDATE `events` SET `valor` = '0' WHERE `events`.`paseleccions` = 'votacio';";
				$resultinsert = dbconnupdate($query);

				if (substr($resultinsert, 0, 5) == "Error") {
					$msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
					$msg["DeBug"] = $resultinsert;
				} else {
					$msg["Correcte"] = "Tot ok";
				}
				break;
			case 'tancaractivacio':
				$query = "UPDATE `events` SET `valor` = '0' WHERE `events`.`paseleccions` = 'activacio membres';";
				$resultinsert = dbconnupdate($query);

				if (substr($resultinsert, 0, 5) == "Error") {
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

echo (json_encode($msg, JSON_NUMERIC_CHECK, JSON_UNESCAPED_UNICODE));
//var_dump($msg);
