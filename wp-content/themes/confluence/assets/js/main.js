(function($) {
  "use strict";

  var $body = $('html, body');

	var blogIsotope = function() {
    var imgLoad = imagesLoaded($('.blog-masonry'));

    imgLoad.on('done', function(){
      $('.blog-masonry').isotope({
        "itemSelector": ".post-masonry",
      });
     });
   
   imgLoad.on('fail', function(){
      $('.blog-masonry').isotope({
        "itemSelector": ".post-masonry",
      });
   });  
     
  };
  blogIsotope();

  /*function( newElements ) {
    // hide new items while they are loading
    var newElems = jQuery(newElements);
        \$isoContainer.imagesLoaded(function () {
      \$isoContainer.isotope('appended', newElems, true);
    });
  }*/

             
  

  if ($('.back-to-top').length) {
    var scrollTrigger = 100, // px
    backToTop = function () {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > scrollTrigger) {
        $('.back-to-top').addClass('show');
      } else {
        $('.back-to-top').removeClass('show');
      }
    };
    
    $(window).on('scroll', function () {
        backToTop();
    });
    $('.back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
          scrollTop: 0
        }, 700);
    });
  }

  /*if ($('.scroll-down').length) {

    $(window).on('scroll', function () {
      scrollDown();
    });
    $('.scroll-down').on('click', function (e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      }, 700);
    });
  }*/

  /*$('scrollDown').click(function() {
    $('html,body').animate({
          scrollTop: $('.projects').offset().top},
        700);
  });

  jQuery(document).ready(function($){
    $('.scrollDown').on('click', function() {
      $('.projects').scrollTop().top},
        700);
  });*/

  $.fn.scrollView = function () {
    return this.each(function () {
      $('html, body').animate({
        scrollTop: $(this).offset().top-100
      }, 700);
    });
  };

  $('.scrollDown').on('click', function(e){
    e.preventDefault();
    $('#projects').scrollView();
    $('#videos').scrollView();
  });



  jQuery(document).ready(function($){
    $('.fa-search').on('click', function() {
      $('.search-bar').slideToggle();
    });
  });

  $(document).ready(function(){
    $('.search-trigger').click( function(){
      $('.search-form').fadeToggle(1000);
    });
  });

  /*$(document).ready(function(){
    $('a').nivoLightbox();
  });

  $('.lightbox').nivoLightbox({
    keyboardNav: true,
  });*/


  //$(".video-content").fitVids();

  $('textarea').autogrow(); 

  var mobileHeader = function() {
    var navigationToggle = $('.mobile-header .mobile-menu-toggle'),
      navToggleLink = navigationToggle.find('a'),
      mobileNav = $('.mobile-header .mobile-navigation'),
      dropToggle = $(".mobile-navigation .expander, .mobile-navigation a[href*='#']"),
      animTime = 200;


    var $nav = $('.mobile-navigation'),
      $button = $('#toggle-nav');

    $button.on('click', function (e) {
      var isActivating = !$nav.hasClass('active');

      $(this).toggleClass('active', isActivating);

      $nav.toggleClass('active').fadeToggle(300, function () {
          $nav.scrollTop(0);
      });

      $body.trigger(isActivating ? 'lock' : 'unlock');
    });

    if(dropToggle.length) {
      dropToggle.each(function() {
        $(this).on('tap click', function(e) {
          var dropToggleOpen = $(this).nextAll('ul').first();

          if(dropToggleOpen.length) {
            e.preventDefault();

            var dropParent = $(this).parent('li');

            if(dropToggleOpen.is(':visible')) {
              dropToggleOpen.slideUp(animTime);
              dropParent.removeClass('dropdown-open');
            } else {
              dropToggleOpen.slideDown(animTime);
              dropParent.addClass('dropdown-open');
            }

          }

        });
      });
    }

  }

  mobileHeader();

  // Mobile Header Scroller
  var mobileNavScroller = function() {
    var mobileMenuWrapper = $('.mobile-nav-content');
    if(mobileMenuWrapper.length){    
      mobileMenuWrapper.niceScroll({ 
        scrollspeed: 60,
        mousescrollstep: 40,
        cursorwidth: 0, 
        cursorborder: 0,
        cursorborderradius: 0,
        cursorcolor: "#eee",
        autohidemode: false, 
        horizrailenabled: false 
      });
    }
  }

  mobileNavScroller();

  // Carousels

  $("#featured-activities .owl-carousel").owlCarousel({
    //items: 4,
    loop:true,
    responsiveClass:true,
    margin: 20,
    dots: false,
    nav: true,
    navText: ['<i class="fa fa-arrow-left fa-2x"></i>','<i class="fa fa-arrow-right fa-2x"></i>'],
    responsive: {
      0: {
        items: 1,
        nav: true,
        loop:true
      },
      600: {
        items: 2,
        nav: true,
        loop:true
      },
      1000: {
        items: 4  ,
        nav: true,
        loop:true
        //loop: false
      }
    }
  });

    // magnific popup

    $(document).ready(function() {


        $('.filter-btn').on('click', function(e){
            e.preventDefault();
            var groupID = $(this).data('groupid');
            if(groupID == -1){
                $('.galleryItem').magnificPopup({
                    type: 'image',
                    image: {
                        titleSrc: function(item) {
                            return item.el.attr('title') + '<small>'+ item.el.data('desc') +'</small>';
                        }},
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    gallery: { enabled:true }
                });
            }
            else{
                $("a[data-group*='"+groupID+"']").magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    gallery: { enabled:true },
                    image: {
                        titleSrc: function(item) {
                            return item.el.attr('title') + '<small>'+ item.el.data('desc') +'</small>';
                        }}
                });
            }
        });

        $('.projectGalleryItem').magnificPopup({
            delegate: 'a', // child items selector, by clicking on it popup will open
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            gallery: { enabled:true }
            // other options
        });

        $('.filter-all-btn').trigger('click');
        /*var groups = {};
        $('.galleryItem').each(function() {
            var id = parseInt($(this).attr('data-group'), 10);

            if(!groups[id]) {
                groups[id] = [];
            }

            groups[id].push( this );
        });

        $.each(groups, function() {

            $(this).magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: false,
                gallery: { enabled:true }
            })

        });*/

    });

 /* $('#featured-activities .owl-carousel').owlCarousel({
    loop:true,
    margin:20,
    responsiveClass:true,
    nav: true,
    navText: ['<i class="fa fa-arrow-left fa-2x"></i>','<i class="fa fa-arrow-right fa-2x"></i>'],
    responsive:{
      0:{
        items:1,
        nav:true
      },
      600:{
        items:2,
        nav:false
      },
      1000:{
        items:2,
        nav:true,
        loop:false
      }
    }
  })*/


})(jQuery);


