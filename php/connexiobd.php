<?php

function getconn(){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cruab";
    $conexion = new mysqli($servername, $username, $password, $dbname);
    mysqli_set_charset($conexion, "utf8");

    if ($conexion->connect_error) {
        die("Connection failed: " . $conexion->connect_error);
    }

    return $conexion;
}

function dbconnselect($query){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cruab";
    $conexion = new mysqli($servername, $username, $password, $dbname);
    mysqli_set_charset($conexion, "utf8");
    // Check connection
    if ($conexion->connect_error) {
        die("Connection failed: " . $conexion->connect_error);
    }
    
    if ($conexion->query($query) === TRUE) {
        return $conexion->query($query);
    } else {
        return "Error: " . $query . " / " . $conexion->error;
    }

    $conexion->close();
    /*
    if ($conexion->connect_error) {
        die("Connection failed: " . $conexion->connect_error);
    }
    
    $result = $conexion->query($query);

    mysqli_close($conexion);
    
    return $result;*/
}

function dbconninsert($query){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cruab";

    // Create connection
    $conexion = new mysqli($servername, $username, $password, $dbname);
    mysqli_set_charset($conexion, "utf8");

    // Check connection
    if ($conexion->connect_error) {
        die("Connection failed: " . $conexion->connect_error);
    }

    if ($conexion->query($query) === TRUE) {
        return "New record created successfully";
    } else {
        return "Error: " . $query . " / " . $conexion->error;
    }

    $conexion->close();
}

function dbconnupdate($query){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cruab";

    // Create connection
    $conexion = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conexion->connect_error) {
        die("Connection failed: " . $conexion->connect_error);
    }

    if ($conexion->query($query) === TRUE) {
        return "Record updated successfully";
    } else {
        return "Error: " . $query . " / " . $conexion->error;
    }

    $conexion->close();
}

function dbconndelete($query){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cruab";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    if ($conn->query($query) === TRUE) {
        return "Record deleted successfully";
    } else {
        return "Error deleting record: " . $conn->error;
    }

    $conn->close();
}

?>

