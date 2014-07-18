$(document).ready(function () {
  $('#footer__menu li, #header__menu li, #sidebar__nav li').hover(
    function() {
      $('ul', this).slideDown(110);
    },
    function() {
      $('ul', this).slideUp(110);
    }
  );
  $(".fancybox").fancybox();
});