var breakpoints = {
	large: 1260,
	medium: 900,
	small: 640
};

(function($) {
    doc.ready(function() {
        (function() {
            var	prevScrollTop = win.scrollTop(),
                scrollTop = prevScrollTop,
    			winH,
                diff,
                fixedH = 0,
    			tween = false;

            function scrollHandler() {
                if(window.innerWidth <= breakpoints.large) return false;
                scroll(win.scrollTop());
            }

            function scroll(s) {
                if(tween === false) {
    				tween = true;
    				prevScrollTop = scrollTop;
    				scrollTop = s;
    				diff = scrollTop - prevScrollTop;
    				winH = win.innerHeight();
    				if(diff > 0 && scrollTop > 0 && scrollTop < winH - fixedH) {
    					TweenLite.to('html, body', 0.7, {scrollTop: winH - fixedH, ease: Power2.easeOut, onComplete: function() {
    						win.scrollTop(winH - fixedH);
    						scrollTop = winH - fixedH;
    						tween = false;
    					}});
    				} else if(diff < 0 && scrollTop < winH - fixedH) {
    					TweenLite.to('html, body', 0.7, {scrollTop: 0, ease: Power2.easeOut, onComplete: function() {
    						win.scrollTop(0);
    						scrollTop = 0;
    						tween = false;
    					}});
    				} else {
    					tween = false;
    				}
    			}
            }

            win.scroll(scrollHandler).load(scrollHandler);
            scrollHandler();
        }());
		$('.pc_mouse_wrap').mousemove(function(e){
			var xPos = (e.offsetX - 175)+'px',
				yPos = (e.offsetY - 175)+'px',
				circle = $(this).find('#circle');
			TweenLite.to(circle, 0.3, {
			    x: xPos,
			    y: yPos,
			    ease: Power0.easeNone,
			});
		});
		(function() {
            function scrollHandler() {
                var scrollTop = win.scrollTop(),
                    fixOffset = doc.innerHeight() - win.innerHeight() - $diffElems.height();

                if(scrollTop > fixOffset) {
                    $headElems.addClass('scroll');
                } else {
                    $headElems.removeClass('scroll');
                }
            }

            var $headElems = $('.lnb_wrap'),
                $diffElems = $('.footer_wrap');

            $headElems.height = parseInt($headElems.css('height'), 10);
            $headElems.bottom = parseInt($headElems.css('bottom'), 10);

            win.scroll(scrollHandler).load(scrollHandler);
            scrollHandler();
        }());
		$('body').removeClass('blk');
		$('body').addClass('wht');
		(function() {
			function scrollHandler2() {
	            var scrollTop = win.scrollTop();
	            if(fixed === false && scrollTop >= offset) {
					$('body').removeClass('wht');
					$('body').addClass('blk');
	                fixed = true;
	            } else if(fixed === true && scrollTop < offset) {
					$('body').removeClass('blk');
					$('body').addClass('wht');
	                fixed = false;
	            }
	        }

	        var $topElement = $('.layer'),
	            offset = $('.layer').offset().top,
	            fixed = false;

	        win.scroll(scrollHandler2);
	        scrollHandler2();
		}());
        new Swiper('.brin_slide_m .swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 60,
            centeredSlides: 'centered',
            autoplay: {
                delay: 3000,
             },
            serWrapperSize: true,
            speed: 500,
            observer: true,
            observeParents: true
        });
    });
}(jQuery));