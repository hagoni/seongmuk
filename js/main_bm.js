/**************************************************************************************************
 * PreLoader | 프리로더입니다.
 *
 * @class PreLoader
 * @constructor
 * @version 1.0
 *
 * @param {Array} assets 불러올 자원 배열
 * @param {Function} callback 콜백 함수
 *
 **************************************************************************************************/
window.PreLoader = function(assets, callback) {

	'use strict';

	if(this instanceof PreLoader === false) {
		return new PreLoader(assets, callback);
	}

	if(typeof assets !== 'object') return false;

	var _this = this;

	var LENGTH = assets.length;

	var	unit = 100 / LENGTH,
		progress = 0,
		loaded = false,
		imgs = [];

	this.initialize = function() {
		for(var i=0; i<assets.length; i++) {
			imgs[i] = new Image();
			this.setHandler(imgs[i]);
			imgs[i].src = assets[i];
		}
	};

	this.setHandler = function(img) {
		img.onload = this.calculate;
		img.onerror = this.report;
	};

	this.calculate = function() {
		progress += unit;
		if(Math.ceil(progress) >= 100) {
			if(loaded === false) _this.load();
			loaded = true;
		}
	};

	this.report = function() {
		if(typeof console === 'object') console.log(this.src + ' 이미지를 불러올 수 없습니다.');
		_this.calculate();
	}

	this.load = function() {
		if(typeof callback === 'function') callback();
	};

	this.initialize();
};

