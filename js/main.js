let ajaxCRUD = {
    table: $('#table'),
    postId: null,
    title: $('#title'),
    description: $('#description'),

    showPosts: () => {
        $.ajax({
            url: "posts.php",
            method: "get",
            async: false,
            success: (result) => {
                let post = JSON.parse(result);

                if(post.length > 0) {
                    ajaxCRUD.table.addClass('card-columns');
                    let html = '';
                    $.each(post, (key, value) => {
                            html = html + '<div class="card p-0 mb-3 post" data-id="'+ value.id +'">';
                            html = html + '<div class="card-body">';
                            html = html + '<h5 class="card-title">'+ value.title +'</h5>';
                            html = html + '<p class="card-text">'+ value.description.substr(0, 120) + ' ...' + '</p>';
                            html = html + '</div>';
                            html = html + '<div class="card-footer">';
                            html = html + '<small class="text-muted clearfix">Created At: ' + value.created_at + '' +
                                '<button class="btn btn-danger float-right" onclick="ajaxCRUD.deletePost('+ value.id +')">' +
                                '<i class="fas fa-minus-circle"></i>' + '</button>';
                            html = html + '<button class="btn btn-info float-right mr-2 edit">' + '<i class="fas fa-edit"></i>' + '</button>';
                            html = html + '</small>';
                            html = html + '</div>';
                            html = html + '</div>';

                        ajaxCRUD.table.html(html);
                    });
                } else {
                    ajaxCRUD.table.removeClass('card-columns');
                    let html = '';

                    html = html+ '<div class="jumbotron jumbotron-fluid mx-auto mt-5 text-center">\n';
                    html = html+ '<div class="container">\n';
                    html = html+ '<h1 class="display-4">No posts yet</h1>\n';
                    html = html+ '<p class="lead">Sorry now we have not posts yet come back later!</p>\n';
                    html = html + '</div>\n';
                    html = html + '</div>';

                    ajaxCRUD.table.html(html);
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

                },
                error : (err) => {
                    console.log(err);
                },
            });

            $('.post[data-id="'+ id +'"]').remove();
        }  else {
            return false;
        }
    },

    createPost: () => {
        let submit = $('#submit');
        $('#create').click(() => {
            submit.attr('data-action', 'create');
            ajaxCRUD.title.val('');
            ajaxCRUD.description.val('');
        });

        $(document).on('click', '#submit', () => {
            let title = ajaxCRUD.title,
                description = ajaxCRUD.description,
                titleVal = title.val().trim(),
                descriptionVal = description.val().trim(),
                attr = $('#submit').attr('data-action');

            if(attr === 'create') {
                $.ajax({
                    url: "create.php",
                    method: "post",
                    async: false,
                    data: ({title: titleVal, description: descriptionVal, attr: attr}),
                    success: (data) => {

                    },
                    error : (err) => {
                        console.log(err);
                    },
                });
            } else if(attr === 'edit') {
                $.ajax({
                    url: "create.php",
                    method: "POST",
                    data: ({id: ajaxCRUD.postId, title: titleVal, description: descriptionVal, attr: attr}),
                    success: (data) => {

                    }
                })
            }

            $('#collapseExample').removeClass('show');
            title.val('');
            description.val('');
            submit.removeAttr('data-action');
        })
    },

    updatePost: () => {
        $('.edit').click((event) => {
            $('#create').toggleClass('show');
            ajaxCRUD.postId = $(event.target).closest('.card').attr('data-id');
            let submit = $('#submit');

            $.ajax({
                url: "show.php",
                method: "GET",
                data: {id: ajaxCRUD.postId},
                success: (result) => {
                    let post = JSON.parse(result);
                    console.log(post);
                    ajaxCRUD.title.val(post.title);
                    ajaxCRUD.description.val(post.description);
                }
            });

            submit.attr('data-action', 'edit');
        })
    },
};

ajaxCRUD.showPosts();
ajaxCRUD.createPost();
ajaxCRUD.updatePost();