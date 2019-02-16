<?php
$servername = "localhost";
$dbname = "ajaxcrud";
$username = "root";
$password = "";
$connection = null;

try {
    $connection = new PDO("mysql:host=$servername;dbname=ajaxcrud", $username, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected Succsessfully";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

function show() {
    $sql = "SELECT title, desctiption, created_at, updated_at FROM posts";
    $result = $GLOBALS['connection']->prepare($sql);
    $result->execute();

    if($result) {
        $row = $result->fetchAll(PDO::FETCH_ASSOC);
        print_r($row);
        exit;
        echo json_encode(['title' => $row['title'], 'description' => $row['desctiption']]);
    }
}
show();