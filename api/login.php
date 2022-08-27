<?php

header('Access-Control-Allow-Origin: *');
include_once('../php/connexiobd.php');
include_once('../php/seguretat.php');

switch($_SERVER['REQUEST_METHOD']){
    case 'GET';
        session_start();
        if(isset($_SESSION["usuari"])){
            $msg["numsoci"] = $_SESSION["usuari"]; 
            $msg["juntari"] = $_SESSION["juntari"];
        } else {
            $msg = null;
        }
        break;

    case 'POST':
        try{
            
            $_POST = json_decode(file_get_contents('php://input'), true);
            $email = assegurarInputs($_POST["email"]);
            $password = assegurarInputs($_POST["password"]);
            $query="SELECT numsoci, validat FROM membres WHERE email='$email' AND pass='$password'";
        
            $result = dbconnselect($query);
        
            $json_builder = array();
        
            if($values = mysqli_fetch_assoc($result)){
                if($values["validat"] == 1){
                    $numsoci = $values["numsoci"];
                    $query = "SELECT * FROM LLISTA WHERE membre=$numsoci AND juntaactual=1;";
                    $result2 = dbconnselect($query);
                    session_start();
                    $_SESSION["usuari"]=$values["numsoci"];
                    if($values2 = mysqli_fetch_assoc($result2)){
                        $_SESSION["juntari"]=true;
                    } else {
                        $_SESSION["juntari"]=false;
                    }
                    
                    $msg["Correcte"] = "Tot ok";
                    $msg["numsoci"] = $_SESSION["usuari"];
                    $msg["juntari"] = $_SESSION["juntari"];

                } else {
                    $msg["Error"] = "L'usuari no s'ha validat encara";
                }
            } else {
                $msg["Error"] = "Usuari i/o contrasenya incorrectes";
            }
            
            
        
        }catch(Exception $e){
            die("Error: " . $e->getMessage());
        }
        
        break;
    case 'DELETE':
        try{
            session_start();
            $_SESSION["numsoci"] = null;
            $_SESSION["juntari"] = null;
            unset($_SESSION["numsoci"]);
            unset($_SESSION["juntari"]);
            if(session_destroy()){
                $msg["Correcte"] = "Sessio eliminada";
            } else {
                $msg["Error"] = "No s'ha eliminat la sessio";
            }
        }catch(Exception $e){
            $msg["Error"] = "Problemes eliminant la sessio";
            die("Error: " . $e->getMessage());
        }
        break;
    default:
        http_response_code(400);
        $msg["Error"] = "Wrong method";
        break;
}

echo json_encode($msg, JSON_NUMERIC_CHECK);

?>