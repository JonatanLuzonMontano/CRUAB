<?php

function XSS($input){
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input);
    return $input;
}

function sqlinjection($connection, $input){
    $input = mysqli_real_escape_string($connection, $input);
    return $input;
}

function assegurarInputs($input){
    $input = XSS($input);
    $input = sqlinjection(getconn(), $input);
    return $input;
}

?>