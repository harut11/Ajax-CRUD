let ajaxCRUD = {
    table: $('#table'),
    postId: null,
    title: $('#title'),
    description: $('#description'),
    image: $('#image'),
    form: $('.form')[0],

    showPosts: () => {
        $.ajax({
            url: "posts.php",
            method: "get",
            success: (result) => {
                let post = JSON.parse(result)['posts'],
                    image = JSON.parse(result)['images'];

                if(post.length > 0) {
                    ajaxCRUD.table.addClass('card-columns');
                    let html = '',
                        imgName = '';

                    $.each(post, (key, value) => {
                        for(let i = 0; i < image.length; i++) {
                            if(value.id === image[i].post_id) {
                                imgName = image[i].name;
                            }
                        }
                        html = html + '<div class="card p-0 mb-3 post" data-id="'+ value.id +'">';
                        html = html + '<img src="uploads/' + imgName +'" class="card-img-top" alt="" data-toggle="modal"' +
                            ' data-target="#exampleModalCenter">';
                        html = html + '<div class="card-body">';
                        html = html + '<h5 class="card-title" data-toggle="modal" data-target="#exampleModalCenter">'+
                            value.title +'</h5>';
                        html = html + '<p class="card-text">'+ value.description.substr(0, 120) + ' ...' + '</p>';
                        html = html + '</div>';
                        html = html + '<div class="card-footer">';
                        html = html + '<small class="text-muted clearfix">Created At: ' +
                            moment(value.created_at).startOf().fromNow() + '' +
                            '<button class="btn btn-danger float-right delete" ' +
                                'onclick="ajaxCRUD.deletePost('+ value.id +')">' + '<i class="fas fa-minus-circle"></i>'
                            + '</button>';
                        html = html + '<button class="btn btn-info float-right mr-2 edit" ' +
                                        'onclick="ajaxCRUD.updatePost('+ value.id +')">' +
                                        '<i class="fas fa-edit"></i>' + '</button>';
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
            }
        });

        document.getElementById('image').addEventListener('change', function (e) {
            let preview = $('#forShow'),
                file = e.target.files[0],
                reader = new FileReader();

                reader.addEventListener('load', () => {
                    preview.attr('src', reader.result);
                }, false);

            if(file) {
                    reader.readAsDataURL(file);
            }
        });

        $(document).on('click', '.card-img-top', (event) => {
            ajaxCRUD.postId = $(event.target).closest('.card').attr('data-id');

            $.ajax({
                url: "show.php",
                method: "post",
                data: {id: ajaxCRUD.postId},
                success: (data) => {
                    let post = JSON.parse(data)['post'],
                        img = JSON.parse(data)['image'];

                    $('#exampleModalCenterTitle').text(post.title);
                    $('.modal-body').text(post.description);
                    $('.modalImg').attr('src', "uploads/"+ img.name +"");
                }
            });

            $('.card-title').trigger('click');
        });
    },

    deletePost: (id) => {
        if(confirm('Are you sure you want to delete this post?')) {
            $.ajax({
                url: "delete.php",
                method: "post",
                data: ({id: id}),
            });

            $('.post[data-id="'+ id +'"]').remove();
            ajaxCRUD.title.val('');
            ajaxCRUD.description.val('');
            $('#collapseExample').removeClass('show');
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
            $('#forShow').attr('src', 'uploads/noimage.jpg');
        });

        $(document).on('click', '#submit', () => {
            let title = ajaxCRUD.title,
                description = ajaxCRUD.description,
                titleVal = title.val().trim(),
                descriptionVal = description.val().trim(),
                attr = $('#submit').attr('data-action');

            if(attr === 'create') {
                let formData = new FormData(ajaxCRUD.form);
                formData.append('attr', attr);
                $.ajax({
                    url: "create.php",
                    type: "post",
                    data: formData,
                    contentType: false,
                    cache: false,
                    processData:false,
                    success: (data) => {
                        let post = JSON.parse(data)['post'],
                            image = JSON.parse(data)['image'],
                            html = '<div class="card p-0 mb-3 post" data-id="'+ post.id +'">'
                                + '<img src="uploads/' + image.name +'" class="card-img-top" alt="">'
                                + '<div class="card-body">'
                                + '<h5 class="card-title">'+ post.title +'</h5>'
                                + '<p class="card-text">'+ post.description.substr(0, 120) + ' ...' + '</p>'
                                + '</div>'
                                + '<div class="card-footer">'
                                + '<small class="text-muted clearfix">Created At: ' +
                                    moment(post.created_at).startOf().fromNow() + ''
                                    + '<button class="btn btn-danger float-right" ' +
                                        'onclick="ajaxCRUD.deletePost('+ post.id +')">'
                                    + '<i class="fas fa-minus-circle"></i>' + '</button>'
                                    + '<button class="btn btn-info float-right mr-2 edit"' +
                                '       onclick="ajaxCRUD.updatePost('+ post.id +')">' +
                                        '<i class="fas fa-edit"></i>' + '</button>'
                                + '</small>'
                                + '</div>'
                                + '</div>';

                        if(post) {
                            ajaxCRUD.table.addClass('card-columns');
                            ajaxCRUD.table.append(html);
                        }
                    }
                });
                submit.removeAttr('data-action');
            } else if(attr === 'edit') {
                let formData = new FormData(ajaxCRUD.form),
                    id = ajaxCRUD.postId;
                console.log(id);
                formData.append('attr', attr);
                formData.append('id', id);
                $.ajax({
                    url: "create.php",
                    type: "POST",
                    data: formData,
                    contentType: false,
                    cache: false,
                    processData:false,
                    success: (data) => {
                        let post = $('.post[data-id="'+ ajaxCRUD.postId +'"]'),
                            img = JSON.parse(data);

                        post.find('.card-title').text(titleVal);
                        post.find('.card-text').text(descriptionVal);
                        post.find('.card-img-top').attr('src', "uploads/"+ img +"");
                    }
                })
            }
            title.val('');
            description.val('');
            submit.removeAttr('data-action');
            ajaxCRUD.image.val('');
        })
    },

    updatePost: (id) => {
        $('#collapseExample').addClass('show');

        let submit = $('#submit');

        ajaxCRUD.postId = id;

        $.ajax({
            url: "show.php",
            method: "post",
            data: {id: id},
            success: (data) => {
                let post = JSON.parse(data)['post'],
                    img = JSON.parse(data)['image'];

                ajaxCRUD.title.val(post.title);
                ajaxCRUD.description.val(post.description);
                $('#forShow').attr('src', "uploads/"+ img.name +"");
            }
        });

        submit.attr('data-action', 'edit');
    },
};

ajaxCRUD.showPosts();
ajaxCRUD.createPost();