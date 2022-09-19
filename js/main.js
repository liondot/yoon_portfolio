
$(function () {
    let navToggle = $('.nav_toggle');

    // how to section scroll animation 
    let scrollBody = $('.how_to_section');
    let scrollHeight;
    let sectionOffsetTop;
    let scrollRealHeight;
    let winScrollTop;
    let sectionScrollTop;
    let scrollPercent;
    let percent;

    function scrollFunc() {
        setProperty()
        contentIn() 
    }

    function setProperty() {
        scrollHeight = scrollBody.height();
        sectionOffsetTop = scrollBody.offset().top;
        scrollRealHeight = (scrollHeight - $(window).height());
        winScrollTop = $(window).scrollTop();
        sectionScrollTop = winScrollTop - sectionOffsetTop;
        scrollPercent = sectionScrollTop / scrollRealHeight;
        percent = scrollPercent * 100;

        console.log(`sectionOffsetTop: ${sectionOffsetTop}`)
        console.log(`scrollHeight: ${scrollHeight}`)
        console.log(`scrollRealHeight: ${scrollRealHeight}`)
        console.log(`winScrollTop: ${winScrollTop}`)
        console.log(`sectionScrollTop: ${sectionScrollTop}`)
        console.log(`scrollPercent: ${scrollPercent}`)
        console.log(`percent: ${percent}`)
      
    }


	function contentIn() {

		if(percent >= -10 && percent > -3) {
			$('.how_to_section .howTo_txts em.txt4').removeClass('active');
			$('.how_to_section .howTo_txts em.txt1').addClass('active');
		}

		if(percent >= -5 && percent > 5) {
           
			$('.how_to_section .howTo_txts em.txt2').addClass('active');
		}

	

		if(percent < 12 ) {

			// $('.how_to_section .howTo_txts em.txt1').removeClass('active');
            // $('.how_to_section .howTo_txts em.txt2').removeClass('active');
            // $('.how_to_section .howTo_txts em.txt3').removeClass('active');
            // $('.how_to_section .howTo_txts em.txt4').removeClass('active');
			
		}

	};



    function init() {
        scrollFunc()
    }

    $(window).scroll(function () {
        scrollFunc()
    })

    init();

})