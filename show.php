<?php

require_once ('connection.php');

function show() {

    if(isset($_POST['id'])) {
        $id = $_POST['id'];
        $sql = "SELECT * FROM posts WHERE id = '". $id ."'";
        $result = $GLOBALS['connection']->prepare($sql);
        $result->execute();

        if($result) {
            $post = $result->fetch(PDO::FETCH_ASSOC);
            echo json_encode($post);
        }
    }
};
show();