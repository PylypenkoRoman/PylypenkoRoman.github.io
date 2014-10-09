(function($){
    $.fn.MySlider = function(interval) {
        var slides;
        var cnt;
        var amount;
        var i;

        function run() {
            $(slides[i]).fadeOut(1000);
            i++;
            if (i >= amount) i = 0;
            $(slides[i]).fadeIn(1000);

            setTimeout(run, interval);
        }

        slides = $('#slider').children();
        amount = slides.length;
        i=0;
        setTimeout(run, interval);
    };
})(jQuery);

jQuery(window).load(function() {
    $('.smart_gallery').MySlider(3000);
});