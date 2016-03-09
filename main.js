// YandexMap

(function() {

	function coords(str) {
		return str.split(',');
	}

	function init(options) {
		options.center = coords(options.center);

		$.each(options.data, function(key, item) {
			item.coords = coords(item.coords);
		});

		if (options.type == 'google') {

			google.maps.event.addDomListener(window, 'load', function() {
				
				var map = new google.maps.Map(document.getElementById(options.id), {
					zoom: 15,
					center: new google.maps.LatLng(options.center[0], options.center[1]),
					scrollwheel: false
				});

				$.each(options.data, function(key, item) {

					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(item.coords[0], item.coords[1]),
						map: map,
						title: item.name
					});

					var infowindow = new google.maps.InfoWindow({
						content: '<div class="baloon-content">' +
									'<h3>' + item.name + '</h3>' +
									item.desc +
								 '</div>'
					});

					google.maps.event.addListener(marker, 'click', function() {
						infowindow.open(map, marker);
					});
				});
			});

		} else {

			ymaps.ready(function() {

				var map = new ymaps.Map(options.id, {
					center: options.center,
					zoom: options.zoom,
					behaviors: ['drag', 'rightMouseButtonMagnifier'],
				});

				map.controls.add(
					new ymaps.control.ZoomControl()
				);

				var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
					'<div class="baloon-content">' +
						'<h3>$[properties.name]</h3>' +
						'$[properties.desc]' +
					'</div>'
				);

				var myCollection = new ymaps.GeoObjectCollection();

				$.each(options.data, function(key, item) {
					myCollection.add(new ymaps.Placemark(
						item.coords,
						item, 
						{balloonContentLayout: MyBalloonContentLayoutClass}
					));
				});

				map.geoObjects.add(myCollection);

			});
		}
	}

	window.mjsMap = init;
})();

// /YandexMap

