'use-strict';

// section 2 font 
$(function () {

	let scrollTxt = $('.scroll_txt');
	let scrollBox = $('.scroll_box');
	let allText = $('.fix_box .txt');

	let winScrollTop;
	let scrollTxtTop;
	let scrollTxtBottom;



	function setProperty() {
		winScrollTop = $(window).scrollTop();
		scrollTxtTop = scrollTxt.offset().top;
		scrollTxtBottom = scrollTxtTop + scrollTxt.height();
		textInOut()
		console.log('winscrolltop', winScrollTop)
	}

	function moveFunc() {
		setProperty()

		if (winScrollTop > scrollTxtTop && winScrollTop <= scrollTxtBottom) {
			textInOut()
		} else {}
	}

	function textInOut() {
		var dis = winScrollTop / ((scrollBox.height() - scrollTxtTop) / 4);
		var gap = 1;

		allText.each(function (index, arr) {
			$(arr).attr( //제이쿼리 attr 메소드로 엘리먼트의 속성을 수정.
				'style',
				'--progress:' + (Math.max(0, dis - (index * gap))) + ''
			)
		})
	}

	function init() {

		moveFunc()
	}

	$(window).scroll(function () {
		moveFunc()
	})

	$(window).resize(function () {
		init()
	})

	init()
});

// section 3 my skill & project
$(function () {

	var scrollBody = $('.my_skill');
	var titText = scrollBody.find('.intro_txt');
	var maskLeft = scrollBody.find('.left_mask');
	var maskRight = scrollBody.find('.right_mask');
	var bgImage = scrollBody.find('.bg_img');
	var bgImageTwo = scrollBody.find('.bg_img2')
	var endingContent = scrollBody.find('.ending_txt');

	let webLine = $('.web_line');
	let myProject = $('#my_project')
	let projectCont = myProject.find('.contents')

	// toy project 
	let toyClone = $('#clone_toy_project');
	let toyContainer = toyClone.find('.container');
	let ctTitle = toyClone.find('.ct_title');
	console.log(toyContainer)

	/*리사이즈, 스크롤할때 변해야 할 값들*/
	var scrollHeight;
	var sectionOffsetTop;
	var sectionScrollTop;
	var scrollRealHeight;
	var winScrollTop;
	var scrollPercent;
	var percent;

	let toyCloneHeight;
	let toyCloneOffsetTop;
	let toyCloneScrollTop;
	let toyClonePercent;
	let toyCloneRealHeight;
	let toyPer;


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

		scrollPercent = sectionScrollTop / scrollRealHeight;
		percent = scrollPercent * 100;

		toyCloneOffsetTop = toyClone.offset().top;
		toyCloneHeight = toyClone.height();
		toyCloneRealHeight = (toyCloneHeight - $(window).height());
		toyCloneScrollTop = winScrollTop - toyCloneOffsetTop;
		toyClonePercent = toyCloneScrollTop / toyCloneRealHeight;
		toyPer = toyClonePercent * 100;


		console.log('toyCloneOffsetTop', toyCloneOffsetTop)
		console.log('toyPer', toyPer)
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
				'transform': 'scale(' + scaleVal + ')'
			});

		if (percent > 0.3) {
			titText.addClass('active');

		} else {
			titText.removeClass('active');
		}

		if (percent >= 40) {
			endingContent.addClass('active');
		} else {
			endingContent.removeClass('active');
		}


	

		// 스롤이 my_project 섹션에 도착하면 라인 애니메이션 실행 
		if (percent > 105) {
			webLine.eq(0).addClass('active')
		} else if (percent < 105 || percent > 200) {
			webLine.eq(0).removeClass('active')
		}
		//스크롤이 toy_clone 섹션에 위치하면 라인 애니메이션 실행 
		if (percent > 135) {
			webLine.eq(1).addClass('active')
		} else if (percent < 139 || percent > 200) {
			webLine.eq(1).removeClass('active')
		}

		

		// my_project 스크롤 위치에 도착하면 컨텐츠 애니메이션 실행 
		if (percent > 107 && percent < 200) {
			projectCont.eq(0).addClass('active')
		} else if (percent < 107 || percent > 200) {
			projectCont.eq(0).removeClass('active')
		}
		if (percent >= 114 && percent < 200) {
			projectCont.eq(1).addClass('active')
		} else if (percent < 114 || percent > 200) {
			projectCont.eq(1).removeClass('active')
		}
		if (percent >= 122 && percent < 200) {
			projectCont.eq(2).addClass('active')
		} else if (percent < 112 || percent > 200) {
			projectCont.eq(2).removeClass('active')
		}

	};


	function init() {
		changeOverlap();
	};

	$(window).scroll(function (e) {
		changeOverlap();
	});


	$(window).resize(function () {
		changeOverlap();
	});


	init();
});


