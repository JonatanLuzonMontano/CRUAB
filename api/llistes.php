<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        $any = date("Y");
        $query = "SELECT llista.Nom, llista.Carreg, llista.Membre, membres.nom, membres.pseudonim, membres.primercognom
      FROM ( llista LEFT JOIN llistes ON llista.`Any` = llistes.`Any` AND llista.Convocatoria = llistes.Convocatoria AND llista.Nom = llistes.Nom )
      LEFT JOIN membres ON membres.numsoci = llista.Membre
      WHERE llista.`Any` = (SELECT MAX(eleccions.`Any`) FROM eleccions);";

        $result = dbconnselect($query);
        $msg = array();

        while ($values = mysqli_fetch_assoc($result)) {
            $msg[] = $values;
        }

        break;

    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'), true);

        $queryselect =
            "SELECT MAX(eleccions.`Any`) AS `Any`, MAX(eleccions.Convocatoria) AS Convocatoria
              FROM eleccions;";

        $result = dbconnselect($queryselect);

        if ($value = mysqli_fetch_assoc($result)) {
            $any = $value["Any"];
            $convocatoria = $value["Convocatoria"];

            $queryinsertllistes = "INSERT INTO `cruab`.`llistes` (`Any`, `Convocatoria`, `Nom`, `Guanyadora`)
          VALUES ('$any', '$convocatoria', '" . assegurarinputs($_POST["nom"]) . "', 0);";

            $result = dbconninsert($queryinsertllistes);

            if (substr($result, 0, 5) == "Error") {
                $msg["Error"] = "Error al inserir les dades de la llista. comproba que tot estigui correcte";
                $msg["DeBug"] = $result;
            } else {
                $queryinsertllista = "";
                $carregs = array_keys($_POST["carregs"]);
                foreach ($carregs as $key) {
                    $queryinsertllista = sprintf(
                        "INSERT INTO `llista` (`Any`, `Convocatoria`, `Nom`, `Carreg`, `Membre`, `JuntaActual`)
                    VALUES ('%d', '%d', '%s', '%s', '%d', 0);",
                        $any,
                        $convocatoria,
                        assegurarInputs($_POST["nom"]),
                        assegurarInputs($key),
                        assegurarInputs($_POST["carregs"][$key]),
                    );

                    $result = dbconninsert($queryinsertllista);
                    if (substr($result, 0, 5) == "Error") {
                        $msg["Error"] = "Error al inserir les dades dels membres de la llista. comproba que tot estigui correcte";
                        $msg["DeBug"] = $result;
                    } else {
                        $msg["Correcte"] = "Tot ok";
                    }
                }
            }
        } else {
            $msg["Error"] = "Error al consultar les dades. Comproba que tot estigui correcte";
            $msg["DeBug"] = $result;
        }

        break;

    case 'PUT':

        break;

    case 'DELETE':

        $_POST = json_decode(file_get_contents('php://input'), true);
        $nomllista = assegurarInputs($_POST['nom']);

        $queryselect =
            "SELECT MAX(eleccions.`Any`) AS `Any`, MAX(eleccions.Convocatoria) AS Convocatoria
              FROM eleccions;";

        $result = dbconnselect($queryselect);

        if ($value = mysqli_fetch_assoc($result)) {
            $any = $value["Any"];
            $convocatoria = $value["Convocatoria"];
        }

        $query = "DELETE FROM llista WHERE Nom='$nomllista' AND `Any`=$any AND `Convocatoria`=$convocatoria AND `JuntaActual`=0;";

        $resultdelete = dbconndelete($query);
        if (substr($resultdelete, 0, 5) == "Error") {
            $msg["Error"] = "Error al esborrar les dades. comproba que tot estigui correcte";
            $msg["DeBug"] = $resultdelete;
        } else {
            $query = "DELETE FROM llistes WHERE Nom='$nomllista' AND `Any`=$any AND `Convocatoria`=$convocatoria AND `Guanyadora`=0;";
            $resultdelete = dbconndelete($query);
            if (substr($resultdelete, 0, 5) == "Error") {
                $msg["Error"] = "Error al esborrar les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultdelete;
            } else {
                $msg["Correcte"] = "Tot ok";
            }
        }

        break;

    default:
        http_response_code(400);
        echo "wrong method";
        break;
}

echo json_encode($msg, JSON_NUMERIC_CHECK, JSON_UNESCAPED_UNICODE);
