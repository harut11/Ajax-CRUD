<?php

$servername = "localhost";
$dbname = "ajaxcrud";
$username = "root";
$password = "";
$connection = null;

try {
    $connection = new PDO("mysql:host=$servername;dbname=ajaxcrud", $username, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}