<?php

require_once ('connection.php');

function get_image_name($post_id) {
    $sql = "SELECT * FROM images WHERE post_id = $post_id";
    $result = $GLOBALS['connection']->prepare($sql);
    $result->execute();

    $images = $result->fetchAll();
    foreach ($images as $image) {
        return $image['name'];
    }

}

function upload_image() {
    $name = $_FILES['image']['name'];
    $extention = explode('.', $name);
    $imgName = rand() . '.' . $extention[1];
    $tmp = $_FILES['image']['tmp_name'];
    $path = "./uploads/" . $imgName;
    move_uploaded_file($tmp, $path);
    return $imgName;
}