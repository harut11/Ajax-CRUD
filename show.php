<?php

require_once ('connection.php');

function show() {

    if(isset($_POST['id'])) {
        $id = $_POST['id'];
        $sql = "SELECT * FROM posts WHERE id = '". $id ."'";
        $result = $GLOBALS['connection']->prepare($sql);
        $result->execute();

        $sql2 = "SELECT * FROM images WHERE post_id = '". $id ."'";
        $result2 = $GLOBALS['connection']->prepare($sql2);
        $result2->execute();

        if($result && $result2) {
            $post = $result->fetch(PDO::FETCH_ASSOC);
            $img = $result2->fetch(PDO::FETCH_ASSOC);

            echo json_encode(['post' => $post, 'image' => $img]);
        }
    }
};
show();