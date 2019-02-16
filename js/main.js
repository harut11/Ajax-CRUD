let ajaxCRUD = {
    table: $('#table'),

    showPosts: () => {
        $.ajax({
            url: "posts.php",
            method: "get",
            async: false,
            success: (result) => {
                console.log(result);
            },
            error : (err) => {
                console.log(err);
            },

        })
    }
};

ajaxCRUD.showPosts();