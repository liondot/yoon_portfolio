'use-strict';


$(function () {

	let scrollTxt = $('.scroll_txt');
	let scrollBox = $('.scroll_box');
	let allText = $('.fix_box .txt');

	let winScrollTop;
	let scrollTxtTop;
	let scrollTxtBottom;

	// my skill 
	let scrollBody = $('.my_skill');
	let titText = scrollBody.find('.intro_txt');
	let maskLeft = scrollBody.find('.left_mask');
	let maskRight = scrollBody.find('.right_mask');
	let bgImage = scrollBody.find('.bg_img');
	let bgImageTwo = scrollBody.find('.bg_img2')
	let endingContent = scrollBody.find('.ending_txt');

	// 메인타이틀 라인  
	let webLine = $('.web_line');
	let myProject = $('#my_project')
	let projectCont = myProject.find('.contents')

	// toy project 
	let toyClone = $('#clone_toy_project');
	let toyContainer = toyClone.find('.container');
	let ctTitle = toyClone.find('.ct_title');

	let cloneBodyScrollHeight;
	let cloneBodyOffsetTop;
	let cloneBodyScrollTop;
	let cloneBodyRealHeight;
	let isMobile;

	/*리사이즈, 스크롤할때 변해야 할 값들*/
	let scrollHeight;
	let sectionOffsetTop;
	let sectionScrollTop;
	let scrollRealHeight;
	let scrollPercent;
	let percent;


	let toyCloneHeight;
	let toyCloneOffsetTop;
	let toyCloneScrollTop;
	let toyClonePercent;
	let toyCloneRealHeight;
	let toyPer;



	function setProperty() {
		// section 2 scroll_text 위치 값   
		winScrollTop = $(window).scrollTop();
		scrollTxtTop = scrollTxt.offset().top;
		scrollTxtBottom = scrollTxtTop + scrollTxt.height();
		textInOut()
		
		// my skill & project 위치값
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

	}

	function moveFunc() {
		setProperty()
		motionRender();

		if (winScrollTop > scrollTxtTop && winScrollTop <= scrollTxtBottom) {
			textInOut()
		} else {}

		// toyclone project 모바일버전 pc
		if(isMobile) {
			contentInMobile();
		} else {
			contentIn();
		}
	}

	function textInOut() {
		var dis = winScrollTop / ((scrollBox.height() - scrollTxtTop) / 4);
		var gap = 1;

		allText.each(function (index, arr) {
			$(arr).attr( 
				'style',
				'--progress:' + (Math.max(0, dis - (index * gap))) + ''
			)
		})
	}


	function motionRender() {
		let maskStartValue = 50;
		let maskEndValue = -10;
		let zoomValue = 1.5;
		let zoomOutValue = 1;
		let maskVal = Math.max(maskEndValue, maskStartValue - (scrollPercent * maskStartValue));
		let scaleVal = Math.max(zoomOutValue, zoomValue - (scrollPercent * zoomValue));

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
		if (percent > 130) {
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


	function contentIn() {
		var deviceImg = $('.device_fix .slide_wrap figure');
		var imgWidth = deviceImg.width();
		console.log('toyPer', toyPer)
		console.log('deviceImg', deviceImg)
		console.log('imgWidth', imgWidth)

		
		if(toyPer >= 0 && toyPer < 20) {
			imageChange(imgWidth * 0);
			$('#clone_toy_project .text_box .txt01').addClass('active');

		}

		if(toyPer >= 20 && toyPer < 54) {
			imageChange(imgWidth * 1);
			$('#clone_toy_project .text_box .txt02').addClass('active');
		}

		if(toyPer >= 54 && toyPer < 85) {
			imageChange(imgWidth * 2);
			$('#clone_toy_project .text_box .txt03').addClass('active');
		}

		if(toyPer >= 85 ) {
			imageChange(imgWidth * 3);
			console.log(imgWidth*3)
			$('#clone_toy_project .text_box .txt04').addClass('active');
		}

		if(toyPer < 0 ) {
			$('#clone_toy_project .text_box .txt01').removeClass('active');
			$('#clone_toy_project .text_box .txt02').removeClass('active');
			$('#clone_toy_project .text_box .txt03').removeClass('active');
			$('#clone_toy_project .text_box .txt04').removeClass('active');
		}
	};

	function contentInMobile() {

		var deviceImg = $('.device_fix .slide_wrap figure');
		var imgWidth = deviceImg.width();
	
		console.log('imgWidth', imgWidth)

		if(toyPer >= 5 && toyPer < 25){
			imageChange(imgWidth * 0);
			$('#clone_toy_project .text_box p').removeClass('active');
			$('#clone_toy_project .text_box .txt01').addClass('active');
		}

		if(toyPer >= 25 && toyPer < 45) {
			imageChange(imgWidth * 1);
			$('#clone_toy_project .text_box p').removeClass('active');
			$('#clone_toy_project .text_box .txt02').addClass('active');
		}

		if(toyPer >= 45 && toyPer < 65) {
			imageChange(imgWidth * 2);
			$('#clone_toy_project .text_box p').removeClass('active');
			$('#clone_toy_project .text_box .txt03').addClass('active');
		}

		if(toyPer >= 65 && toyPer <= 85) {
			imageChange(imgWidth * 3);
			$('#clone_toy_project .text_box p').removeClass('active');
			$('#clone_toy_project .text_box .txt04').addClass('active');

		}


		if(toyPer > 85) {
			imageChange(imgWidth * 3);
			$('#clone_toy_project .text_box p').removeClass('active');
		}

		if(toyPer < 0) {
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




// contact me 
contactForm = $('#contact_form')
contactBtn = $('#contact_btn')
socialBtn = $('#social_btn')
contactContainer = contactForm.find('.container')

socialBtn.click(function(){
	contactContainer.addClass('change_mod')
})
contactBtn.click(function(){
	contactContainer.removeClass('change_mod')
})


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

