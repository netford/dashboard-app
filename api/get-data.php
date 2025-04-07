// api/get-data.php
<?php
// Заголовки для JSON и CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Параметры подключения к базе данных
$host = 'localhost';
$dbname = 'dashboard';
$username = 'your_username';
$password = 'your_password';

// Функция для обработки ошибок
function returnError($message) {
    echo json_encode([
        'status' => 'error',
        'message' => $message
    ]);
    exit;
}

try {
    // Подключение к базе данных
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // SQL запрос для получения данных
    $sql = "SELECT 
                indicator_name as name, 
                current_value as current, 
                yesterday_value as yesterday, 
                ROUND(((current_value - yesterday_value) / yesterday_value) * 100, 1) as change,
                weekday_value as weekday
            FROM dashboard_indicators
            ORDER BY id ASC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    
    // Получение результатов
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Возвращаем данные
    echo json_encode($results);
    
} catch (PDOException $e) {
    returnError("Ошибка базы данных: " . $e->getMessage());
} catch (Exception $e) {
    returnError("Общая ошибка: " . $e->getMessage());
}
?>