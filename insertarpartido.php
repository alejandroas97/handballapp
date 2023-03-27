<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servidor = "localhost"; $usuario = "root"; $contraseña = ""; $nombreBaseDatos = "handballapp";
$conexionBD = new mysqli($servidor, $usuario, $contraseña, $nombreBaseDatos);

/* Consulta todos los registros de la tabla partidos
$data = json_decode(file_get_contents("php://input"));
$fecha=$data->fecha;
$hora=$data->hora;
$equipo_contrario=$data->equipo_contrario;
$cod_categoria=$data->cod_categoria;
$sqlpartido = mysqli_query($conexionBD,"INSERT INTO `partidos` (`cod`, `fecha`, `hora`, `equipo_contrario`, `cod_categoria`, `resultado`) VALUES (NULL, '$fecha', '$hora', '$equipo_contrario', '$cod_categoria', '');");
if(mysqli_num_rows($sqlpartido) > 0){
    $jugadorespartido = mysqli_fetch_all($sqlpartido,MYSQLI_ASSOC);
    echo json_encode($jugadorespartido);
}
else{ echo json_encode([["success"=>0]]); } */

if(isset($_GET["partido"])){
    $data = json_decode(file_get_contents("php://input"));
    $fecha=$data->fecha;
    $hora=$data->hora;
    $equipo_contrario=$data->equipo_contrario;
    $cod_categoria=$data->cod_categoria;

        if(($cod_categoria!="")&&($fecha!="")){
            
        $sqljugadores = mysqli_query($conexionBD,"INSERT INTO `partidos` (`cod`, `fecha`, `hora`, `equipo_contrario`, `cod_categoria`) VALUES (NULL, '$fecha', '$hora', '$equipo_contrario', '$cod_categoria');");
        echo json_encode(["success"=>1]);
        }
    exit();
}

?>