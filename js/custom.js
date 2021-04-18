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
      $('#return-to-top').addClass('visible');
      $('.theme-switch-wrapper').addClass('visible');
    } else {
      $('#return-to-top').removeClass('visible');
      $('.theme-switch-wrapper').removeClass('visible');
    }
  });

  $('#return-to-top').on('click', function(event) {     // When arrow is clicked
    event.preventDefault();
      $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
      }, 400);
  });
});

!function(t){"use strict";var s=function(s,e){this.el=t(s),this.options=t.extend({},t.fn.typed.defaults,e),this.isInput=this.el.is("input"),this.attr=this.options.attr,this.showCursor=this.isInput?!1:this.options.showCursor,this.elContent=this.attr?this.el.attr(this.attr):this.el.text(),this.contentType=this.options.contentType,this.typeSpeed=this.options.typeSpeed,this.startDelay=this.options.startDelay,this.backSpeed=this.options.backSpeed,this.backDelay=this.options.backDelay,this.stringsElement=this.options.stringsElement,this.strings=this.options.strings,this.strPos=0,this.arrayPos=0,this.stopNum=0,this.loop=this.options.loop,this.loopCount=this.options.loopCount,this.curLoop=0,this.stop=!1,this.cursorChar=this.options.cursorChar,this.shuffle=this.options.shuffle,this.sequence=[],this.build()};s.prototype={constructor:s,init:function(){var t=this;t.timeout=setTimeout(function(){for(var s=0;s<t.strings.length;++s)t.sequence[s]=s;t.shuffle&&(t.sequence=t.shuffleArray(t.sequence)),t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos)},t.startDelay)},build:function(){var s=this;if(this.showCursor===!0&&(this.cursor=t('<span class="typed-cursor">'+this.cursorChar+"</span>"),this.el.after(this.cursor)),this.stringsElement){s.strings=[],this.stringsElement.hide();var e=this.stringsElement.find("p");t.each(e,function(e,i){s.strings.push(t(i).html())})}this.init()},typewrite:function(t,s){if(this.stop!==!0){var e=Math.round(70*Math.random())+this.typeSpeed,i=this;i.timeout=setTimeout(function(){var e=0,r=t.substr(s);if("^"===r.charAt(0)){var o=1;/^\^\d+/.test(r)&&(r=/\d+/.exec(r)[0],o+=r.length,e=parseInt(r)),t=t.substring(0,s)+t.substring(s+o)}if("html"===i.contentType){var n=t.substr(s).charAt(0);if("<"===n||"&"===n){var a="",h="";for(h="<"===n?">":";";t.substr(s).charAt(0)!==h;)a+=t.substr(s).charAt(0),s++;s++,a+=h}}i.timeout=setTimeout(function(){if(s===t.length){if(i.options.onStringTyped(i.arrayPos),i.arrayPos===i.strings.length-1&&(i.options.callback(),i.curLoop++,i.loop===!1||i.curLoop===i.loopCount))return;i.timeout=setTimeout(function(){i.backspace(t,s)},i.backDelay)}else{0===s&&i.options.preStringTyped(i.arrayPos);var e=t.substr(0,s+1);i.attr?i.el.attr(i.attr,e):i.isInput?i.el.val(e):"html"===i.contentType?i.el.html(e):i.el.text(e),s++,i.typewrite(t,s)}},e)},e)}},backspace:function(t,s){if(this.stop!==!0){var e=Math.round(70*Math.random())+this.backSpeed,i=this;i.timeout=setTimeout(function(){if("html"===i.contentType&&">"===t.substr(s).charAt(0)){for(var e="";"<"!==t.substr(s).charAt(0);)e-=t.substr(s).charAt(0),s--;s--,e+="<"}var r=t.substr(0,s);i.attr?i.el.attr(i.attr,r):i.isInput?i.el.val(r):"html"===i.contentType?i.el.html(r):i.el.text(r),s>i.stopNum?(s--,i.backspace(t,s)):s<=i.stopNum&&(i.arrayPos++,i.arrayPos===i.strings.length?(i.arrayPos=0,i.shuffle&&(i.sequence=i.shuffleArray(i.sequence)),i.init()):i.typewrite(i.strings[i.sequence[i.arrayPos]],s))},e)}},shuffleArray:function(t){var s,e,i=t.length;if(i)for(;--i;)e=Math.floor(Math.random()*(i+1)),s=t[e],t[e]=t[i],t[i]=s;return t},reset:function(){var t=this;clearInterval(t.timeout);var s=this.el.attr("id");this.el.after('<span id="'+s+'"/>'),this.el.remove(),"undefined"!=typeof this.cursor&&this.cursor.remove(),t.options.resetCallback()}},t.fn.typed=function(e){return this.each(function(){var i=t(this),r=i.data("typed"),o="object"==typeof e&&e;r||i.data("typed",r=new s(this,o)),"string"==typeof e&&r[e]()})},t.fn.typed.defaults={strings:[""],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,shuffle:!1,backDelay:500,loop:!1,loopCount:!1,showCursor:!0,cursorChar:"|",attr:null,contentType:"html",callback:function(){},preStringTyped:function(){},onStringTyped:function(){},resetCallback:function(){}}}(window.jQuery);

$(function(){
  $('.text').typed({
    strings: [
      "^700 hi, <span>nvan.ha</span> here"
    ],
    typeSpeed: 150,
    backSpeed: 100,
    loop: true,
    showCursor: false
  });
})