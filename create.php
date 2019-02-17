<?php

require_once ('connection.php');

function create() {
    if(isset($_POST['title']) && isset($_POST['description'])) {
        $title = $_POST['title'];
        $description = $_POST['description'];
        var_dump($title, $description);

        $sql = "INSERT INTO posts (title, description) VALUES ($title, $description)";
        $result = $GLOBALS['connection']->prepare($sql);
        $result->execute();
    }
}