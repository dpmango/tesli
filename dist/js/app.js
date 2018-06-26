$(document).ready(function(){

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);
  var MobileMax = 767;
  var Tablet = 768;
  var TabletMax = 991;
  var Desktop = 992;
  var DesktopMax = 1199;
  var Wide = 1200;
  var WideMax = 1499;
  var Hd = 1500;


  ////////////
  // READY - triggered when PJAX DONE
  ////////////
  function pageReady(){
    legacySupport();
    // updateHeaderActiveClass();
    // initHeaderScroll();

    // initPopups();
    initSliders();
    // initScrollMonitor();
    initMasks();
    initSelectric();
    initValidations();

    // development helper
    // _window.on('resize', function() {
    // 	debounce(setBreakpoint, 200);
    // });

    // AVAILABLE in _components folder
    // copy paste in main.js and initialize here
    // initPerfectScrollbar();
    // initLazyLoad();
    // initTeleport();
    // parseSvg();
    // revealFooter();
    // _window.on('resize', throttle(revealFooter, 100));
  }

  // this is a master function which should have all functionality
  pageReady();


  //////////
  // COMMON
  //////////

  function legacySupport(){
    // svg support for laggy browsers
    svg4everybody();

    // Viewport units buggyfill
    window.viewportUnitsBuggyfill.init({
      force: false,
      refreshDebounceWait: 150,
      appendToBody: true
    });
  }


  // Prevent # behavior
	_document
    .on('click', '[href="#"]', function(e) {
  		e.preventDefault();
  	})
    .on('click', 'a[href^="#section"]', function() { // section scroll
      var el = $(this).attr('href');
      $('body, html').animate({
          scrollTop: $(el).offset().top}, 1000);
      return false;
    })


  // HEADER SCROLL
  // add .header-static for .page or body
  // to disable sticky header
  function initHeaderScroll(){
    _window.on('scroll', throttle(function(e) {
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');
      var headerHeight = header.height();
      var firstSection = _document.find('.page__content div:first-child()').height() - headerHeight;
      var visibleWhen = Math.round(_document.height() / _window.height()) >  2.5

      if (visibleWhen){
        if ( vScroll > headerHeight ){
          header.addClass('is-fixed');
        } else {
          header.removeClass('is-fixed');
        }
        if ( vScroll > firstSection ){
          header.addClass('is-fixed-visible');
        } else {
          header.removeClass('is-fixed-visible');
        }
      }
    }, 10));
  }


  // MENU AND SIDEBAR FUNCTIONS
  function mainUserClose() {
  	if ( Modernizr.mq('(max-width: '+DesktopMax+'px)') ) {
  		if ( $('.main_user').hasClass('is-active') ) {
  			$('body').removeClass('is-overflow');
			$('.header__top').removeClass('is-active');
			$('.main_user').removeClass('is-active');
  		} else {
		  	$('body').addClass('is-overflow');
			$('.header__top').addClass('is-active');
			$('.main_user').addClass('is-active');
		}
	}
  }

  _document
  .on('click', '.header__top__hamburger .js-hamburger', function(e) {
  	e.preventDefault();

  	if ( Modernizr.mq('(max-width: 1499px)') ) {
	  	var Body = $('body'),
	  		HeaderTop = $('.header__top'),
	  		MainUser = $('.main_user'),
	  		HeaderSubmenu = $('.header__menu__submenu');
  	
	  	if ( $(this).hasClass('is-active') ) {
			Body.removeClass('is-overflow');
			MainUser.removeClass('is-hidden');
			HeaderTop.removeClass('is-active');
			HeaderSubmenu.removeClass('is-active');
		} else {
			Body.addClass('is-overflow');
			MainUser.addClass('is-hidden');
			HeaderTop.addClass('is-active');
		}

	    $(this).toggleClass('is-active').closest('.header__top__hamburger').toggleClass('is-active');
	    $('.header__menu').toggleClass('is-active');
	}
  })
  .on('click', '.header__menu__item.is-parent .header__menu__link', function(e) {
  	if ( Modernizr.mq('(max-width: '+MobileMax+'px)') ) {
  		e.preventDefault();

  		var HeaderSubmenu = $('.header__menu__submenu');

	  	HeaderSubmenu.removeClass('is-active');
	  	$(this).next(HeaderSubmenu).addClass('is-active');

	  	if ( !$(this).closest('.header__menu__item').find(HeaderSubmenu).find('.header__menu__link')[0] ) {
	  		$(this).closest('.header__menu__item').find(HeaderSubmenu).prepend($(this).clone())
	  	}
  	} else if ( Modernizr.mq('(min-width: '+Tablet+'px)') && (Modernizr.touchevents || Modernizr.pointerevents) ) {
  		e.preventDefault();
  		$(this).parent('.header__menu__item').toggleClass('is-hover');
  	}
  })
  .on('click', '.main_user__head__photo, .main_user__hamburger .js-hamburger', function(e) {
  	e.preventDefault();
	mainUserClose();
  })
  .on('click', function(e) {
  	if ( $('.main_user').hasClass('is-active') && !$(e.target).closest('.main_user')[0]) {
		mainUserClose();
	}
  });
  

	var Status = '';
	if ( Modernizr.mq('(min-width: '+Wide+'px)') ) {
		Status = 'wide';
	} else if ( Modernizr.mq('(min-width: '+Tablet+'px)') ) {
		Status = 'tablet';
	} else if ( Modernizr.mq('(max-width: '+MobileMax+'px)') ) {
		Status = 'mobile';
	}

	_window.on('resize', function() {
		if ( Status != 'wide' && Modernizr.mq('(min-width: '+Wide+'px)') ) {
			Status = 'wide';

			$('.main_user').removeClass('is-active is-hidden');
		} else if ( Status != 'tablet' && Modernizr.mq('(min-width: '+Tablet+'px)') ) {
			Status = 'tablet';

			$('body').removeClass('is-overflow');
			$('.header__top, .header__menu, .header__menu__submenu, .header__top__hamburger, .header__top__hamburger .js-hamburger').removeClass('is-active');
		} else if ( Status != 'mobile' && Modernizr.mq('(max-width: '+MobileMax+'px)') ) {
			Status = 'mobile';

			$('body').removeClass('is-overflow');
			$('.header__menu__item').removeClass('is-hover');
			$('.header__top, .header__menu, .header__menu__submenu, .header__top__hamburger, .header__top__hamburger .js-hamburger').removeClass('is-active');
		}
	});


  // SET ACTIVE CLASS IN HEADER
  // * could be removed in production and server side rendering when header is inside barba-container
  function updateHeaderActiveClass(){
    $('.header__menu li').each(function(i,val){
      if ( $(val).find('a').attr('href') == window.location.pathname.split('/').pop() ){
        $(val).addClass('is-active');
      } else {
        $(val).removeClass('is-active')
      }
    });
  }

  //////////
  // SLIDERS
  //////////

  function initSliders(){
  	var SwiperOptions = {
  		wrapperClass: "swiper-wrapper",
		slideClass: "swiper-slide",
		direction: 'horizontal',
		loop: false,
		watchOverflow: true,
		setWrapperSize: false,
		spaceBetween: 0,
		slidesPerView: 1,
		autoHeight: true,
		// loop: true,
		normalizeSlideIndex: true,
		// centeredSlides: true,
		// freeMode: true,
		// effect: 'fade',
		autoplay: {
			delay: 3000
		},
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev'
		},
		pagination: {
			el: '.swiper-pagination',
    		type: 'bullets',
    		clickable: true
		}
		// breakpoints: {
		//   // when window width is <= 992px
		//   992: {
		//     autoHeight: true
		//   }
		// }
  	};

    // EXAMPLE SWIPER
    // var SwiperOptionsSlider = $.extend({}, SwiperOptions, true);
    // $('.js-slider').each(function() {
	   //  new Swiper('.js-slider', SwiperOptionsSlider);
    // })
    


    var SliderMain = new Swiper('.main_slideshow .swiper-container', {
    	wrapperClass: "swiper-wrapper",
		slideClass: "swiper-slide",
		direction: 'horizontal',
		loop: false,
		watchOverflow: true,
		setWrapperSize: false,
		spaceBetween: 0,
		slidesPerView: 1,
		autoHeight: true,
		normalizeSlideIndex: true,
		pagination: {
			el: '.main_slideshow .swiper-pagination',
    		type: 'bullets',
    		clickable: true
		}
    });


    var SliderSidebarBanner = new Swiper('.sidebar__banner_slideshow .swiper-container', {
    	wrapperClass: "swiper-wrapper",
		slideClass: "swiper-slide",
		direction: 'horizontal',
		loop: false,
		watchOverflow: true,
		setWrapperSize: false,
		spaceBetween: 0,
		slidesPerView: 1,
		autoHeight: true,
		normalizeSlideIndex: true,
		pagination: {
			el: '.sidebar__banner_slideshow .swiper-pagination',
    		type: 'bullets',
    		clickable: true
		}
    });


    var SliderAchievements = new Swiper('.user__achievements .swiper-container', {
    	wrapperClass: "swiper-wrapper",
		slideClass: "swiper-slide",
		direction: 'horizontal',
		loop: true,
		watchOverflow: true,
		setWrapperSize: false,
		spaceBetween: 0,
		slidesPerView: 3,
		autoHeight: true,
		normalizeSlideIndex: true,
		autoplay: {
			delay: 3000
		},
		navigation: {
			nextEl: '.user__achievements .swiper-next',
			prevEl: '.user__achievements .swiper-prev'
		}
    });
  }

  //////////
  // MODALS
  //////////

  function initPopups(){
    // Magnific Popup
    var startWindowScroll = 0;
    $('[js-popup]').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'popup-buble',
      callbacks: {
        beforeOpen: function() {
          startWindowScroll = _window.scrollTop();
          // $('html').addClass('mfp-helper');
        },
        close: function() {
          // $('html').removeClass('mfp-helper');
          _window.scrollTop(startWindowScroll);
        }
      }
    });

    $('[js-popup-gallery]').magnificPopup({
  		delegate: 'a',
  		type: 'image',
  		tLoading: 'Загрузка #%curr%...',
  		mainClass: 'popup-buble',
  		gallery: {
  			enabled: true,
  			navigateByImgClick: true,
  			preload: [0,1]
  		},
  		image: {
  			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  		}
  	});
  }

  function closeMfp(){
    $.magnificPopup.close();
  }

  ////////////
  // UI
  ////////////

  // textarea autoExpand
  _document
    .one('focus.autoExpand', '.ui-group textarea', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', '.ui-group textarea', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
        this.rows = minRows + rows;
    });

  // Masked input
  function initMasks(){
    $("[js-dateMask]").mask("99.99.99",{placeholder:"ДД.ММ.ГГ"});
    $("input[type='tel']").mask("+7 (000) 000-0000", {placeholder: "+7 (___) ___-____"});
  }

  // selectric
  function initSelectric(){
    $('select').selectric({
      maxHeight: 300,
      arrowButtonMarkup: '<b class="button"><svg class="ico ico-select-down"><use xlink:href="img/sprite.svg#ico-select-down"></use></svg></b>',
      onInit: function(element, data){
        var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);

        $wrapper.find('.label').html($elm.attr('placeholder'));
      },
      onBeforeOpen: function(element, data){
        var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);

        $wrapper.find('.label').data('value', $wrapper.find('.label').html()).html($elm.attr('placeholder'));
      },
      onBeforeClose: function(element, data){
        var $elm = $(element),
            $wrapper = $elm.closest('.' + data.classes.wrapper);

        $wrapper.find('.label').html($wrapper.find('.label').data('value'));
      }
    });
  }

  ////////////
  // SCROLLMONITOR - WOW LIKE
  ////////////
  function initScrollMonitor(){
    $('.wow').each(function(i, el){

      var elWatcher = scrollMonitor.create( $(el) );

      var delay;
      if ( $(window).width() < 768 ){
        delay = 0
      } else {
        delay = $(el).data('animation-delay');
      }

      var animationClass = $(el).data('animation-class') || "wowFadeUp"

      var animationName = $(el).data('animation-name') || "wowFade"

      elWatcher.enterViewport(throttle(function() {
        $(el).addClass(animationClass);
        $(el).css({
          'animation-name': animationName,
          'animation-delay': delay,
          'visibility': 'visible'
        });
      }, 100, {
        'leading': true
      }));
      // elWatcher.exitViewport(throttle(function() {
      //   $(el).removeClass(animationClass);
      //   $(el).css({
      //     'animation-name': 'none',
      //     'animation-delay': 0,
      //     'visibility': 'hidden'
      //   });
      // }, 100));
    });

  }

  ////////////////
  // FORM VALIDATIONS
  ////////////////

  // jQuery validate plugin
  // https://jqueryvalidation.org
  function initValidations(){
    // GENERIC FUNCTIONS
    var validateErrorPlacement = function(error, element) {
      error.addClass('ui-input__validation');
      error.appendTo(element.parent("div"));
    }
    var validateHighlight = function(element) {
      $(element).parent('div').addClass("has-error");
    }
    var validateUnhighlight = function(element) {
      $(element).parent('div').removeClass("has-error");
    }
    var validateSubmitHandler = function(form) {
      $(form).addClass('loading');
      $.ajax({
        type: "POST",
        url: $(form).attr('action'),
        data: $(form).serialize(),
        success: function(response) {
          $(form).removeClass('loading');
          var data = $.parseJSON(response);
          if (data.status == 'success') {
            // do something I can't test
          } else {
              $(form).find('[data-error]').html(data.message).show();
          }
        }
      });
    }

    var validatePhone = {
      required: true,
      normalizer: function(value) {
          var PHONE_MASK = '+X (XXX) XXX-XXXX';
          if (!value || value === PHONE_MASK) {
              return value;
          } else {
              return value.replace(/[^\d]/g, '');
          }
      },
      minlength: 11,
      digits: true
    }

    ////////
    // FORMS


    /////////////////////
    // REGISTRATION FORM
    ////////////////////
    $(".js-registration-form").validate({
      errorPlacement: validateErrorPlacement,
      highlight: validateHighlight,
      unhighlight: validateUnhighlight,
      submitHandler: validateSubmitHandler,
      rules: {
        first_name: "required",
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 6,
        },
        phone: validatePhone
      },
      messages: {
        first_name: "Заполните это поле",
        email: {
            required: "Заполните это поле",
            email: "Email содержит неправильный формат"
        },
        password: {
            required: "Заполните это поле",
            email: "Пароль мимимум 6 символов"
        },
        phone: {
            required: "Заполните это поле",
            minlength: "Введите корректный телефон"
        }
      }
    });
  }


  // //////////
  // // BARBA PJAX
  // //////////
  // var easingSwing = [.02, .01, .47, 1]; // default jQuery easing for anime.js

  // Barba.Pjax.Dom.containerClass = "page";

  // var FadeTransition = Barba.BaseTransition.extend({
  //   start: function() {
  //     Promise
  //       .all([this.newContainerLoading, this.fadeOut()])
  //       .then(this.fadeIn.bind(this));
  //   },

  //   fadeOut: function() {
  //     var deferred = Barba.Utils.deferred();

  //     anime({
  //       targets: this.oldContainer,
  //       opacity : .5,
  //       easing: easingSwing, // swing
  //       duration: 300,
  //       complete: function(anim){
  //         deferred.resolve();
  //       }
  //     })

  //     return deferred.promise
  //   },

  //   fadeIn: function() {
  //     var _this = this;
  //     var $el = $(this.newContainer);

  //     $(this.oldContainer).hide();

  //     $el.css({
  //       visibility : 'visible',
  //       opacity : .5
  //     });

  //     anime({
  //       targets: "html, body",
  //       scrollTop: 1,
  //       easing: easingSwing, // swing
  //       duration: 150
  //     });

  //     anime({
  //       targets: this.newContainer,
  //       opacity: 1,
  //       easing: easingSwing, // swing
  //       duration: 300,
  //       complete: function(anim) {
  //         triggerBody()
  //         _this.done();
  //       }
  //     });
  //   }
  // });

  // // set barba transition
  // Barba.Pjax.getTransition = function() {
  //   return FadeTransition;
  // };

  // Barba.Prefetch.init();
  // Barba.Pjax.start();

  // Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML) {

  //   pageReady();

  // });

  // // some plugins get bindings onNewPage only that way
  // function triggerBody(){
  //   _window.scrollTop(0);
  //   $(window).scroll();
  //   $(window).resize();
  // }

  //////////
  // MEDIA Condition helper function
  //////////
  // function mediaCondition(cond){
  //   var disabledBp;
  //   var conditionMedia = cond.substring(1);
  //   var conditionPosition = cond.substring(0, 1);

  //   if (conditionPosition === "<") {
  //     disabledBp = _window.width() < conditionMedia;
  //   } else if (conditionPosition === ">") {
  //     disabledBp = _window.width() > conditionMedia;
  //   }

  //   return disabledBp
  // }

  //////////
  // DEVELOPMENT HELPER
  //////////
  // function setBreakpoint(){
  //   var wHost = window.location.host.toLowerCase()
  //   var displayCondition = wHost.indexOf("localhost") >= 0 || wHost.indexOf("surge") >= 0
  //   if (displayCondition){
  //     var wWidth = _window.width();

  //     var content = "<div class='dev-bp-debug'>"+wWidth+"</div>";

  //     $('.page').append(content);
  //     setTimeout(function(){
  //       $('.dev-bp-debug').fadeOut();
  //     },1000);
  //     setTimeout(function(){
  //       $('.dev-bp-debug').remove();
  //     },1500)
  //   }
  // }

	


});


