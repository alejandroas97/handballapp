<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servidor = "localhost"; $usuario = "root"; $contraseña = ""; $nombreBaseDatos = "handballapp";
$conexionBD = new mysqli($servidor, $usuario, $contraseña, $nombreBaseDatos);

if (isset($_GET["consultar"])){
    $dni=$_GET["consultar"];
    $sqljugadores = mysqli_query($conexionBD,"SELECT tipo,parte,minuto,cod_partido,equipo_contrario FROM `infracciones` INNER JOIN partidos ON partidos.cod=infracciones.cod_partido WHERE dni_jugador = '$dni';");
    if(mysqli_num_rows($sqljugadores) > 0){
        $jugadores = mysqli_fetch_all($sqljugadores,MYSQLI_ASSOC);
        echo json_encode($jugadores);
        
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
?>