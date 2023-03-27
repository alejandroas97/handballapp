<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servidor = "localhost"; $usuario = "root"; $contraseña = ""; $nombreBaseDatos = "handballapp";
$conexionBD = new mysqli($servidor, $usuario, $contraseña, $nombreBaseDatos);

// Consulta todos los registros de la tabla empleados
$sqlpartido = mysqli_query($conexionBD,"SELECT cat.cod as cod_categoria, CONCAT(pe.nombre, ' ',pe.apellidos) as entrenador, CONCAT(se.nombre, ' ', se.apellidos) as segundo_entrenador, cat.dia_entrenamiento as dia_entrenamiento FROM categoria as cat INNER JOIN cuerpo_tecnico as pe ON cat.dni_entrenador = pe.dni INNER JOIN cuerpo_tecnico as se ON cat.dni_segundo_entrenador = se.dni;");
if(mysqli_num_rows($sqlpartido) > 0){
    $jugadorespartido = mysqli_fetch_all($sqlpartido,MYSQLI_ASSOC);
    echo json_encode($jugadorespartido);
}
else{ echo json_encode([["success"=>0]]); }
?>