<?php
header("Content-Type: application/json");
$servername = "localhost";
$username = "prueba";
$password = "prograweb";
$database = "prueba";

// Conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión"]));
}

// Verificar si es una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = json_decode(file_get_contents("php://input"), true);
    $email = $input['email'];
    $password = $input['password'];

    $sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["success" => true, "message" => "Inicio de sesión exitoso"]);
    } else {
        echo json_encode(["success" => false, "message" => "Credenciales incorrectas"]);
    }

    $stmt->close();
}
$conn->close();
?>
