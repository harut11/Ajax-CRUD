<?php
require_once ('connection.php');

function delete() {
    if(isset($_POST['id'])) {
        $id = $_POST['id'];
        $sql = "DELETE FROM posts WHERE id = $id";

        $result = $GLOBALS['connection']->prepare($sql);
        $result->execute();
    }
}

delete();