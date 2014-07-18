$(document).ready(function(){
    var $messageLimit = 140;
    var $createTweetForm = createTweetForm();


// Создаем поп-апа
    function createTweetForm(){
        var $tweetForm = $('<div></div>')
            .addClass('pop-up-background')
            .addClass('create-tweet');

        $tweetForm.html('<div class="pop-up stopPropagation">'+
            '<div class="pop-up__header">Новый твит'+
            '<div class="close-pop-up"></div>'+
            '</div>'+
            '<div class="pop-up__content">'+
            '<textarea name="tweet"></textarea>'+
            '<div class="addition-services">'+
            '<div class="add-photo">Добавить фотографию</div>'+
            '<div class="get-location">Добавить местоположение</div>'+
            '</div>'+
            '<button id="publish_tweet" class="disable stopPropagation">Твитнуть</button>'+
            '<span class="letter-counter">140</span>'+
            '</div>'+
            '</div>');

        $(document.body).append($tweetForm);

        return $tweetForm;
    }


// Создание нового твитта
    function publishTweet(text){
        var $newTweet = $('<li></li>')
            .addClass('post-wrap');

        $newTweet.html(
                '<div class="post">'+
                '<a class="middle-avatar stopPropagation"href="#"><img src="images/avatar.png" alt=/></a>'+
                '<div class="post-content">'+
                '<span class="name">Every Interaction</span>'+
                '<span class="address">@EveryInteract</span><br>'+
                '<p>'+ text +'</p>'+
                '</div>'+
                '<span class="time">1 hr</span>'+
                '<span class="btn-close-post stopPropagation">Close</span>'+
                '</div>');

        return $newTweet;
    }


// Открыть форму создания твита
    var $createTweetTextarea = $createTweetForm.find("textarea");

    $(".compose").click(function(){
        $(".create-tweet button").addClass("disable");
        $createTweetTextarea.val('');
        $(".create-tweet  .letter-counter").text($messageLimit);
        $createTweetForm.addClass("show");
    });


// Закрыть форму создания твита
    $(".pop-up-background").click(function(){
        $createTweetForm.removeClass("show");
    });
    $(".close-pop-up").click(function(){
        $createTweetForm.removeClass("show");
    });


// Публикация твита
    $("#publish_tweet").click(function(){

        if($(this).hasClass("disable"))
        {
                event.stopPropagation();
        }
        else{
            var $tweetText = $createTweetTextarea.val();
            $createTweetForm.removeClass("show");
            $("#post-list").prepend( publishTweet($tweetText));
        }
    });


// Функции формы создания твита
    $createTweetTextarea.keydown(function(event){

         var $message = $(this).val();

        var $allowed = [8, 46, 37, 38, 39, 40];

        if(
            $message.length >= $messageLimit
            && !($allowed.indexOf(event.keyCode) >= 0)
            )
        {
            event.preventDefault();
        }

    });

    $createTweetTextarea.keyup(function(event){

        var $message = $(this).val();
        $(".create-tweet  .letter-counter").text($messageLimit - $message.length);

        if($message.length != 0)
        {
            $(".create-tweet button").removeClass("disable");
        }
        else{
            $(".create-tweet button").addClass("disable");
        }
    });


    // Открыть/закрыть полностью твитт
//    $(".post-wrap").click(function(){
//
//
//    });

//    $(".btn-close-post").click(function(){
//
//        var $parentPost = $(this).parents(".post-wrap");
//
//        $parentPost.removeClass("extended-post-wrap");
//        $parentPost.find(".post .post-additional-part").slideUp("slow");
//        $parentPost.find(".comment-list").slideUp("slow");
//        $parentPost.find(".post").removeClass("extended-post");
//        $parentPost.find(".post .time").show();
//        $(this).hide();
//    });

    $("#post-list").on('click', '.post-wrap', function(){
        var $this = $(this);

        $this.addClass("extended-post-wrap");
        $this.find(".post .post-additional-part").slideDown("slow");
        $this.find(".comment-list").slideDown("slow");
        $this.find(".post").addClass("extended-post");
        $this.find(".post .btn-close-post").show();
        $this.find(".post .time").hide();
    });

    $("#post-list").on('click', '.btn-close-post', function(e){

        var $parentPost = $(this).parents(".post-wrap");

        $parentPost.removeClass("extended-post-wrap");
        $parentPost.find(".post .post-additional-part").slideUp("slow");
        $parentPost.find(".comment-list").slideUp("slow");
        $parentPost.find(".post").removeClass("extended-post");
        $parentPost.find(".post .time").show();
        $(this).hide();
        e.stopPropagation();
    });


    // Остановка события
    $(".stopPropagation").click(function(event){
        event.stopPropagation();
    });
});

