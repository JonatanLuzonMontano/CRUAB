<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        switch ($_GET['tipus']) {
            case 'actius':
                $query = "SELECT membres.nom, membres.pseudonim, membres.primercognom, membres.numsoci
          FROM membres WHERE membres.validat = 1 AND membres.estat = 'actiu';";

                $result = dbconnselect($query);
                $msg = array();

                while ($values = mysqli_fetch_assoc($result)) {
                    $msg[] = $values;
                }

                break;

            case 'actiusono':
                $query = "SELECT membres.numsoci, membres.estat
          FROM membres WHERE membres.validat = 1;";

                $result = dbconnselect($query);
                $msg = array();

                while ($values = mysqli_fetch_assoc($result)) {
                    $msg[] = $values;
                }

                break;
            case 'tots':
                $query = "SELECT membres.numsoci, membres.estat, membres.nom, membres.primercognom, membres.segoncognom, membres.email, membres.pseudonim
          FROM membres WHERE membres.validat = 1;";

                $result = dbconnselect($query);
                $msg = array();

                while ($values = mysqli_fetch_assoc($result)) {
                    $msg[] = $values;
                }

                break;
            default:
                http_response_code(400);
                $msg["Error"] = "wrong GET method option";
                break;
        }

        break;

    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'), true);

        $email = assegurarInputs($_POST["email"]);
        $tlf = assegurarInputs($_POST["telefon"]);

        $querycheckemail = "SELECT numsoci FROM membres WHERE email='$email';";
        $resultemail = dbconnselect($querycheckemail);

        $querychecktelefon = "SELECT numsoci FROM membres WHERE telefon=$tlf;";
        $resulttelefon = dbconnselect($querychecktelefon);

        if ($valuesemail = mysqli_fetch_array($resultemail)) {
            $msg["Error"] = "Email ja existent. Cambia a un que no estigui registrat";
        } elseif ($valuestelefon = mysqli_fetch_array($resulttelefon)) {
            $msg["Error"] = "Telefon ja existent. Cambia a un que no estigui registrat";
        } else {
            $any = date("Y");
            $query = sprintf(
                "INSERT INTO membres (nom, primercognom, segoncognom, telefon, genere, email, pass, facultat, curs, estat, anyingres, naixement, "
                    . "treballadorUAB, pseudonim) VALUES ('%s', '%s', '%s', %d, '%s', '%s', '%s', '%s', '%s', '%s', %d, '%s', '%s', '%s')",
                assegurarInputs($_POST["nom"]),
                assegurarInputs($_POST["cognom1"]),
                assegurarInputs($_POST["cognom2"]),
                $tlf,
                assegurarInputs($_POST["genere"]),
                $email,
                assegurarInputs($_POST["password"]),
                assegurarInputs($_POST["facultat"]),
                assegurarInputs($_POST["curs"]),
                'Inactiu',
                $any,
                assegurarInputs($_POST["naixement"]),
                assegurarInputs($_POST["treballador"]),
                assegurarInputs($_POST["mote"])
            );

            $resultat = dbconninsert($query);

            if (substr($resultat, 0, 5) == "Error") {
                $msg["Error"] = "Error al inserir les dades. comproba que tot estigui correcte";
                $msg["DeBug"] = $resultat;
            } else {
                $msg["Correcte"] = "Tot ok";
            }
        }

        break;

    case 'PUT':
        $_POST = json_decode(file_get_contents('php://input'), true);
        $opcio = assegurarInputs($_POST['opcio']);
        $membre = assegurarInputs($_POST['membre']);
        switch ($opcio) {
            case 'activar':
                $query = "UPDATE `membres` SET `estat` = 'actiu' WHERE `membres`.`numsoci` = $membre;";
                $resultinsert = dbconnupdate($query);

                if (substr($resultinsert, 0, 5) == "Error") {
                    $msg["Error"] = "Error al actualitzar les dades. comproba que tot estigui correcte";
                    $msg["DeBug"] = $resultinsert;
                } else {
                    $msg["Correcte"] = "Tot ok";
                }
                break;
            case 'desactivar':
                $query = "UPDATE `membres` SET `estat` = 'inactiu' WHERE `membres`.`numsoci` = $membre;";
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
                $msg["Error"] = "wrong PUT method";
                break;
        }
        break;
    default:
        http_response_code(400);
        $msg["Error"] = "wrong method";
        break;
}

echo json_encode($msg);
