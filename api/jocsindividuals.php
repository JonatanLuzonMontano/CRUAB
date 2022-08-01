<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    
    case 'GET':
        $query = "  SELECT jocindividual.Nom, jocindividual.Numcopia, 
                    llogajoc.NumLloguer, llogajoc.Solicitud, llogajoc.Recollida, llogajoc.Retorn, 
                    jocstaula.Imatge
                    FROM (llogajoc RIGHT JOIN
                        jocindividual ON llogajoc.Nomjoc=jocindividual.Nom
                                            AND llogajoc.Copia=jocindividual.Numcopia) LEFT JOIN
                                            jocstaula ON jocindividual.Nom=jocstaula.Nom
                    WHERE jocindividual.Nom='" . $_GET['nom'] . "' AND (llogajoc.NumLloguer IN
                        (SELECT MAX(llogajoc.NumLloguer)
                        FROM (llogajoc RIGHT JOIN jocindividual
                            ON llogajoc.Copia = jocindividual.Numcopia)
                        WHERE jocindividual.Nom='" . $_GET['nom'] . "' GROUP BY llogajoc.Nomjoc, llogajoc.Copia) or
                        llogajoc.NumLloguer IS NULL)
                    ORDER BY jocindividual.Numcopia";

        $result = dbconnselect($query);
        $msg = array();
        while($values = mysqli_fetch_assoc($result)){
            $msg[] = $values;
        }
        break;

    case 'POST':
        $_POST = json_decode(file_get_contents('php://input'), true);
        $nom = assegurarInputs($_POST["nom"]);
        $getnum = "SELECT NumCopia FROM jocindividual WHERE Nom='$nom';";
        $resultselect = dbconnselect($getnum);
        $cont = 1;
        $trobat = false;

        while(!$trobat){
            if($values = mysqli_fetch_assoc($resultselect)){
                echo $values["NumCopia"] . "/" . $cont;
                if($values["NumCopia"] == $cont){
                    $cont = $cont + 1;
                } else {
                    $trobat = true;
                }
            } else {
                $trobat = true;
            }

        }

        $query = "INSERT INTO `cruab`.`jocindividual` (`Nom`, `NumCopia`) VALUES ('$nom', '$cont');";
        $resultinsert = dbconninsert($query);
        if(substr($resultinsert, 0, 5) == "Error"){
            $msg["Error"] = "Error al inserir les dades. comproba que tot estigui correcte";
            $msg["DeBug"] = $resultinsert;
        } else {
            $msg["Correcte"] = "Tot ok";
        }
        
        break;

    case 'DELETE':
        $numcopia = assegurarInputs($_GET["NumCopia"]);
        $nom = assegurarInputs($_GET["Nom"]);
        $query = "DELETE FROM jocindividual WHERE NumCopia='$numcopia' AND Nom='$nom';";
        $resultdelete = dbconndelete($query);
        if(substr($resultdelete, 0, 5) == "Error"){
            $msg["Error"] = "Error al esborrar les dades. comproba que tot estigui correcte";
            $msg["DeBug"] = $resultdelete;
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

?>