(function($) {

    'use strict';

    window.FPMotion = function($container, motionItems, options) {

        if(this instanceof FPMotion === false) {
			return new FPMotion($container, motionItems, options);
		}

        var _this = this;

		var $container = typeof $container === 'object' ? $container : $('#' + $container),
			opt = {act: true, duration: 1000, selector: '.section'};

        for(var prop in options) {
			opt[prop] = options[prop];
		}

		var	$items = $container.children(opt.selector),
            length = $items.length,
            prevIndex = 0,
			index = 0,
        	assetsLoaded = false,
            sortTl = [],
            tempTl = [],
			queued = false,
			params = {};

        this.initialize = function() {
            if(typeof opt.onInit === 'function') opt.onInit();
			$container.css('overflow','hidden');
            this.assetsPreload();
            if(opt.act === true) {
				this.setElements();
				this.setTimeline();
			}
			params = {
				duration: opt.duration,
				length: length
			};
			//this.motion();
		};

        this.assetsPreload = function() {
			var $firstItem = $items.eq(index), bgRegExp = /(url)|[\(\)\'\"]/g, assets = [];
			if($firstItem.css('background-image') !== 'none') assets.push($firstItem.css('background-image').replace(bgRegExp, ''));
			$firstItem.find('*').each(function(i) {
				if($(this).css('background-image') !== 'none') assets.push($(this).css('background-image').replace(bgRegExp, ''));
				if($(this).prop('tagName') === 'IMG') assets.push($(this).attr('src'));
			});
			if(assets.length > 0) {
				new PreLoader(assets, function() {
					assetsLoaded = true;
				});
			} else {
				assetsLoaded = true;
			}
		};

        this.setElements = function() {
			for(var i=0; i<motionItems.length; i++) {
				for(var j=0, o; j<motionItems[i].length; j++) {
					o = motionItems[i][j];
                    if(typeof o.method === 'undefined') {
						if(typeof o.set === 'undefined' || o.el.length === 0) continue;
						TweenMax.set(o.el, o.set);
                    } else {
                        switch(o.method) {
                            case 'add':
								if(typeof o.items === 'object') {
	                                for(var k=0; k<o.items.length; k++) {
										if(typeof o.items[k].set === 'undefined' || o.items[k].el.length === 0) continue;
										TweenMax.set(o.items[k].el, o.items[k].set);
									}
								}
                                break;
                            default:
                                break;
                        }
                    }
				}
			}
			if(assetsLoaded === true) $('#initcloser').remove();
		};

		this.setTimeline = function() {
			for(var i=0; i<motionItems.length; i++) {
				tempTl[i] = new TimelineMax({paused: true});
				for(var j=0, o; j<motionItems[i].length; j++) {
                    o = motionItems[i][j];
					if(typeof o.method === 'undefined' && typeof o.to === 'undefined') continue;
                    if(typeof o.method === 'undefined') {
						if(o.el.length === 0) continue;
						typeof o.t === 'undefined' ? tempTl[i].to(o.el, o.d, o.to) : tempTl[i].to(o.el, o.d, o.to, o.t);
                    } else {
                        switch(o.method) {
							case 'addLabel':
								tempTl[i][o.method](o.label);
								break;
                            case 'add':
								var a = [];
								if(typeof o.items === 'object') {
									for(var k=0; k<o.items.length; k++) {
										if(o.items[k].el.length === 0) continue;
										a[k] = TweenMax.to(o.items[k].el, o.items[k].d, o.items[k].to);
									}
								}
								if(typeof o.tl === 'object') a.push(o.tl);
								typeof o.t === 'undefined' ? tempTl[i][o.method](a) : tempTl[i][o.method](a, o.t);
                                break;
							case 'call':
								typeof o.t === 'undefined' ? tempTl[i][o.method](o.fx) : tempTl[i][o.method](o.fx, null, null, o.t);
								break;
							case 'onPause':
                                tempTl[i][o.method] = o.fx;
								break;
                            default:
                                break;
                        }
                    }
				}
			}

            $items.each(function(i) {
				sortTl[i] = typeof $(this).data('index') === 'number' ? tempTl[$(this).data('index') - 1] : '움직이지 않을래';
			});
			if(typeof sortTl[0] === 'object') sortTl[0].delay(0.4);
		};

        this.motion = function() {
			$container.css('overflow','');
			$container.fullpage({
				css3: false,
				navigation: true,
				sectionSelector: opt.selector,
				scrollingSpeed: opt.duration,
				verticalCentered: false,
                scrollOverflow: true,
				afterRender: function() {
					if(typeof opt.onReady === 'function') opt.onReady(index, prevIndex, params);
				},
				onLeave: function(i, nextI, dir) {
					prevIndex = i.index;
					index = nextI.index;
					if(typeof opt.onBefore === 'function') opt.onBefore(index, prevIndex, params);
				},
				afterLoad: function(a, i) {
					if(opt.act === true) {
	                    if(typeof sortTl[prevIndex] === 'object') sortTl[prevIndex].pause(0);
	                    if(typeof sortTl[prevIndex] === 'object' && typeof sortTl[prevIndex]['onPause'] === 'function') sortTl[prevIndex]['onPause']();
	                    if(typeof sortTl[index] === 'object') sortTl[index].play();
	                }
					if(typeof opt.onAfter === 'function') opt.onAfter(index, prevIndex, params);
				}
			});
		};

        this.activate = function() {
			$('#initcloser').remove();
			if(queued === false) {
                if(typeof opt.onStart === 'function') opt.onStart(index, prevIndex, params);
                if(opt.act === true && typeof sortTl[0] === 'object') sortTl[0].play();
                queued = true;
            }
			if(opt.act === true && typeof sortTl[0] === 'object')this.motion();
		};

        this.initialize();
    };

}(jQuery));
(function($) {
	$(document).ready(function() {
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
		new Swiper('.brand .icons .swiper-container', {
			autoplay: {
				delay: 1000,
			},
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			serWrapperSize: true,
			speed: 500,
			observer: true,
			observeParents: true
		});
	});
}(jQuery));
(function($) {
	$(document).ready(function() {
		// var section0_slider = new Swiper('.main_visual .swiper-container', {
		// });
		window.section0_SwiperBanner = new SwiperBannerMotion(
			'.main_visual .swiper-container'
			,[
				[
					{el: '.mv01_bg1', set: {y: "-100%"}, to: {y: "0%", ease: Expo.easeOut}, d: 0.5},
					{el: '.mv01_bg2', set: {y: "100%"}, to: {y: "0%", ease: Expo.easeOut}, d: 0.6, t: '-=0.1'},
					{el: '.text_area', set: {opacity: 0}, to: {opacity: 1}, d: 0.6, t: '+=0.3'},
				],
				[
					{el: '.mv02_bg1', set: {y: "-100%"}, to: {y: "0%", ease: Expo.easeOut}, d: 0.5},
					{el: '.mv02_bg2', set: {y: "100%"}, to: {y: "0%", ease: Expo.easeOut}, d: 0.6, t: '-=0.1'},
					{el: '.text_area', set: {opacity: 0}, to: {opacity: 1}, d: 0.6, t: '+=0.3'},
					{el: '.mv02_box_wrap', set: {opacity: 0}, to: {opacity: 1}, d: 0.6},
				],
				[
					{el: '.mv03_bg2', set: {y: "-100%"}, to: {y: "0%", ease: Expo.easeOut}, d: 0.5},
					{el: '.mv03_bg3', set: {x: "100%"}, to: {x: "0%", ease: Expo.easeOut}, d: 0.6, t: '-=0.1'},
					{el: '.text_area', set: {opacity: 0}, to: {opacity: 1}, d: 0.6, t: '+=0.3'},
					{el: '.mv03_box_wrap', set: {opacity: 0}, to: {opacity: 1}, d: 0.6},
				],
				[
					{el: '.mv04_bg1', set: {y: "-100%"}, to: {y: "0%", ease: Expo.easeOut}, d: 0.5},
					{el: '.mv04_bg3', set: {y: "100%"}, to: {y: "0%", ease: Expo.easeOut}, d: 0.6, t: '-=0.1'},
					{el: '.text_area', set: {opacity: 0}, to: {opacity: 1}, d: 0.6, t: '+=0.3'},
					{el: '.mv04_box_wrap', set: {opacity: 0}, to: {opacity: 1}, d: 0.6},
				],
			]
			,{
				autoplay: false
			}
			,{
				autoplay: false,
				setWrapperSize: true,
				loop:true,
				loopedSlides:20,
				speed: 500,
				pagination: {
					el: '.mv_paging',
					type: 'bullets',
					clickable: true,
					renderBullet: function(index, className){
						return '<li class="' + className + '"><a href="#none"></a></li>';
					}
				}
			}
		);
        window.fullPageMotion = new FPMotion('fullpage', [
            [
                {method: 'call', fx: function() {
                    // if(typeof $('.main_visual .swiper-container')[0].swiper !== 'object'){
                    // }
                    // if(typeof $('.main_visual .swiper-container')[0].swiper === 'object'){
                    //     $('.main_visual .swiper-container')[0].swiper.autoplay.start();
                    // }
                }},
                {method: 'onPause', fx: function() {
                    // if(typeof $('.main_visual .swiper-container')[0].swiper === 'object'){
                    //     $('.main_visual .swiper-container')[0].swiper.autoplay.stop();
                    // }
                }}
            ],
			[
				{method: 'call', fx: function() {
                    if(typeof $('.brand > .swiper-container')[0].swiper !== 'object'){
						var brPaging = $('.br_paging li');
                        new Swiper('.brand > .swiper-container', {
                            autoplay: false,
                		    setWrapperSize: true,
                		    speed: 500,
							allowTouchMove: false,
							pagination: {
						    	el: '.br_paging',
						    	type: 'bullets',
						    	clickable: true,
						    	renderBullet: function(index, className){
						    		return '<li class="' + className + '"><a href="#none">'+ brPaging.eq(index).text() +'</a></li>';
						    	}
						    },
                		});
                    }
                    if(typeof $('.brand > .swiper-container')[0].swiper === 'object'){
                        $('.brand > .swiper-container')[0].swiper.autoplay.start();
                    }
                }},
				{method: 'onPause', fx: function() {
                    if(typeof $('.brand > .swiper-container')[0].swiper === 'object'){
                        $('.brand > .swiper-container')[0].swiper.autoplay.stop();
                    }
                }},
			],
			[
				{method: 'call', fx: function() {
                    if(typeof $('.hist_slide .swiper-container')[0].swiper !== 'object'){
                        new Swiper('.hist_slide .swiper-container', {
                            autoplay: false,
                		    setWrapperSize: true,
							slidesPerView: 'auto',
                		    speed: 500,
                		});
                    }
                    if(typeof $('.hist_slide .swiper-container')[0].swiper === 'object'){
                        $('.hist_slide .swiper-container')[0].swiper.autoplay.start();
                    }
                }},
                {method: 'onPause', fx: function() {
                    if(typeof $('.hist_slide .swiper-container')[0].swiper === 'object'){
                        $('.hist_slide .swiper-container')[0].swiper.autoplay.stop();
                    }
                }},
			],
			[],
        ], {
        });

    });
}(jQuery));