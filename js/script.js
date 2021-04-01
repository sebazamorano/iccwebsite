;(function($){
	'use strict';
	var $win = $(window), $body_m = $('body');
	// Touch Class
	if (!("ontouchstart" in document.documentElement)) {
		$body_m.addClass("no-touch");
	}
	// Get Window Width
	function winwidth () {
		return $win.width();
	}
	var wwCurrent = winwidth();
	$win.on('resize', function () {
		wwCurrent = winwidth();
	});
	// Sticky
	var $is_sticky = $('.is-sticky');
	if ($is_sticky.length > 0 ) {
		var $navm = $('#mainnav').offset();
		$win.scroll(function(){
			var $scroll = $win.scrollTop();
			if ($win.width() > 991) {
				if($scroll > $navm.top+4 ){
				  if(!$is_sticky.hasClass('has-fixed')) {$is_sticky.addClass('has-fixed');}
				} else {
				  if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
				}
			} else {
				if($is_sticky.hasClass('has-fixed')) {$is_sticky.removeClass('has-fixed');}
			}
		});
	}
	// Slider
	var $slider = $('#slider');
	if ($slider.length > 0 ) {
	$slider.carousel({ interval:6000, pause: 'null' });
	}
	//Carousel
	var $has_carousel = $('.has-carousel');
	if ($has_carousel.length > 0 ) {
		$has_carousel.each(function(){
			var $self = $(this);
			var c_item = ($self.data('items')) ? $self.data('items') : 4;
			var c_item_t = (c_item >= 3) ? 3 : c_item;
			var c_item_m = (c_item_t >= 2) ? 2 : c_item_t;
			var c_delay =($self.data('delay')) ? $self.data('delay') : 4000;
			var c_auto =($self.data('auto')) ? true : false;
			var c_loop =($self.data('loop')) ? true : false;
			var c_dots = ($self.data('dots')) ? true : false;
			var c_navs = ($self.data('navs')) ? true : false;
			var c_mgn = ($self.data('margin')) ? $self.data('margin') : 30;
			$self.owlCarousel({
				navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
				items: c_item, loop: c_loop, nav: c_navs, dots: c_dots, margin: c_mgn,
				autoplay: c_auto, autoplayTimeout: c_delay, autoplaySpeed: 700,
				responsive:{ 0:{ items:1 }, 480:{ items: c_item_m }, 768:{ items: c_item_t }, 1170:{ items: c_item } }
			});
		});
	}
	// LogoCarousel
	var $logo_carousel = $('.logo-carousel');
	if ($logo_carousel.length > 0 ) {
		$logo_carousel.owlCarousel({
			items: 5, loop: true, margin: 30, responsive:{0:{ items:2 }, 379:{ items:3 }, 720:{ items:4 }, 1280:{ items:6 } }
		});
	}
	// Parallax
	var $parallax = $('.has-parallax');
	if ($parallax.length > 0 ) {
		$parallax.each(function() {
			$(this).parallaxie({ speed: 0.3, offset: 0 });
		});
	}
	// Active page menu when click
	var CurURL = window.location.href, urlSplit = CurURL.split("#");
	var $nav_link = $(".nav li a");
	if ($nav_link.length > 0) {
		$nav_link.each(function() {
			if (CurURL === (this.href) && (urlSplit[1]!=="")) {
				$(this).closest("li").addClass("active").parent().closest("li").addClass("active");
			}
		});
	}
	// Mobile Menu With Tap @iO
	var $nav = $('#mainnav'), $navbar = $(".navbar"); var $navitem = $nav.find('li'), $navlink = $nav.find('a');
	function NavToggle($elem, $state) {
		var elm = $elem, sts = ($state===true||$state==="open"||$state===1) ? true : false;
		if (sts===true) {
			elm.slideDown(600);
		} else {
			elm.slideUp(500);
			elm.find('li.nav-opened').removeClass('nav-opened').children('ul').slideUp(300);
		}
	}
	function NavMobile() {
		if ($win.width() > 767) {
			$nav.removeClass("nav-mobile");
			$nav.find('.has-children').removeClass('nav-opened').removeClass('rollover').children('ul').removeAttr('style');
		} else {
			$nav.addClass("nav-mobile");
		}
	}
	NavMobile();
	$win.on('resize', function () { NavMobile(); });
	$navitem.has('ul').addClass('has-children');
	$navitem.on({
		mouseenter: function() {
			$(this).addClass('rollover');
		},
		mouseleave: function() {
			$(this).removeClass('rollover');
		}

	});
	$navlink.on('click touchstart', function(e) {
			var $self = $(this), $selfP = $self.parent(), selfHref = $self.attr('href');
			if (e.type==='click' && wwCurrent > 767) {return true;}
			if ($selfP.hasClass('has-children')) {
				if ($selfP.hasClass('nav-opened')){
					$selfP.removeClass('nav-opened');
					if (selfHref==="#") {
						NavToggle($selfP.children('ul'), 'close');
						return false;
					}
					return true;
				} else {
					$selfP.addClass('nav-opened');
					$selfP.siblings().removeClass('nav-opened');
					NavToggle($selfP.siblings().children('ul'), 'close');
					setTimeout(function() {
						NavToggle($selfP.children('ul'), 'open');
					}, 150);
					return false;
				}
			}
			if (selfHref==="#") { return false; }
	});

	// Preloader
	var $preload = $('#preloader');
	if ($preload.length > 0) {
		$win.on('load', function() {
			$preload.children().fadeOut(300);
			$preload.delay(150).fadeOut(500);
			$body_m.delay(100).css({'overflow':'visible'});
		});
	}

	// ScrollDown to
	var $scrollBtn = $('.scroll-to');
	if($scrollBtn.length > 0){
		$scrollBtn.on('click', function(){
			var nbar = (wwCurrent >= 992) ? $navbar.height() - 10 : 0;
			$('html, body').animate({ scrollTop: $( $.attr(this, 'href') ).offset().top - nbar }, 1200);
			return false;
		});
	}
	// Smooth Scroll
	var $opNavLink = $('.nav li a[href^="#"]');
	if($opNavLink.length > 0 && ($body_m.hasClass('site-onepage')) ){
		$opNavLink.on('click', function (e) {
			if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {
				var gotoH = $(this.hash),  gotoN = (this.hash.slice(1)) ? $('[name=' + this.hash.slice(1) +']') : false, nbar = (wwCurrent >= 992) ? $navbar.height() - 10 : 0;
				gotoH = gotoH.length ? gotoH : gotoN;
				if (gotoH.length) {
					$('html,body').animate({
						scrollTop: gotoH.offset().top - nbar
					}, 1200);
					if (wwCurrent < 768) {
						$navbar.find('.navbar-toggle').addClass('collapsed');
						$navbar.find('.navbar-collapse').collapse('hide');
					}
				}
			}
			e.preventDefault();
		});
	}
	// ScrolSpy
	$body_m.scrollspy({
		target: '#mainnav',
		offset: 80
	});
	// Google map initialize
	var $mapholder = $('.map-holder');
	if ($mapholder.length > 0) {
		var map = new GMaps({
			div: '#gmap',
			lat: -12.043333,
			lng: -77.028333
		});
		$mapholder.on('click', function () {
			$(this).children().css("pointer-events", "auto");
		});
		$mapholder.on('mouseleave', function() {
			$(this).children().css("pointer-events", "none");
		});
	}
	// ImageBG
	var $imageBG = $('.imagebg');
	if ($imageBG.length > 0) {
		$imageBG.each(function(){
			var $this = $(this),
				$that = $this.parent(),
				overlay = $this.data('overlay'),
				image = $this.children('img').attr('src');
			var olaytyp = (typeof overlay!=='undefined' && overlay!=='') ? overlay.split('-') : false;

			if (typeof image!=='undefined' && image !==''){
				if (!$that.hasClass('has-bg-image')) {
					$that.addClass('has-bg-image');
				}
				if ( olaytyp!=='' && (olaytyp[0]==='dark') ) {
					if (!$that.hasClass('light')) {
						$that.addClass('light');
					}
				}
				$this.css("background-image", 'url("'+ image +'")').addClass('bg-image-loaded');
			}
		});
	}
	// Gallery Filtering
	var $filtered  = $('.gallery-filter ul'), $filterLi = $('.filter-menu li');
	if ($filterLi.length > 0) {
	// Active -item
	$filterLi.on('click', function () {
		$filterLi.removeClass('active');
		$(this).addClass('active');
	});
	// Filter -init()
	$win.on('load', function() {
		$filtered.filterizr({
			delay: 25
		});
	});
	}
	// Gallery Popup
	var $gallery = $('.gallery-lightbox');
	if ($gallery.length > 0) {
	  $gallery.magnificPopup({
		delegate: 'a',
		type:'image',
		gallery: { enabled: true },
		image: { titleSrc: function (item) {
			var caption = '', title = item.el.find('img').attr('title'), subtitle = item.el.find('img').attr('alt');
			if (typeof title!=='undefined' && title !=='') {
			  caption = caption + title;
			}
			if (typeof subtitle!=='undefined' && subtitle !=='') {
			  if (typeof title==='undefined' || title ==='') {
				caption = caption + subtitle;
			  } else {
				caption = caption + '<small>' + subtitle + '</small>';
			  }
			}
			if (caption==="") {
			  caption = item.el.attr('title');
			}
			return caption;
		  }
		},
		zoom: { enabled: true }
	  });
	}

	// Image Single Popup
	var $image = $('.single-lightbox');
	if ($image.length > 0) {
	$image.magnificPopup({
		gallery: { enabled: true },
		type:'image'
	  });
	}
	// FORMS
	var contactForm = $('#contact-us'), quoteForm = $('#quote-request'), $reGCap = $('.g-recaptcha');
	if (quoteForm.length > 0 || contactForm.length > 0) {
		if( !$().validate || !$().ajaxSubmit ) {
		  console.log('quoteForm: jQuery Form or Form Validate not Defined.');
		  return true;
		}
		var has_reCap = ($reGCap.length > 0) ? true : false;
		var cap_msg = 'Please confirm captcha to proceed.';
	  // Quote Form - home page
	  if (quoteForm.length > 0) {
		  var qf_results = quoteForm.find('.form-results');
		  quoteForm.validate({
			ignore: [],
			invalidHandler: function () { qf_results.slideUp(400); },
			submitHandler: function(form) {
				if (has_reCap===true && !grecaptcha.getResponse()) {
					qf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert alert-danger').html(cap_msg).slideDown(400);
				} else {
				  qf_results.slideUp(400);
				  $(form).ajaxSubmit({
					target: qf_results, dataType: 'json',
					success: function(data) {
					  var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
					  qf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
					  if (data.result !== 'error') { $(form).clearForm(); if (has_reCap===true) {grecaptcha.reset();} }
					}
				  });
				}
			}
		  });
	  }
	  // Contact Form - contact page
	  if (contactForm.length > 0) {
		var cf_results = contactForm.find('.form-results');
		contactForm.validate({
			invalidHandler: function () { cf_results.slideUp(400); },
			submitHandler: function(form) {
			if (has_reCap===true && !grecaptcha.getResponse()) {
				cf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert alert-danger').html(cap_msg).slideDown(400);
			} else {
				cf_results.slideUp(400);
				$(form).ajaxSubmit({
					target: cf_results, dataType: 'json',
					success: function(data) {
						var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
						cf_results.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
						if (data.result !== 'error') { $(form).clearForm(); if (has_reCap===true) {grecaptcha.reset();} }
					}
				});
			}
			}
		});
	  }
	}



		$('.nav a').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		})

		$('a.scroll').on('click', function (e) {
			var href = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(href).offset().top
			}, 'slow');
			e.preventDefault();
		});



})(jQuery);
