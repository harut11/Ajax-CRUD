<?php

require_once ('connection.php');

function create() {
    if(isset($_POST['title']) && isset($_POST['description']) && isset($_POST['attr']) && $_POST['attr'] === 'create') {
        $title = $_POST['title'];
        $description = $_POST['description'];

        $sql = "INSERT INTO posts (title, description) VALUES ('" .$title."', '" .$description."')";
        $result = $GLOBALS['connection']->prepare($sql);
        $result->execute();

        $sql2 = "SELECT * FROM posts WHERE id = (SELECT MAX(id) FROM posts)";
        $result2 = $GLOBALS['connection']->prepare($sql2);
        $result2->execute();

        if($result2) {
            $post = $result2->fetch(PDO::FETCH_ASSOC);
            echo json_encode($post);
        }
    }
    if(isset($_POST['title']) && isset($_POST['description']) && isset($_POST['id']) && isset($_POST['attr']) && $_POST['attr'] === 'edit') {
        $id = $_POST['id'];
        $title = $_POST['title'];
        $description = $_POST['description'];

        $sql = "UPDATE posts  SET title = '". $title ."', description = '". $description ."' WHERE  id = '". $id ."'";
        $result = $GLOBALS['connection']->prepare($sql);
        $result->execute();
    }
}

create();