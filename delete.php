<?php
require_once ('connection.php');
require_once ('functions.php');

function delete() {
    if(isset($_POST['id'])) {
        $id = $_POST['id'];
        $sql = "DELETE FROM posts WHERE id = $id";
        $imgName = get_image_name($id);

        if($imgName !== '' && $imgName !== 'noimage.jpg') {
            unlink("uploads/" . $imgName);
        }

        $result = $GLOBALS['connection']->prepare($sql);
        $result->execute();
    }
}

delete();