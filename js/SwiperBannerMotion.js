(function($) {

    'use strict';
    /*
    SwiperBannerMotion(v1.0 - 20200423)
    */
    window.SwiperBannerMotion = function($container, motionItems, options, swiper_options) {

        if(this instanceof SwiperBannerMotion === false) {
			return new SwiperBannerMotion($container, motionItems, options);
		}

        var _this = this;

		var $container = typeof $container === 'object' ? $container : $($container),
            timeline = false,
			swiper = false,
			opt = {autoplay: true, onChangeCallbackBefore : [], onChangeCallbackAfter : []},
            actIndex = -1,//active
            prevIndex = -1,
            prevRealIndex = -1,
            actRealIndex = -1,//active
            motionIndex = -1,
            queued = false,
			swiper_opt = {};

        for(var prop in options) {
			opt[prop] = options[prop];
		}
        for(var prop in swiper_options) {
			swiper_opt[prop] = swiper_options[prop];
		}


        var $wrapper = $container.children('ul:first-child'),
			$items = $wrapper.children('li'),
			$paging,
            length = $items.length,
            itemsDim,
            diff = [],
            cloneClass = 'slider-clone',
            timerId,
			timerCleared = true,
			clearLists = [],
			resizeTimer = null,
            tween = false,
        	assetsLoaded = false,
			interval = [],
            sortTl = [],
            tempTl = [],
        	sliderAutoplay = false,
			params = {};
        this.devLog = function(point, cont){
            //console.log('['+point+'] ', cont);
        };
        this.initialize = function() {
            if($container.length!==1){
                devLog('init Error','Check container selector (container count : ' + $container.length + ')');
                return;
            }
            swiper = new Swiper($container[0],swiper_opt);
            actIndex = swiper.activeIndex;
            actRealIndex = swiper.realIndex;
            motionIndex = parseInt($(swiper.slides[actIndex]).attr('motion-index'), 10);
            if(isNaN(motionIndex))motionIndex = -1;
            _this.resetAnim();
            _this.playAnim();
            _this.setSwiperEventHandler();

		};
        this.setSwiperEventHandler = function(){
            //https://swiperjs.com/api/#events
            swiper.on('init', function() {
                _this.devLog('swiperEvent','init');
            });
            swiper.on('slideChangeTransitionStart', function() {
                prevIndex = actIndex;
                prevRealIndex = actRealIndex;
                if(timeline!==false)timeline.stop();
                _this._onChangeCallbackBefore();
                // _this.devLog('swiperEvent','slideChangeTransitionStart');
                _this.devLog('swiperEvent - slideChangeTransitionStart', prevRealIndex+' -> '+swiper.realIndex);
            });
            swiper.on('slideChangeTransitionEnd', function() {
                actIndex = swiper.activeIndex;
                actRealIndex = swiper.realIndex;
                motionIndex = parseInt($(swiper.slides[actIndex]).attr('motion-index'), 10);
                if(isNaN(motionIndex))motionIndex = -1;
                queued = true;
                // _this.devLog('swiperEvent','slideChangeTransitionEnd');
                _this.devLog('swiperEvent - slideChangeTransitionEnd', prevRealIndex+' -> '+swiper.realIndex);
                _this.resetAnim();
                _this.playAnim();
            });
            //
            // swiper.on('transitionStart', function() {
            //     _this.devLog('swiperEvent','transitionStart');
            // });
            // swiper.on('transitionEnd', function() {
            //     _this.devLog('swiperEvent','transitionEnd');
            // });
            swiper.on('resize', function() {
                _this.devLog('swiperEvent','resize');
            });
        };
        this.setChangeCallbackBefore = function(fn){
            opt.onChangeCallbackBefore.push(fn);
        }
        this.setChangeCallbackAfter = function(fn){
            opt.onChangeCallbackAfter.push(fn);
        }
        this._onChangeCallbackBefore = function(fn){
            var temp_motionIndex = parseInt($(swiper.slides[actIndex]).attr('motion-index'), 10);
            if(isNaN(temp_motionIndex))temp_motionIndex = -1;
            for(var i in opt.onChangeCallbackBefore){
                opt.onChangeCallbackBefore[i](temp_motionIndex, $(swiper.slides[actIndex]));
            }
        }
        this._onChangeCallbackAfter = function(fn){
            for(var i in opt.onChangeCallbackAfter){
                opt.onChangeCallbackAfter[i](motionIndex, $(swiper.slides[actIndex]));
            }
        }
        this.stop = function(){
            queued = false;
            swiper.autoplay.stop();
        }
        this.play = function(){
            queued = true;
            _this.act();
            swiper.autoplay.start();
        }
        this.resetAnim = function(){
            //모두 중지 및 초기화
            _this.setElements();
        }
        this.playAnim = function(){
            //actRealIndex
            if(queued)_this.act();
        }
        this.act = function(){
            //timeline 시작
            _this._onChangeCallbackAfter();
            swiper.autoplay.stop();
            timeline = false;
            _this.setTimeline(actIndex, motionIndex);
            if(timeline!==false){
                _this.devLog('act', 'play');
                timeline.play();
                timeline.eventCallback("onComplete",function(){
                    swiper.autoplay.start();
                });
            }

        }

        this.getTimeline = function(slideIndex, mIdx){
            if(typeof motionItems[mIdx] === 'undefined' || mIdx<0){
                _this.devLog('getTimeline Warn', 'no motionItem (idx : '+mIdx+')');
                return false;
            }
            timeline = false;

            return timeline;
        }

        this.getContainer = function(){
            return $container;
        }
        this.getSwiper = function(){
            return swiper;
        }
        this.setElements = function(mIdx){
            var sameSlides = [];
            for(var i = 0;i<swiper.slides.length;i++){
                var _mIdx = parseInt($(swiper.slides[i]).attr('motion-index'), 10);
                if(isNaN(_mIdx))continue;
                if(typeof mIdx === 'undefined' || mIdx === _mIdx){
                    sameSlides.push(swiper.slides[i]);
                }
            }
            for(var i in sameSlides){
                var _mIdx = parseInt($(sameSlides[i]).attr('motion-index'), 10);
                if(typeof motionItems[_mIdx] === 'undefined' || _mIdx<0){
                    _this.devLog('setElements Warn', 'Undefined (idx : '+_mIdx+')');
                    continue;
                }
    			for(var j=0, o; j<motionItems[_mIdx].length; j++) {
    				o = motionItems[_mIdx][j];
                    if(typeof o.method === 'undefined') {
    					if(typeof o.set === 'undefined' || $(o.el, sameSlides).length === 0){
                            _this.devLog('setElements Warn', 'Undefined (idx : '+_mIdx+', item : '+j+')');
                            continue;
                        }
    					TweenMax.set($(o.el, sameSlides).get(), o.set);
                    } else {
                        switch(o.method) {
                            case 'add':
    							if(typeof o.items === 'object') {
                                    for(var k=0; k<o.items.length; k++) {
    									if(typeof o.items[k].set === 'undefined' || o.items[k] instanceof TimelineMax === true || $(o.items[k].el, sameSlides).length === 0){
                                            _this.devLog('setElements Warn', 'Undefined (idx : '+_mIdx+', item : '+j+', itemChild : '+k+')');
                                            continue;
                                        }
    									TweenMax.set($(o.items[k].el, sameSlides).get(), o.items[k].set);
    								}
    							}
                                break;
                            default:
                                break;
                        }
                    }
    			}
            }
        }
        this.setTimeline = function(sIdx, mIdx){
            _this.devLog('setTimeline', {sIdx : sIdx, mIdx : mIdx});
            if(typeof motionItems[mIdx] === 'undefined' || mIdx<0){
                _this.devLog('setTimeline Error', 'no motionItem (idx : '+mIdx+')');
                return false;
            }
            var slide = $(swiper.slides[sIdx]);
			timeline = new TimelineMax({paused: true});
			for(var j=0, o; j<motionItems[mIdx].length; j++) {
                o = motionItems[mIdx][j];
				if(typeof o.method === 'undefined' && typeof o.to === 'undefined'){
                    _this.devLog('setTimeline Error', 'Undefined (idx : '+mIdx+', item : '+j+')');
                    continue;
                }
                if(typeof o.method === 'undefined') {
					if($(o.el, slide).length === 0) continue;
					typeof o.t === 'undefined' ? timeline.to($(o.el, slide).get(), o.d, o.to) : timeline.to($(o.el, slide).get(), o.d, o.to, o.t);
                } else {
                    switch(o.method) {
						case 'addLabel':
							timeline[o.method](o.label);
							break;
                        case 'add':
							var a = [];
							if(typeof o.items === 'object') {
								for(var k=0; k<o.items.length; k++) {
									if(o.items[k] instanceof TimelineMax === true || $(o.items[k].el, slide).length === 0){
                                        _this.devLog('setTimeline Error', 'Undefined (idx : '+mIdx+', item : '+j+', itemChild : '+k+')');
                                        continue;
                                    }
									a[k] = TweenMax.to($(o.items[k].el, slide).get(), o.items[k].d, o.items[k].to);
								}
							}
							if(typeof o.tl === 'object') a.push(o.tl);
							typeof o.t === 'undefined' ? timeline[o.method](a) : timeline[o.method](a, o.t);
                            break;
						case 'call':
							typeof o.t === 'undefined' ? timeline[o.method](o.fx) : timeline[o.method](o.fx, null, null, o.t);
							break;
                        default:
                            break;
                    }
                }
			}
        }

        this.initialize();
    };

}(jQuery));