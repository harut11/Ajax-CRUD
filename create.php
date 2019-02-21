<?php

require_once ('connection.php');
require_once ('functions.php');

function create() {
    if(isset($_POST) && $_POST['attr'] === 'create') {
        $title = $_POST['title'];
        $description = $_POST['description'];

        $sql = "INSERT INTO posts (title, description) VALUES ('" .$title."', '" .$description."')";
        $result = $GLOBALS['connection']->prepare($sql);
        $result->execute();

        $sql2 = "SELECT * FROM posts WHERE id = (SELECT MAX(id) FROM posts)";
        $result2 = $GLOBALS['connection']->prepare($sql2);
        $result2->execute();

        if($_FILES['image']['size'] !== 0) {
            $imgName = upload_image();

            $sql3 = "INSERT INTO images (name, post_id) VALUES ('" .$imgName."', (SELECT MAX(id) FROM posts))";
            $result3 = $GLOBALS['connection']->prepare($sql3);
            $result3->execute();
        } else {
            $sql5 = "INSERT INTO images (name, post_id) VALUES ('noimage.jpg', (SELECT MAX(id) FROM posts))";
            $result5 = $GLOBALS['connection']->prepare($sql5);
            $result5->execute();
        }

        $sql4 = "SELECT * FROM images WHERE post_id = (SELECT MAX(id) FROM posts)";
        $result4 = $GLOBALS['connection']->prepare($sql4);
        $result4->execute();

        if($result2 && $result4) {
            $post = $result2->fetch(PDO::FETCH_ASSOC);
            $img = $result4->fetch(PDO::FETCH_ASSOC);

            echo json_encode(['post' => $post, 'image' => $img]);
        }

    }
    if(isset($_POST) && $_POST['attr'] === 'edit') {
        $id = $_POST['id'];
        $title = $_POST['title'];
        $description = $_POST['description'];
        $img = get_image_name($id);


        $sql = "UPDATE posts SET title = '". $title ."', description = '". $description ."' WHERE  id = $id";
        $result = $GLOBALS['connection']->prepare($sql);
        $result->execute();

        if($_FILES['image']['size'] !== 0) {
            $imgName = upload_image();


            if($imgName !== '' && $img !== 'noimage.jpg') {
                unlink("uploads/" . $img);
            }

            $sql2 = "UPDATE images SET name = '". $imgName ."' WHERE post_id = $id";
            $result2 = $GLOBALS['connection']->prepare($sql2);
            $result2->execute();

            if($result2) {
                echo json_encode($imgName);
            }
        } else {
            echo json_encode($img);
        }
    }
}

create();