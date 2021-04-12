$(window).on('load', function() {
  "use strict";
  /*=============== Preloader ===============*/
  $("#preloader").delay(350).fadeOut('slow');
  // Because only Chrome supports offset-path, feGaussianBlur for now
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  if(!isChrome) {
    document.getElementsByClassName('infinityChrome')[0].style.display = "none";
    document.getElementsByClassName('infinity')[0].style.display = "block";
  }

  /*=============== Wow Initialize ===============*/
  // Here will be the WoW Js implementation.
  setTimeout(function(){new WOW().init();}, 0);

  var dynamicDelay = [
    200,
    400,
    600,
    800,
    1000,
    1200,
    1400,
    1600,
    1800,
    2000
  ];
  var fallbackValue = "200ms";

  /*=============== Isotope ===============*/
  $('.works__nav').on( 'click', 'li', function() {
    var filterValue = $(this).attr('data-filter');
    $container.isotope({ filter: filterValue });
  });

  // change is-checked class on buttons
  $('.works__nav').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'li', function() {
      $buttonGroup.find('.current').removeClass('current');
      $( this ).addClass('current');
    });
  });

  var $container = $('.works__list');
  // $container.imagesLoaded( function() {
  //   $('.works__list').isotope({
  //     // options
  //     itemSelector: '[class*="col-"]',
  //     percentPosition: true,
  //     masonry: {
  //       // use element for option
  //       columnWidth: '[class*="col-"]'
  //     }
  //   });
  // });

  var bolbyPopup = function(){
    /*=============== Magnific Popup ===============*/
    $('.work-image').magnificPopup({
      type: 'image',
      closeBtnInside: false,
      mainClass: 'my-mfp-zoom-in',
    });

    $('.work-content').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: false,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in'
    });

    $('.work-video').magnificPopup({
      type: 'iframe',
      closeBtnInside: false,
      iframe: {
        markup: '<div class="mfp-iframe-scaler">'+
                  '<div class="mfp-close"></div>'+
                  '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                '</div>', 

        patterns: {
          youtube: {
            index: 'youtube.com/',

            id: 'v=',

            src: 'https://www.youtube.com/embed/%id%?autoplay=1'
          },
          vimeo: {
            index: 'vimeo.com/',
            id: '/',
            src: '//player.vimeo.com/video/%id%?autoplay=1'
          },
          gmaps: {
            index: '//maps.google.',
            src: '%id%&output=embed'
          }

        },

        srcAction: 'iframe_src',
      }
    });

    $('.gallery-link').on('click', function () {
      $(this).next().magnificPopup('open');
    });

    $('.gallery').each(function () {
      $(this).magnificPopup({
        delegate: 'a',
        type: 'image',
        closeBtnInside: false,
        gallery: {
            enabled: true,
            navigateByImgClick: true
        },
        fixedContentPos: false,
        mainClass: 'my-mfp-zoom-in',
      });
    });
  }

  bolbyPopup();

  /*===============Infinite Scroll===============*/
  var curPage = 1;
  var pagesNum = $(".portfolio-pagination").find("li a:last").text();   // Number of pages

  $container.infinitescroll({
    itemSelector: '.works__item',
    nextSelector: '.portfolio-pagination li a',
    navSelector: '.portfolio-pagination',
    extraScrollPx: 0,
    bufferPx: 0,
    maxPage: 6,
    loading: {
      finishedMsg: "No more works",
      msgText: '',
      speed: 'slow',
      selector: '.load-more',
    }
  },
  // trigger Masonry as a callback
  function( newElements ) {

    var $newElems = $( newElements );
    $newElems.imagesLoaded(function(){  
      $newElems.animate({ opacity: 1 });
      $container.isotope( 'appended', $newElems );
    });

    bolbyPopup();

    // Check last page
    curPage++;
    if(curPage == pagesNum) {
      $( '.load-more' ).remove();
    }

  });

  $container.infinitescroll( 'unbind' );

  $( '.load-more .button .btn' ).on('click', function() {
    $container.infinitescroll( 'retrieve' );
    // display loading icon
    $( '.load-more .button .btn i' ).css('display', 'inline-block');
    $( '.load-more .button .btn i' ).addClass('fa-spin');
    $( '#works .container .works__nav li' ).removeClass('none-el');

    $(document).ajaxStop(function () {
      setTimeout(function(){
        // hide loading icon
        $( '.load-more .button .btn i' ).hide();
      }, 1000);
    });
    return false;
  });

  $('.portfolio-filter-mobile').on( 'change', function() {
    // get filter value from option value
    var filterValue = this.value;
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $container.isotope({ filter: filterValue });
  });

  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = $(this).find('.number').text();
      return parseInt( number, 10 ) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = $(this).find('.name').text();
      return name.match( /ium$/ );
    }
  };
});

$(function(){
  "use strict";
  
  /*=============== Mobile Menu Toggle ===============*/
  $('.menu-icon i').on( 'click', function() {
    $('header.header-desktop, main.content, header.header-mobile').toggleClass('open');
    $('.content .about, .content .services, .content .experience, .content .works, .content .contact, footer.footer').toggleClass('none-el');
  });

  $('main.content').on( 'click', function() {
    $('header.header-desktop, main.content, footer.footer, header.header-mobile').removeClass('open');
    $('.content .about, .content .services, .content .experience, .content .works, .content .contact, footer.footer').removeClass('none-el');
  });

  $('.vertical-menu li a').on( 'click', function() {
    $('header.header-desktop, main.content, footer.footer, header.header-mobile').removeClass('open');
    $('.content .about, .content .services, .content .experience, .content .works, .content .contact, footer.footer').removeClass('none-el');
  });

  /*=============== One Page Scroll with jQuery ===============*/
  $('a[href^="#"]:not([href="#"]').on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 800, 'easeInOutQuad');
    event.preventDefault();
  });

  /*=============== Parallax layers ===============*/
  if ($('.parallax').length > 0) { 
    var scene = $('.parallax').get(0);
    var parallax = new Parallax(scene, { 
      relativeInput: true,
    });
  }

    /*=============== Text Rotating ===============*/
  $(".text-rotating").Morphext({
      // The [in] animation type. Refer to Animate.css for a list of available animations.
      animation: "bounceIn",
      // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
      separator: ",",
      // The delay between the changing of each phrase in milliseconds.
      speed: 4000,
      complete: function () {
        // Called after the entrance animation is executed.
      }
  });

  /*=============== Add (nav-link) class to main menu ===============*/
  $('.vertical-menu li a').addClass('nav-link');

  /*=============== Bootstrap Scrollspy ===============*/
  $("body").scrollspy({ target: ".scrollspy"});

  /*=============== Counterup JS for facts ===============*/
  $('.count').counterUp({
    delay: 10,
    time: 2000
  });

  /*=============== Scroll to Top ===============*/
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 350) {        // If page is scrolled more than 50px
      $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
      $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
  });

  $('#return-to-top').on('click', function(event) {     // When arrow is clicked
    event.preventDefault();
      $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
      }, 400);
  });
});