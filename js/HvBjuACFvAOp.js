AOS.init();

$(document).ready(function () {
  $('.loader').fadeOut(400)
  setTimeout(hideLoader, 800)
})

function hideLoader() {
  $('body').removeClass('loader-active')
}
$('input[name=phone]').mask('+38(999)-999-99-99')

$(window).scroll(function () {
  if ($(window).scrollTop() >= 5) {
    if (!$('header').hasClass('header--fixed')) {
      $('header').addClass('header--fixed')
    } else {}

  } else {
    $('header').removeClass('header--fixed')
  }
});

$(document).ready(function(){
  $('.reviews_slider').slick({
    dots: false,
    infinite: true,
    speed: 500,
    fade: false,
    slidesToShow: 3,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
})


