<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servidor = "localhost"; $usuario = "root"; $contraseña = ""; $nombreBaseDatos = "handballapp";
$conexionBD = new mysqli($servidor, $usuario, $contraseña, $nombreBaseDatos);

if (isset($_GET["editar"])){
    $cat=$_GET["editar"];
    $data = json_decode(file_get_contents("php://input"));
    $horario=$data->horario;
    $sqljugadores = mysqli_query($conexionBD,"UPDATE `categoria` SET `dia_entrenamiento` = '$horario' WHERE `categoria`.`cod` = '$cat';");
    if($sqljugadores){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

?>