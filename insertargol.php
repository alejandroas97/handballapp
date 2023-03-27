<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servidor = "localhost"; $usuario = "root"; $contraseña = ""; $nombreBaseDatos = "handballapp";
$conexionBD = new mysqli($servidor, $usuario, $contraseña, $nombreBaseDatos);

if(isset($_GET["partido"])){
    $data = json_decode(file_get_contents("php://input"));
    $minuto=$data->minuto;
    $lugar_porteria=$data->lugar_porteria;
    $altura_porteria=$data->altura_porteria;
    $distancia=$data->distancia;
    $cod_partido=$data->cod_partido;
    $dni=$data->dni;
    $cod_cat=$data->cod_cat;
    $parte=$data->parte;

        if(($dni!="")&&($cod_partido!="")){
            
    $sqljugadores = mysqli_query($conexionBD,"INSERT INTO goles (minuto,parte,lugar_porteria,altura_porteria,distancia,cod_partido,dni_jugador,cod_cat) VALUES ('$minuto','$parte','$lugar_porteria','$altura_porteria','$distancia','$cod_partido','$dni','$cod_cat') ");
    echo json_encode(["success"=>1]);
        }
    exit();
}


// Insertar gol en tabla de goles
$data = json_decode(file_get_contents("php://input"));
echo($data);
$minuto=$data->minuto;
$lugar_porteria=$data->lugar_porteria;
$altura_porteria=$data->altura_porteria;
$distancia=$data->distancia;
$cod_partido=$data->cod_partido;
$dni=$data->dni;
$cod_cat=$data->cod_cat;
$sqlpartido = mysqli_query($conexionBD,"INSERT INTO goles (minuto,lugar_porteria,altura_porteria,distancia,cod_partido,dni_jugador,cod_cat)
VALUES ('$minuto','$lugar_porteria','$altura_porteria','$distancia','$cod_partido','$dni','$cod_cat');");
if(mysqli_num_rows($sqlpartido) > 0){
    $jugadorespartido = mysqli_fetch_all($sqlpartido,MYSQLI_ASSOC);
    echo json_encode($jugadorespartido);
}
else{ echo json_encode([["success"=>0]]); }
?>