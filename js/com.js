(function($) {
    $(document).ready(function() {

        (function() {
            function scrollHandler() {
                var scrollTop = win.scrollTop();
                if(fixed === false && scrollTop >= offset) {
                    $topElement.addClass('scroll');
                    fixed = true;
                } else if(fixed === true && scrollTop < offset) {
                    $topElement.removeClass('scroll');
                    fixed = false;
                }
            }

            var $topElement = $('.lnb_bar'),
                offset = $('.layer_wrap').offset().top - 400,
                fixed = false;

            win.scroll(scrollHandler);
            scrollHandler();
        }());
        (function() {
            function scrollHandler() {
                var scrollTop = win.scrollTop(),
                    fixOffset = doc.innerHeight() - win.innerHeight() - $diffElems;

                if(scrollTop > fixOffset) {
                    $headElems.css({bottom: scrollTop - fixOffset + $headElems.bottom});
                    $headElems.addClass('fixed');
                } else {
                    $headElems.css({bottom: $headElems.bottom});
                    $headElems.removeClass('fixed');
                }
            }

            var $headElems = $('.lnb_bar'),
                $diffElems = 1400;

            $headElems.heigth = parseInt($headElems.css('height'), 10);
            $headElems.bottom = parseInt($headElems.css('bottom'), 10);

            var showOffset = doc.innerHeight() - win.innerHeight() >= 200 ? 200 : 0,
                show = false;

            win.scroll(scrollHandler).load(scrollHandler);
            scrollHandler();
        }());

		(function() {
			if($('.chapters').length === 0) return false;

            function setAnchorsOffset() {
                var limit = doc.innerHeight() - win.innerHeight();
                for(var i=0, j=0; i<length; i++) {
                    if($chapters.eq(i).length > 0) offsets[i] = $chapters.eq(i).offset().top - diff;
                    else offsets[i] = i > 0 ? offsets[i - 1] : 0;
                    if(offsets[i] > limit) {
                        offsets[i] = limit - length + j;
                        j++;
                    }
                    offsets[i] = Math.floor(offsets[i]);
                }
                offsets[length] = limit + 1;
            }

            function scrollHandler() {
                var scrollTop = win.scrollTop();
                if(scrollTop < offsets[0]) {
                    $anchors.parent('li').filter('.on').removeClass('on');
                    index = -1;
                    return false;
                }
                for(var i=0; i<length; i++) {
                    if((i !== index) && (scrollTop >= offsets[i] && scrollTop < offsets[i + 1])) {
                        $anchors.parent('li').filter('.on').removeClass('on');
						$anchors.parent('li').eq(i).addClass('on');
                        index = i;
                        break;
                    }
                }
            }

			function hashHandler() {
				if(location.hash) {
					var hash = parseInt(location.hash.split('#')[1], 10);
					if(isNaN(hash) === true) return false;
					if($anchors.eq(hash - 1).length > 0) {
                        if($('#sitemapWrap').is(':visible') === true) $('.bindSitemapSpread').trigger('click');
                        $anchors.eq(hash - 1).trigger('click');
                    }
				}
			}

            function scrollAnim(e) {
                TweenLite.to('html, body', 0.5, {scrollTop: offsets[$(this).parent('li').index()], ease: Expo.easeOut});
                e.preventDefault();
            }

			var $chapters = $('.chapters'),
                $anchors = $('.lnb a');

            var length = $anchors.length,
                offsets = [],
                index = 0,
                diff = $('.lnb_bar').height(),
                resizeTimer = null;

            $anchors.click(scrollAnim);
            win.scroll(scrollHandler);
            win.resize(function() {
                clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function() {
					setAnchorsOffset();
                    scrollHandler();
				}, 100);
            });
			win.on('hashchange load', function() {
				hashHandler();
			});
            win.on('load', function() {
                setAnchorsOffset();
                scrollHandler();
            });

            setAnchorsOffset();
            scrollHandler();
		}());

        function scrollHandler() {
            var scrollTop = win.scrollTop();
            if(fixed === false && scrollTop >= offset) {
                $('body').removeClass('wht').addClass('blk');
                fixed = true;
            } else if(fixed === true && scrollTop < offset) {
                $('body').removeClass('blk').addClass('wht');
                fixed = false;
            }
        }

        var $topElement = $('.com_top'),
            offset = $('.com_top').offset().top,
            fixed = false;

        win.scroll(scrollHandler);
        scrollHandler();

        $('body').removeClass('blk').addClass('wht');

        TweenMax.to($('.main_visual'), 1.0, {height: "70%", ease: Expo.easeIn});

        TweenMax.to($('.ct_img1'), 30.0, {delay: 1.0, rotation: "360deg", x: "600%", y: "150%", repeat:-1, yoyo:true, ease: "none"});
        TweenMax.to($('.ct_img2'), 16.0, {rotation: "360deg", x: "600%", y: "-150%", repeat:-1, yoyo:true, ease: "none"});
        TweenMax.to($('.ct_img3'), 40.0, {delay: 0.5, rotation: "360deg", x: "-500%", y: "150%", repeat:-1, yoyo:true, ease: "none"});
        TweenMax.to($('.ct_img4'), 25.0, {delay: 2.0, rotation: "360deg", x: "-500%", y: "-150%", repeat:-1, yoyo:true, ease: "none"});

        var mql = window.matchMedia("screen and (max-width: 1080px)");

        mql.addListener(function(e) {
            if(e.matches) {
                TweenMax.to($('.mv_box_wrap'), 0, {scale: 1, ease: Expo.easeIn});
                TweenMax.to($('.main_visual .text_area'), 0, {y: 0, scale: 1, ease: Expo.easeIn});
            } else {
                TweenMax.to($('.mv_box_wrap'), 0, {scale: 0.8, ease: Expo.easeIn});
                TweenMax.to($('.main_visual .text_area'), 0, {y: -30, scale: 0.8, ease: Expo.easeIn});
            }
        });

        var windowWidth = $( window ).width();
        if(windowWidth >= 1080) {
            TweenMax.to($('.mv_box_wrap'), 1.0, {scale: 0.8, ease: Expo.easeIn});
            TweenMax.to($('.main_visual .text_area'), 1.0, {y: -30, scale: 0.8, ease: Expo.easeIn});
        }


        // var screenHeightFixed = $(window).innerHeight() / 2 - 200,
        //     lnbOffsetFixed = $('.lnb_bar').offset().top - screenHeightFixed;
        //
        // $(window).scroll(function(){
        //     var lyrHeight = $('.layer_wrap').innerHeight(),
        //
        //         // scrollTop = $(window).scrollTop(),
        //         lnbOffset = $('.lnb_bar').offset().top - screenHeight,
        //         lyrOffset = $('.layer_wrap').offset().top,
        //         scrollHeight = $(document).scrollTop();
        //     if(lnbOffset <= scrollHeight){
        //         $('.lnb_bar').css('position', 'fixed');
        //     } else if(lnbOffsetFixed > scrollHeight){
        //         $('.lnb_bar').css('position', 'absolute');
        //     };
        //
        //     console.log(lnbOffset, scrollHeight);
        // });

        $(window).scroll(function(){
            var lyrHeight = $('.layer_wrap').innerHeight(),
                scrollOffset = $('.layer_wrap').prop("scrollHeight"),
                scrollHeight = $(document).scrollTop(),
                scrollBar = 400 * (scrollHeight - scrollOffset) / lyrHeight + 130;
            $('.lnb_bar .bar').css('height',scrollBar);
        });

        new Swiper('.main_visual .swiper-container', {
            autoplay: false,
            setWrapperSize: true,
            speed: 500,
            pagination: {
                el: '.mv_paging',
                type: 'bullets',
                clickable: true,
                renderBullet: function(index, className){
                    return '<li class="' + className + '"><a href="#none"></a></li>';
                }
            },
        });
        new Swiper('.layer2 .swiper-container', {
            slidesPerView: 'auto',
            autoplay: {
                delay: 2000,
            },
            setWrapperSize: true,
            speed: 500,
            spaceBetween: 30,
            breakpoints: {
                768: {
                  spaceBetween: 35
                },
            }
        });
        var histSwiper = new Swiper('.hist_slide .swiper-container', {
            autoplay: {
                delay: 2000
            },
            setWrapperSize: true,
            slidesPerView: 'auto',
            speed: 500,
        });
        histSwiper.autoplay.stop();

        new YMotion([
            [
                {method: 'call', fx: function() {
                    histSwiper.autoplay.start();
                }},
            ]
        ]).activate();

    });
}(jQuery));