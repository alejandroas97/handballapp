<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servidor = "localhost"; $usuario = "root"; $contraseña = ""; $nombreBaseDatos = "handballapp";
$conexionBD = new mysqli($servidor, $usuario, $contraseña, $nombreBaseDatos);

if (isset($_GET["consultar"])){
    $cat=$_GET["consultar"];
    $sqljugadores = mysqli_query($conexionBD,"SELECT cat.cod as cod_categoria, CONCAT(pe.nombre, ' ',pe.apellidos) as entrenador, cat.dni_entrenador as dnientrenador, CONCAT(se.nombre, ' ', se.apellidos) as segundo_entrenador, cat.dni_segundo_entrenador as dnientrenador2, cat.dia_entrenamiento as dia_entrenamiento FROM categoria as cat INNER JOIN cuerpo_tecnico as pe ON cat.dni_entrenador = pe.dni INNER JOIN cuerpo_tecnico as se ON cat.dni_segundo_entrenador = se.dni WHERE cat.cod = '$cat';");
    if(mysqli_num_rows($sqljugadores) > 0){
        $jugadores = mysqli_fetch_all($sqljugadores,MYSQLI_ASSOC);
        echo json_encode($jugadores);
        
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
?>