<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contraseña = ""; $nombreBaseDatos = "handballapp";
$conexionBD = new mysqli($servidor, $usuario, $contraseña, $nombreBaseDatos);


// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])){
    $dni=$_GET["consultar"];
    $sqljugadores = mysqli_query($conexionBD,"SELECT * FROM jugadores WHERE dni = '$dni';");
    if(mysqli_num_rows($sqljugadores) > 0){
        $jugadores = mysqli_fetch_all($sqljugadores,MYSQLI_ASSOC);
        echo json_encode($jugadores);
        
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $dni=$_GET["borrar"];
    $sqljugadores = mysqli_query($conexionBD,"DELETE FROM jugadores WHERE dni = '$dni';");
    if($sqljugadores){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $dni=$data->dni;
    $nombre=$data->nombre;
    $correo=$data->correo;
    $apellidos=$data->apellidos;
    $cod_categoria=$data->cod_categoria;
    $fech_nacim=$data->fech_nacim;
    $telefono=$data->telefono;
    $movil=$data->movil;
        if(($correo!="")&&($nombre!="")){
            
    $sqljugadores = mysqli_query($conexionBD,"INSERT INTO jugadores(dni,nombre,apellidos,correo,fech_nacim,telefono,movil,cod_categoria) VALUES('$dni','$nombre','$apellidos','$correo','$fech_nacim','$telefono','$movil','$cod_categoria'); ");
    echo json_encode(["success"=>1]);
        }
    exit();
}

if(isset($_GET["partido"])){
    $data = json_decode(file_get_contents("php://input"));
    $dni=$data->dni;
    $nombre=$data->nombre;
    $apellidos=$data->apellidos;
    $cod_categoria=$data->cod_categoria;

        if(($dni!="")&&($nombre!="")){
            
    $sqljugadores = mysqli_query($conexionBD,"INSERT INTO estadistica_partido(dni,nombre,apellidos,cod_categoria) VALUES('$dni','$nombre','$apellidos','$cod_categoria') ");
    echo json_encode(["success"=>1]);
        }
    exit();
}

// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $dni=(isset($data->dni))?$data->dni:$_GET["actualizar"];
    $nombre=$data->nombre;
    $correo=$data->correo;
    $apellidos=$data->apellidos;
    $cod_categoria=$data->cod_categoria;
    $fech_nacim=$data->fech_nacim;
    $telefono=$data->telefono;
    $movil=$data->movil;

    
    $sqljugadores = mysqli_query($conexionBD,"UPDATE jugadores SET nombre='$nombre',
    apellidos='$apellidos', correo='$correo', cod_categoria='$cod_categoria',
    fech_nacim='$fech_nacim',telefono='$telefono', movil='$movil' WHERE dni='$dni'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla jugadores

//Consultar jugadores por categoria

if (isset($_GET["categoria"])){
    $cat=$_GET["categoria"];
    if ($cat == 'todos'){
        $sqljugadores = mysqli_query($conexionBD,"SELECT dni,nombre,apellidos,correo,fech_nacim,TIMESTAMPDIFF(YEAR,fech_nacim,CURDATE()) as edad,telefono,movil,cod_categoria FROM jugadores;");
        if(mysqli_num_rows($sqljugadores) > 0){
            $jugadores = mysqli_fetch_all($sqljugadores,MYSQLI_ASSOC);
            echo json_encode($jugadores);
            exit();
        }
        else{ echo json_encode([["success"=>0]]); }
    }
    else {
        $sqljugadores = mysqli_query($conexionBD,"SELECT dni,nombre,apellidos,correo,fech_nacim,TIMESTAMPDIFF(YEAR,fech_nacim,CURDATE()) as edad,telefono,movil,cod_categoria FROM jugadores WHERE cod_categoria = '$cat';");
        if(mysqli_num_rows($sqljugadores) > 0){
            $jugadores = mysqli_fetch_all($sqljugadores,MYSQLI_ASSOC);
            echo json_encode($jugadores);
            exit();
        }
        else{ echo json_encode([["success"=>0]]); }
    }
    
}




?>