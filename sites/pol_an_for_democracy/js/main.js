$(function() {
            $("#additional-nav ul").hide();
            $("#additional-nav h4").click(function() {
                $(this).next("ul").slideToggle("slow").siblings("ul:visible").slideUp("slow");
            });
        });