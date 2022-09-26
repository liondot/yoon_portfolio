'use-strict';

// section 2 font 
$(function(){
    let scrollTxt = $('.scroll_txt');
    let scrollBox = $('.scroll_box');
    let allText = $('.fix_box .txt');
    
    let winScrollTop;
    let scrollTxtTop;
    let scrollTxtBottom;
    

    function setProperty(){
            winScrollTop = $(window).scrollTop();
            scrollTxtTop = scrollTxt.offset().top;
            scrollTxtBottom = scrollTxtTop + scrollTxt.height();
            textInOut() 
        
    }
    
    function moveFunc(){
        setProperty()
            
        if(winScrollTop > scrollTxtTop && winScrollTop <= scrollTxtBottom) {
            textInOut()
        } 
    }

    function textInOut() {
        var dis = winScrollTop / ((scrollBox.height() - scrollTxtTop) / 4);
        var gap = 1;
    
        console.log(dis)
        allText.each(function(index, arr) {
            $(arr).attr( //제이쿼리 attr 메소드로 엘리먼트의 속성을 수정.
                'style',
                '--progress:' + (Math.max(0, dis - (index * gap))) + ''
            )
            console.log('rkqt', dis - (index * gap))
        })
       
    }

    function init(){
        moveFunc()
    }

    $(window).scroll(function(){
        init()
        moveFunc()
    })

    $(window).resize(function(){
        init()
    })

    init()
})

// section 3 my skill 
$(function(){

	var scrollBody = $('.my_skill');
	var titText = scrollBody.find('.intro_txt');
	var maskLeft = scrollBody.find('.left_mask');
	var maskRight = scrollBody.find('.right_mask');
	var bgImage = scrollBody.find('.bg_img');
	var bgImageTwo = scrollBody.find('.bg_img2')
	var endingContent = scrollBody.find('.ending_txt');

	console.log('bgImage2', bgImageTwo)

	/*리사이즈, 스크롤할때 변해야 할 값들*/
	var scrollHeight;
	var sectionOffsetTop;
	var sectionScrollTop;
	var scrollRealHeight;
	var winScrollTop;
	var scrollPercent;
	var percent;

	function changeOverlap() {

		setProperty();
		motionRender();
	};

	function setProperty() {

		scrollHeight = scrollBody.height();
		sectionOffsetTop = scrollBody.offset().top;
		scrollRealHeight = (scrollHeight - $(window).height());
		winScrollTop = $(window).scrollTop();
		sectionScrollTop = winScrollTop - sectionOffsetTop;

		scrollPercent =  sectionScrollTop / scrollRealHeight;
		percent = scrollPercent * 100 ;
	};

	function motionRender() {
		var maskStartValue = 50;
		var maskEndValue = -10;
		var zoomValue = 1.5;
		var zoomOutValue = 1;
		var maskVal = Math.max(maskEndValue, maskStartValue - (scrollPercent * maskStartValue));
		var scaleVal = Math.max(zoomOutValue, zoomValue - (scrollPercent * zoomValue));



		maskLeft
		.css({
			width: maskVal + '%'
		});

		maskRight
		.css({
			width: maskVal + '%'
		});

		bgImage
		.css({
			'transform': 'scale('+ scaleVal +')'
		});
	
	

		if(percent > 0.3) {
			titText.addClass('active');
            
		} else {
			titText.removeClass('active');
		}



		if(percent >= 40) {
			endingContent.addClass('active');
		
		} else {
			endingContent.removeClass('active');
		

		}

        console.log('percent', percent)

	};

	function init() {
		changeOverlap();
	};

	$(window).scroll(function(e) {
		changeOverlap();
	});

	$(window).resize(function() {
		changeOverlap();
	});

	init();
});