$(function() {
	$('table').wrap('<div class="table-wrapper"></div>');

    //
	(function() {
        var $owl = $('.owl-carousel'),
        	owlItem = $('.block-product-wr .block-product').length;

        $owl.owlCarousel({
            margin: 20,
            loop: 1,
            autoplay: 1,
            nav: 0,
            responsive: {
              0: {
                items: 1,
                dots: (owlItem > 1) ? 1 : 0
              },
              500: {
                items: 2,
                dots: (owlItem > 2) ? 1 : 0
              },
              760: {
                items: 3,
                dots: (owlItem > 3) ? 1 : 0
              },
              1000: {
                items: 3,
                dots: (owlItem > 3) ? 1 : 0
              }
            }
        })
    })();

	//

	(function() {
        var $owl2 = $('.owl-carousel-reviews');

        $owl2.owlCarousel({
            margin: 20,
            loop: 1,
            autoplay: 1,
            nav: false,
            responsive: {
              0: {
                items: 1
              },
              760: {
                items: 1
              },
              1000: {
                items: 1
              }
            }
        })
    })();

//Navigation-fixed//

	function navFixed(){
	    $(window).scroll(function() {
	        var top = $(document).scrollTop();
		    var headP= $('.site-header').height();
		    var lineHeight= $('.navigation-line-wr').innerHeight();


			if($(window).width() >= 940) {
		        if (top >= headP) {
		            $('.navigation-line-wr').addClass('fixed-position');
		            $(".site-header").css("margin-bottom", lineHeight);
		        } else {
		            $('.navigation-line-wr').removeClass('fixed-position');
		            $(".site-header").css("margin-bottom", 0);
		        }
		    }
	    });
	}
	navFixed();


//Navigation

	var nav = $('.navigation-line-wr > .navigation-line > ul li a'),
		btnBot = $('.go-bottom'),
		header = $('.site-header'),
		k = true,
		hash;

	nav.click(function() {
		if ($('html, body').is(':animated')) return false;

		hash = $(this).attr('href');
		if ($(hash).length) {
			k = false;

			nav.removeAttr('class');
			$(this).addClass('active');

			$('html, body').animate({
				scrollTop : $(hash).offset().top - nav.parents('.navigation-line-wr').height()
			}, 600, function() {
				setTimeout(function() {k = true}, 100);
			});
		}
		return false;
	})

	btnBot.click(function() {
		if ($('html, body').is(':animated')) return false;

		hash = $(this).attr('href');
		if ($(hash).length && $(window).width() >= 940) {
			k = false;

			nav.removeAttr('class');
			$(nav[1]).addClass('active');

			$('html, body').animate({
				scrollTop : $(hash).offset().top - nav.parents('.navigation-line-wr').height()
			}, 600, function() {
				setTimeout(function() {k = true}, 100);
			});
		} else if ($(hash).length && $(window).width() <= 939) {
			k = false;

			nav.removeAttr('class');
			$(nav[1]).addClass('active');

			$('html, body').animate({
				scrollTop : $(hash).offset().top
			}, 600, function() {
				setTimeout(function() {k = true}, 100);
			});
		}
		return false;
	})

	$(window).scroll(function() {
		if (k && $(window).width() >= 940) {
			for (var i = 0; i < nav.length; i++) {
				hash = nav.eq(i).attr('href');
				if (hash.split('#').length > 1) {
					if ($(this).scrollTop() >= $(hash).offset().top - nav.parents('.navigation-line-wr').height()) {
						nav.removeAttr('class');
						nav.eq(i).addClass('active');
					};
				};
			};
		}
	});

	//

	function myEqualHeight(){
		
		$('.block-product .block-product-info .block-product-name').each(function(){
			var blockHeight = $(this).height(),
				$this = $(this),
				usHeight = $('.block-product .block-product-info .block-product-name'),
				heightHeight = Math.max(blockHeight);
				
				usHeight.css('min-height', heightHeight);
	    });

		$('.block-product .block-product-info .block-product-anonce').each(function(){
			var blockHeight = $(this).innerHeight(),
				$this = $(this),
				usHeight = $('.block-product .block-product-info .block-product-anonce'),
				heightHeight = Math.max(blockHeight);
				
				usHeight.css('min-height', heightHeight);
	    });
	    if($(window).width() >= 978) {
			$('.block-product .block-product-info .block-product-name').each(function(){
				var usHeight = $('.block-product .block-product-info .block-product-name');
					
					usHeight.css('min-height', '');
		    });
	
			$('.block-product .block-product-info .block-product-anonce').each(function(){
				var usHeight = $('.block-product .block-product-info .block-product-anonce');
					
					usHeight.css('min-height', '');
		    });
	    }
	}

	$(window).on('resize', myEqualHeight).trigger('resize');
	
	//Form
	var $form_link = $('.block-product-btn, #close-reveal'),
		$form = $('#form_product');

	$form_link.click(function(event) {

		event.preventDefault();
		
		if ($form.hasClass('opened')){
			$form.removeClass('opened');
			
			if (/iPod|iPad|iPhone/i.test(navigator.userAgent)) {
				$('html, body').removeClass('overflowHidden');
			} else {
				$(document.documentElement).removeClass('overflowHidden');
			}
		} else {
			$form.addClass('opened');

			if (/iPod|iPad|iPhone/i.test(navigator.userAgent)) {
				$('html, body').addClass('overflowHidden');
			} else {
				$(document.documentElement).addClass('overflowHidden');
			}
		}
	});
	
	$(document).on('click touchstart', function(event) {
		if ($(event.target).closest('#form_body, .block-product-btn').length) return;	

		if ($form.hasClass('opened')){
			$form.removeClass('opened');
		}
		
		if (/iPod|iPad|iPhone/i.test(navigator.userAgent)) {
			$('html, body').removeClass('overflowHidden');
		} else {
			$(document.documentElement).removeClass('overflowHidden');
		}
	});
	
	
	//Header
	
	function headerHeight(){
		var windowHeight = $(window).height(),
			headerPadding = parseInt($('.header-in').css('paddingTop')),
			blockMargin = parseInt($('.top-text-block').css('marginBottom')),
			nameBlockHeights = $('.company-block').outerHeight(true),
			contactsBlockHeights = $('.top-contacts-wr').outerHeight(true),
			goBotHeights = $('.go-bottom').outerHeight(true),
			textBlockHeight = windowHeight - (nameBlockHeights + contactsBlockHeights + goBotHeights + blockMargin + headerPadding);

			$('.top-text-block').css('height', textBlockHeight);
			$('.site-header').css('minHeight', windowHeight);
			
	}
	
	headerHeight();

	//

	function scrollBlock() {
		$('.scroll-pane').jScrollPane();
	}
	scrollBlock();
	
	$(window).resize(scrollBlock).trigger('resize');
});