// clone_toy_project
$(function(){

	var scrollBody = $('#clone_toy_project');
	var scrollHeight;
	var sectionOffsetTop;
	var sectionScrolTop;
	var scrollRealHeight;
	var winScrollTop;
	var scrollPerecnt;
	var percent;
	var isMobile;

	function scrollFunc() {

		setProperty();


		if(isMobile) {
			contentInMobile();
		} else {
			contentIn();
		}
	};

	function setProperty() {
		isMobile = $(window).width() <= 1024 ? true : false;
		scrollHeight = scrollBody.height();
		sectionOffsetTop = scrollBody.offset().top;
		scrollRealHeight = (scrollHeight - $(window).height());
		winScrollTop = $(window).scrollTop();
		sectionScrolTop = winScrollTop - sectionOffsetTop;

		scrollPerecnt =  sectionScrolTop / scrollRealHeight;
		percent = scrollPerecnt * 100;

	};

	function contentIn() {


		var deviceImg = $('.device_fix .slide_wrap figure');
		var imgWidth = deviceImg.width();
		console.log('contentin퍼센트', percent)

		if(percent >= 0 && percent < 20) {
			imageChange(imgWidth * 0);
			$('#clone_toy_project .text_box .txt01').addClass('active');
		}

		if(percent >= 20 && percent < 54) {
			imageChange(imgWidth * 1);
			$('#clone_toy_project .text_box .txt02').addClass('active');
		}

		if(percent >= 54 && percent < 85) {
			imageChange(imgWidth * 2);
			$('#clone_toy_project .text_box .txt03').addClass('active');
		}

		if(percent >= 85 ) {
			imageChange(imgWidth * 3);
			console.log(imgWidth*3)
			$('#clone_toy_project .text_box .txt04').addClass('active');
		}

		if(percent < 0 ) {
			$('#clone_toy_project .text_box .txt01').removeClass('active');
			$('#clone_toy_project .text_box .txt02').removeClass('active');
			$('#clone_toy_project .text_box .txt03').removeClass('active');
			$('#clone_toy_project .text_box .txt04').removeClass('active');
		}
	};

	function contentInMobile() {

		var deviceImg = $('.device_fix .slide_wrap figure');
		var imgWidth = deviceImg.width();
	

		if(percent >= 5 && percent < 25){
			imageChange(imgWidth * 0);
			$('#clone_toy_project .text_box p').removeClass('active');
			$('#clone_toy_project .text_box .txt01').addClass('active');
		}

		if(percent >= 25 && percent < 45) {
			imageChange(imgWidth * 1);
			$('#clone_toy_project .text_box p').removeClass('active');
			$('#clone_toy_project .text_box .txt02').addClass('active');
		}

		if(percent >= 45 && percent < 65) {
			imageChange(imgWidth * 2);
			$('#clone_toy_project .text_box p').removeClass('active');
			$('#clone_toy_project .text_box .txt03').addClass('active');
		}

		if(percent >= 65 && percent <= 85) {
			imageChange(imgWidth * 3);
			$('#clone_toy_project .text_box p').removeClass('active');
			$('#clone_toy_project .text_box .txt04').addClass('active');

		}


		if(percent > 85) {
			imageChange(imgWidth * 3);
			$('#clone_toy_project .text_box p').removeClass('active');
		}

		if(percent < 0) {
			(imgWidth * 0);
			$('#clone_toy_project .text_box p').removeClass('active');
		}

	};

	function imageChange(moveX) {
		let img = $('#clone_toy_project .slide_wrap .slide')
		img.css({
			transform: 'translateX(' + -moveX + 'px)'
		})
	}



	function init() {
		scrollFunc();
	};

	$(window).scroll(function() {
		scrollFunc();
	});

	$(window).resize(function() {
		scrollFunc();
	});

	init();
});


// contact me 
const contact_form = document.querySelector('#contact_form')
const contact_btn = document.querySelector("#contact_btn");
const social_btn = document.querySelector("#social_btn");
const container = contact_form.querySelector(".container");

social_btn.addEventListener("click", () => {
  container.classList.add("change_mod");
});

contact_btn.addEventListener("click", () => {
  container.classList.remove("change_mod");
});


// final_notice 



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

