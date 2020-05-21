(function($) {
	$(document).ready(function() {
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

            var $headElems = $('.inq_btn'),
                $diffElems = $('.footer_wrap');

            $headElems.height = parseInt($headElems.css('height'), 10);
            $headElems.bottom = parseInt($headElems.css('bottom'), 10);

            win.scroll(scrollHandler).load(scrollHandler);
            scrollHandler();
        }());
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
    });
}(jQuery));