<?php
require_once ('connection.php');

function index() {
    $sql = "SELECT id, title, description, created_at, updated_at FROM posts";
    $result = $GLOBALS['connection']->prepare($sql);
    $result->execute();


    if($result) {
        $rows = $result->fetchAll();
//
        echo json_encode($rows);
    }
}

index();