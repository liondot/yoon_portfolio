'use-strict';
$.fn.sectionIn = function(func) {
	let el = $('#my_project');
	let winScrollTop;
	let sectionOffsetTop;
	let sectionHeight;
	let sectionOffsetBottom;
	let checkInSection = false;
	let fastIn;
	let startFunction = func;
	let isFunction = typeof(startFunction) === 'function' ? true :  false;



	function setProperty(){
		fastIn = $(window).height() / 2;

		winScrollTop = $(window).scrollTop();
		sectionOffsetTop = el.offset().top - fastIn;
		sectionHeight = el.height();
		sectionOffsetBottom = sectionOffsetTop + sectionHeight + fastIn;
		checkInSection = false;

	}

	function inSection(){
		setProperty();

		if(winScrollTop >= sectionOffsetTop && winScrollTop <= sectionOffsetBottom) {
			if(isFunction && !checkInSection) {
				checkInSection = true;
				startFunction()
			}
		}

	}

	function init(){
		inSection()
	}

	$(window).scroll(function(){
		inSection()
	})

	$(window).resize(function(){
		inSection()
	})

	init()

}
// section 2 font 
$(function(){

	$('.web_line').sectionIn(function() {
		$('.web_line').addClass('active');
	});
	$('#my_project .contents').sectionIn(function() {
		$('#my_project .contents').forEach(element => {
		$('#my_project .contents').addClass('active');
			
		});
	});

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
        })
    }

    function init(){
        moveFunc()
    }

    $(window).scroll(function(){
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

	/*리사이즈, 스크롤할때 변해야 할 값들*/
	var scrollHeight;
	var sectionOffsetTop;
	var sectionScrollTop;
	var scrollRealHeight;
	var winScrollTop;
	var scrollPercent;
	var percent;

	var canvas = $('#canvas')
	console.log('canvas', canvas)

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


	// /************** 숫자를 바꿔 보며 원을 그려보세요:) 잘못넣으면 오류가 생기니 따옴표 지우지말고 조심조심 바꾸세요 ^.^; *******/
	// function canvasCircle(){
	// $('#canvas').circleDraw({ //정방향 그리기
	// 	drawDistance:{
	// 		start : 0, //선 시작위치(deg도)  12시 : 0, 3시 :90, 6시: 180, 9시: 270
	// 		end : 80, //선이그려지는거리(%퍼센트): 100%(맥시멈) * end가 0이면 그려지지 않음.
	// 		line : 'round' //라인끝모양 종류: butt|round|square
	// 	},
	// 	speed:1,//그리는 속도 낮을수록 빨리 그림
	// 	reverse:false, //true 일경우 역방향 진행, false일경우 정방향 진행
	// 	backCircle:{
	// 		radius: 200,//원 크기
	// 		color1: '#b1b1b1',//그라데이션컬리1
	// 		color2: '#b1b1b1',//그라데이션컬러2
	// 		lineWidth : 70 //보더넓이
	// 	},
	// 	frontCircle:{
	// 		radius: 200,
	// 		color1: '#090979',
	// 		color2: '#00d4ff',
	// 		lineWidth : 70
	// 	}
	// });
	// }

