<?php
// Permitir CORS si es necesario
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido"]);
    exit;
}

// Leer el body JSON
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["error" => "Datos inválidos"]);
    exit;
}

// Extraer campos (con sanitización básica)
$nombre = htmlspecialchars(strip_tags($input['nombre'] ?? ''));
$email = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
$telefono = htmlspecialchars(strip_tags($input['telefono'] ?? ''));
$empresa = htmlspecialchars(strip_tags($input['empresa'] ?? ''));
$mensaje = htmlspecialchars(strip_tags($input['mensaje'] ?? ''));
$botField = $input['botField'] ?? '';
$turnstileToken = $input['turnstileToken'] ?? '';

// Honeypot
if (!empty($botField)) {
    http_response_code(200);
    echo json_encode(["message" => "Mensaje enviado"]);
    exit;
}

// Validar Turnstile
$turnstileSecret = getenv('TURNSTILE_SECRET_KEY');
if (!$turnstileSecret) {
    http_response_code(500);
    echo json_encode(["error" => "Configuración de seguridad del servidor incompleta."]);
    exit;
}
$verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
$data = [
    'secret' => $turnstileSecret,
    'response' => $turnstileToken,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    ]
];
$context  = stream_context_create($options);
$response = @file_get_contents($verifyUrl, false, $context);
if ($response === FALSE) {
    http_response_code(500);
    echo json_encode(["error" => "Error al verificar la seguridad. Inténtalo más tarde."]);
    exit;
}
$responseData = json_decode($response);

if (!$responseData->success) {
    http_response_code(403);
    echo json_encode(["error" => "Verificación de seguridad fallida. Eres un robot?"]);
    exit;
}

// Preparar el correo
$to = "hernan.villafuerte@drillcorp.com.pe"; // Correo final
$subject = "Nueva consulta web de $nombre" . ($empresa ? " - $empresa" : "");

$htmlContent = "
<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
  <h2 style='color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;'>
    Nueva consulta desde la web
  </h2>
  <table style='width: 100%; border-collapse: collapse; margin-top: 16px;'>
    <tr>
      <td style='padding: 8px 12px; font-weight: bold;'>Nombre</td>
      <td>$nombre</td>
    </tr>
    <tr style='background: #f9f9f9;'>
      <td style='padding: 8px 12px; font-weight: bold;'>Email</td>
      <td>$email</td>
    </tr>
    <tr>
      <td style='padding: 8px 12px; font-weight: bold;'>Teléfono</td>
      <td>$telefono</td>
    </tr>
    <tr style='background: #f9f9f9;'>
      <td style='padding: 8px 12px; font-weight: bold;'>Empresa</td>
      <td>$empresa</td>
    </tr>
  </table>
  <div style='margin-top: 20px; padding: 16px; background: #f5f5f5; border-left: 3px solid #dc2626;'>
    <p style='margin: 0 0 8px 0; font-weight: bold;'>Mensaje:</p>
    <p style='margin: 0; white-space: pre-wrap;'>$mensaje</p>
  </div>
</div>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: webmaster@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

if (mail($to, $subject, $htmlContent, $headers)) {
    http_response_code(200);
    echo json_encode(["message" => "Mensaje enviado correctamente."]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al enviar el correo desde el servidor PHP. Verifica configuración de mail()."]);
}
?>
