<?php

require_once ('connection.php');

function create() {
    if(isset($_POST) && $_POST['attr'] === 'create') {
        $title = $_POST['title'];
        $description = $_POST['description'];
        $name = $_FILES['image']['name'];
        list($txt, $ext) = explode('.', $name);
        $imgName = time() . '.' . $ext;
        $tmp = $_FILES['image']['tmp_name'];

        if(move_uploaded_file($tmp, 'uploads/'.$imgName)) {
            $sql = "INSERT INTO posts (title, description) VALUES ('" .$title."', '" .$description."')";
            $result = $GLOBALS['connection']->prepare($sql);
            $result->execute();

            $sql2 = "SELECT * FROM posts WHERE id = (SELECT MAX(id) FROM posts)";
            $result2 = $GLOBALS['connection']->prepare($sql2);
            $result2->execute();

            $sql3 = "INSERT INTO images (name, post_id) VALUES ('" .$imgName."', (SELECT MAX(id) FROM posts))";
            $result3 = $GLOBALS['connection']->prepare($sql3);
            $result3->execute();

            $sql4 = "SELECT * FROM images WHERE post_id = (SELECT MAX(id) FROM posts)";
            $result4 = $GLOBALS['connection']->prepare($sql4);
            $result4->execute();

            if($result2 && $result4) {
                $post = $result2->fetch(PDO::FETCH_ASSOC);
                $img = $result4->fetch(PDO::FETCH_ASSOC);

                echo json_encode(['post' => $post, 'image' => $img]);
            }
        }

    }
    if(isset($_POST) && $_POST['attr'] === 'edit') {
        $id = $_POST['id'];
        $title = $_POST['title'];
        $description = $_POST['description'];

        $sql = "UPDATE posts  SET title = '". $title ."', description = '". $description ."' WHERE  id = '". $id ."'";
        $result = $GLOBALS['connection']->prepare($sql);
        $result->execute();
    }
}

create();