/**************************************************************************
Plugin Видео проигрыватель
/**************************************************************************/
(function($) {
    $.fn.videoPlayer = function() {
        var Ratio = 720/1280,
            Tag = document.createElement('script'),
            FirstScriptTag = document.getElementsByTagName('script')[0],
            Player;

        Tag.src = "https://www.youtube.com/iframe_api";
        FirstScriptTag.parentNode.insertBefore(Tag, FirstScriptTag);

        youTubeVideo = function(Container, Src, Width) {
            Player = new YT.Player(Container[0], {
                videoId: Src,
                events: {
                    'onReady': youTubeVideoPlay,
                    'onStateChange': youTubeVideoState
                }
            });
        }

        youTubeVideoState = function(e) {
            switch (e.data) {
                case 0:
                    $(e.target.getIframe()).next('.videoplayer_button').show();
                    Player.destroy();
                    break;
            }
        }

        youTubeVideoPlay = function(e) {
            e.target.playVideo();
            $(e.target.getIframe()).next('.videoplayer_button').hide();
        }

        containerBuild = function() {
            $('.videoplayer').each(function() {
                var Src = $(this).data('src');

                $(this)
                .attr('data-src', Src)
                .css({
                    backgroundImage: 'url("http://img.youtube.com/vi/'+Src+'/0.jpg")'
                })
                .html('<div class="videoplayer_video"></div><div class="videoplayer_button"><svg id="ico-play" viewBox="0 0 60 60" width="100%" height="100%"><path d="M53.479 27.435L10.672.915C7.553-1.132 5 .374 5 4.261v51.48c0 3.885 2.553 5.391 5.672 3.346l42.807-26.52S55 31.497 55 30.001s-1.521-2.566-1.521-2.566z"></path></svg></div>');
            });
        }

        containerSize = function() {
            $('.videoplayer').each(function() {
                $(this).css({
                    height: ($(this).width()*Ratio)+'px'
                });
            });
        }

        containerBuild();

        $(document).on('click', '.videoplayer_button', function(e) {
            e.preventDefault();
            var Container = $(this).closest('.videoplayer');
            youTubeVideo(Container.find('.videoplayer_video'), Container.data('src'), Container.data('width'));
        });
    }
})(jQuery);
$.fn.videoPlayer();
/**************************************************************************
END Plugin Видео проигрыватель
/**************************************************************************/


