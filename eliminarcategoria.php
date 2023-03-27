<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servidor = "localhost"; $usuario = "root"; $contraseña = ""; $nombreBaseDatos = "handballapp";
$conexionBD = new mysqli($servidor, $usuario, $contraseña, $nombreBaseDatos);

if (isset($_GET["borrar"])){
    $cod=$_GET["borrar"];
    $sqljugadores = mysqli_query($conexionBD,"DELETE FROM categoria WHERE cod = '$cod';");
    if($sqljugadores){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

?>