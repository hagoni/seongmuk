(function($) {
    doc.ready(function() {
		new YMotion([
            [
				{el: '.br3 .icon1', set: {opacity:0, y: -120,x: 120}, to: {opacity: 1, y: 0, x: 0, ease: Expo.easeOut}, d: 0.6, t: '+=0.5'},
				{el: '.br3 .icon2', set: {opacity:0, y: -200}, to: {opacity: 1, y: 0, ease: Expo.easeIn}, d: 0.6, t: '+=0.1'},
			],
		]).activate();
    });
}(jQuery));