/**************************************************************************
Detect if retina display
/**************************************************************************/
function isRetina() {
    var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
    if (window.devicePixelRatio > 1)
        return true;
    if (window.matchMedia && window.matchMedia(mediaQuery).matches)
        return true;
    return false;
};
/**************************************************************************
END Detect if retina display
/**************************************************************************/


/**************************************************************************
Background images width lazy load
Make background-image for element Cover state or Contain from IMG src
/**************************************************************************/
function bgImage(el) {
	$(el).each(function() {
		$el = $(this);

		if ( $el.is('.cover') || $el.is('.contain') ) {
			$el.css({
				backgroundImage: function() {
					var Img = $(this).find('>img');

					if ( isRetina && Img.attr('srcset') != '' ) {
						return 'url('+$(this).find('>img').attr('srcset')+')';
					} else {
						return 'url('+$(this).find('>img').attr('src')+')';
					}
				},
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: function() {
					Value = '';
					if ( $el.is('.cover') ) {
						Value = 'cover';
					} else if ( $el.is('.contain') ) {
						Value = 'contain';
					}
					return Value;
				}
			}).addClass('is-loaded').find('>img').hide();
		}
	})
}
$(window).on('load', function() {
	bgImage('.cover, .contain');
})
/**************************************************************************
END Background images width lazy load
/**************************************************************************/


/**************************************************************************
Datepicker
/**************************************************************************/
$('.datepicker_input').datepicker({
	position: 'top left',
	inline: false,
	autoClose: true
})

// Button for open datepicker in container
$(document).on('click', '.datepicker_container', function(e) {
	var dp = $(this).find('.datepicker_input').datepicker().data('datepicker');
	dp.show();
})
/**************************************************************************
END Datepicker
/**************************************************************************/