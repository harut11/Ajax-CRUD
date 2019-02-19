<?php
require_once ('connection.php');

function index() {
    $sql = "SELECT id, title, description, created_at, updated_at FROM posts";
    $result = $GLOBALS['connection']->prepare($sql);
    $result->execute();

    $sql2 = "SELECT * FROM images";
    $result2 = $GLOBALS['connection']->prepare($sql2);
    $result2->execute();


    if($result && $result2) {
        $rows = $result->fetchAll();
        $images = $result2->fetchAll();
        echo json_encode(['posts' => $rows, 'images' => $images]);
    }
}

index();