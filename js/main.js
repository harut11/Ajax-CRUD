let ajaxCRUD = {
    table: $('#table'),

    showPosts: () => {
        $.ajax({
            url: "posts.php",
            method: "get",
            async: false,
            timeout: 1000,
            success: (result) => {
                let post = JSON.parse(result);

                if(post.length > 0) {
                    $.each(post, (key, value) => {
                        let html = '<div class="card col-4 p-0" data-id="'+ (key + 1) +'">'
                            + '<div class="card-body">'
                            + '<h5 class="card-title">'+ value.title +'</h5>'
                            + '<p class="card-text">'+ value.description.substr(0, 120) + ' ...' + '</p>'
                            + '</div>'
                            + '<div class="card-footer">'
                            + '<small class="text-muted">Created At: '
                            + value.created_at + '<button class="btn btn-danger float-right" onclick="ajaxCRUD.deletePost('+ value.id +')">'
                            + '<i class="fas fa-minus-circle"></i>' + '</button>'
                            + '<button class="btn btn-info float-right mr-2"><i class="fas fa-edit"></i>'
                            + '</button>'
                            + '</small>'
                            + '</div>'
                            + '</div>';

                        ajaxCRUD.table.append(html);
                    });
                } else {
                    let html = '<div class="jumbotron jumbotron-fluid mx-auto mt-5">\n' +
                                    '<div class="container">\n' +
                                        '<h1 class="display-4">No posts yet</h1>\n' +
                                        '<p class="lead">Sorry now we have not posts yet come back later!</p>\n' +
                                    '</div>\n' +
                                '</div>';

                    ajaxCRUD.table.append(html);
                }
            },
            error : (err) => {
                console.log(err);
            },

        })
    },

    deletePost: (id) => {
        if(confirm('Are you sure you want to delete this post?')) {
            $.ajax({
                url: "delete.php",
                method: "post",
                async: false,
                data: ({id: id}),
                success: (data) => {
                    ajaxCRUD.showPosts();
                },
                error : (err) => {
                    console.log(err);
                },
            })
        }  else {
            return false;
        }
    },

    createPost: () => {
        let button = $('#create'),
            title = $('#title').val().trim(),
            description = $('#description').val().trim();

        button.click(() => {
            console.log(title);
            $.ajax({
                url: 'create.php',
                method: 'post',
                async: false,
                data: {title: title, description: description},
                success: (data) => {
                    console.log(data);
                }
            });
        });
    }
};

ajaxCRUD.showPosts();
ajaxCRUD.createPost();