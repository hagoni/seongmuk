(function($) {
    doc.ready(function() {
        $('.qa_list a').click(function(){
            $(this).find('dd').slideToggle();
            $(this).parent('.qa_list li').toggleClass('on');
        });
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
		new YMotion([
			[
				{el: '.br4 .icon2_1', set: {opacity:0, y: -60}, to: {opacity: 1, y: 0, ease: Expo.easeOut}, d: 0.2, t: '+=0.5'},
				{el: '.br4 .icon3', set: {opacity:0, y: -60}, to: {opacity: 1, y: 0, ease: Expo.easeOut}, d: 0.2, t: '-=0.1'},
				{el: '.br4 .icon4', set: {opacity:0, y: -60}, to: {opacity: 1, y: 0, ease: Expo.easeOut}, d: 0.2, t: '-=0.1'},
				{el: '.br4 .icon5', set: {opacity:0, y: -60}, to: {opacity: 1, y: 0, ease: Expo.easeOut}, d: 0.2, t: '-=0.1'},
				{el: '.br4 .icon6', set: {opacity:0, y: -60}, to: {opacity: 1, y: 0, ease: Expo.easeOut}, d: 0.2, t: '-=0.1'},
				{el: '.br4 .icon2_2', set: {opacity:0}, to: {opacity: 1}, d: 0.3, t: '+=0.3'},
			]
		]).activate();

    });
}(jQuery));