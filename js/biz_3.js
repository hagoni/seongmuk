(function($) {
    doc.ready(function() {
        new Swiper('.br2 .icons .swiper-container', {
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
		new YMotion([
            [
				{el: '.br2 .icon1', set: {opacity:0, y: -120,x: 120}, to: {opacity: 1, y: 0, x: 0, ease: Expo.easeOut}, d: 0.6, t: '+=0.5'},
			],
		]).activate();
    });
}(jQuery));