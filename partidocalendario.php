<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servidor = "localhost"; $usuario = "root"; $contraseña = ""; $nombreBaseDatos = "handballapp";
$conexionBD = new mysqli($servidor, $usuario, $contraseña, $nombreBaseDatos);

// Consulta todos los registros de la tabla empleados
$sqlpartido = mysqli_query($conexionBD,"SELECT cod, TIME_FORMAT(hora, '%H:%i') AS hora, equipo_contrario, cod_categoria, DATE_FORMAT(fecha, '%Y-%m-%d') as fecha FROM partidos ORDER BY `partidos`.`fecha` ASC;");
if(mysqli_num_rows($sqlpartido) > 0){
    $jugadorespartido = mysqli_fetch_all($sqlpartido,MYSQLI_ASSOC);
    echo json_encode($jugadorespartido);
}
else{ echo json_encode([["success"=>0]]); }
?>