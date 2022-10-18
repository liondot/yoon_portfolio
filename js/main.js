'use-strict';


$(function () {

	let scrollTxt = $('.scroll_txt');
	let scrollBox = $('.scroll_box');
	let allText = $('.fix_box .txt');

	let winScrollTop;
	let scrollTxtTop;
	let scrollTxtBottom;

	// my skill 
	let mySkill = $('.my_skill');
	let skills = $('.skills');
	// let valCon = $('.value_con')

	let titText = mySkill.find('.intro_txt');
	let maskLeft = mySkill.find('.left_mask');
	let maskRight = mySkill.find('.right_mask');
	let bgImage = mySkill.find('.bg_img');
	let bgImageTwo = mySkill.find('.bg_img2');
	let endingContent = mySkill.find('.ending_txt');


	// 메인타이틀 라인  
	let webLine = $('.web_line');
	let myProject = $('#my_project')
	let projectCont = myProject.find('.contents')

	// toy project 
	let toyClone = $('#clone_toy_project');
	let toyContainer = toyClone.find('.container');
	let ctTitle = toyClone.find('.ct_title');

	let cloneBodymySkillHeight;
	let cloneBodyOffsetTop;
	let cloneBodyScrollTop;
	let cloneBodyRealHeight;
	let isMobile;

	let toyCloneHeight;
	let toyCloneOffsetTop;
	let toyCloneScrollTop;
	let toyClonePercent;
	let toyCloneRealHeight;
	let toyPer;

	let skillCode = $('.skill_code');
	let codeSkillText = skillCode.find('.skill_txt');
	let codeSkillBar = skillCode.find('.skill_bar');
	let skillDesign = $('.skill_design');
	let designSkillText = skillDesign.find('.skill_txt');
	let designSkillBar = skillDesign.find('.skill_bar');


	let mySkillHeight;
	let mySkillRealHeight;
	let mySkillOffsetTop;
	let valueThisTop;
	let valuePercent;
	let parallaxSpeed = 1200;

	let valConThisTop
	let valConPercent

	let maxNum;


	function setProperty() {
		winScrollTop = $(window).scrollTop();

		// section 2 scroll_text 위치 값   
		scrollTxtTop = scrollTxt.offset().top;
		scrollTxtBottom = scrollTxtTop + scrollTxt.height();
		textInOut()

		// my skill & project 위치값
		mySkillHeight = mySkill.height();
		mySkillRealHeight = (mySkillHeight - $(window).height())
		skillScrollTop = winScrollTop - mySkillOffsetTop;
		skillScrollPercent = skillScrollTop / mySkillRealHeight;
		percent = skillScrollPercent * 100;

		mySkillOffsetTop = mySkill.offset().top;
		valueThisTop = winScrollTop - mySkillOffsetTop;
		valuePercent = valueThisTop / parallaxSpeed * 100;

		let maxNumber = 100;
		maxNum = Math.floor(Math.min(maxNumber, (valueThisTop / mySkillRealHeight) * 100));


		var valueHeightPercent = (valueThisTop / mySkillRealHeight) * 100
		var valueTextPercent = Math.round(valueHeightPercent)

		// console.log('maxNum', maxNum)
		render(valueTextPercent, valueHeightPercent);

		toyCloneOffsetTop = toyClone.offset().top;
		toyCloneHeight = toyClone.height();
		toyCloneRealHeight = (toyCloneHeight - $(window).height());
		toyCloneScrollTop = winScrollTop - toyCloneOffsetTop;
		toyClonePercent = toyCloneScrollTop / toyCloneRealHeight;
		toyPer = toyClonePercent * 100;

	}



	function render(valueTextPercent, valueHeightPercent) {
		if (maxNum > 100) { //100이 넘어갈 때 더이상 값이 올리가지 않음, 100으로 최대값 맞춤

			// codeSkillText.text("100 " + '%')
			// designSkillText.text("100 " + '%')

			// codeSkillBar.css({ 
			// 	width: "40" + '%'
			// });
			// designSkillBar.css({ 
			// 	width: "40" + '%'
			// });


		} else if (maxNum < 100) {
			//index : 0-html , 1-css, 2-sass, 3-js, 4-jquery, 5-react
			codeSkillText.eq(0).text(Math.floor(valueTextPercent / 1.18) + '%'); //html skill
			codeSkillText.eq(1).text(Math.floor(valueTextPercent / 1.15) + '%'); //css skill 
			codeSkillText.eq(2).text(Math.floor(valueTextPercent / 1.4) + '%'); //sass skill
			codeSkillText.eq(3).text(Math.floor(valueTextPercent / 1.9) + '%'); //js skill 
			codeSkillText.eq(4).text(Math.floor(valueTextPercent / 1.8) + '%'); //jquery skill
			codeSkillText.eq(5).text(Math.floor(valueTextPercent / 1.6) + '%'); //react skill 

			//index: 0-photoshop, 1-illustrator, 2-figma
			designSkillText.eq(0).text(Math.floor(valueTextPercent / 1.2) + '%'); //photoshop skill
			designSkillText.eq(1).text(Math.floor(valueTextPercent / 1.25) + '%'); //illust skill 
			designSkillText.eq(2).text(Math.floor(valueTextPercent / 2) + '%'); //figma skill 


			// skillbar render 
			codeSkillBar.eq(0).css({ //html skill
				width: valueHeightPercent / 1.4 + '%'
			});
			codeSkillBar.eq(1).css({ //css skill
				width: valueHeightPercent / 1.6 + '%'
			});
			codeSkillBar.eq(2).css({ //sass skill
				width: valueHeightPercent / 1.7 + '%'
			});
			codeSkillBar.eq(3).css({ //js skill
				width: valueHeightPercent / 2 + '%'
			});
			codeSkillBar.eq(4).css({ //jquery skill
				width: valueHeightPercent / 1.9 + '%'
			});
			codeSkillBar.eq(5).css({ //react skill
				width: valueHeightPercent / 1.8 + '%'
			});

			designSkillBar.eq(0).css({ //phosothop skill
				width: valueHeightPercent / 1.1 + '%'
			});
			designSkillBar.eq(1).css({ //illust skill
				width: valueHeightPercent / 1.2 + '%'
			});
			designSkillBar.eq(2).css({ //figma skill
				width: valueHeightPercent / 2 + '%'
			});
		}



	};

	function moveFunc() {
		setProperty()
		motionRender();

		if (winScrollTop > scrollTxtTop && winScrollTop <= scrollTxtBottom) {
			textInOut()
		} else {}

		// toyclone project 모바일버전 pc
		if (isMobile) {
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

	// my skill 좌우 사라지는 배경 위치 애니메이션 
	function motionRender() {
		let maskStartValue = 60;
		let maskEndValue = -10;
		let zoomValue = 2;
		let zoomOutValue = 1;
		let maskVal = Math.max(maskEndValue, maskStartValue - (skillScrollPercent * maskStartValue));
		let scaleVal = Math.max(zoomOutValue, zoomValue - (skillScrollPercent * zoomValue));

		// my skill 화면 열림 maskLeft, maskRight
		maskLeft
			.css({
				width: (maskVal / 1.3) + '%'
			});
		maskRight
			.css({
				width: (maskVal / 1.3) + '%'
			});
		bgImage
			.css({
				'transform': 'scale(' + scaleVal + ')'
			});

		// my skill 처음, 마지막 텍스트 
		if (percent > 0.3) {
			titText.addClass('active');

		} else {
			titText.removeClass('active');
		}

		if (percent >= 10) {
			endingContent.addClass('active');
			skills.addClass('active')
		} else {
			endingContent.removeClass('active');
			skills.removeClass('active')
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

	// clone toy 프로젝트 스크롤 시 텍스트 이미지 맞춤 변경 
	function contentIn() {
		var deviceImg = $('.device_fix .slide_wrap figure');
		var imgWidth = deviceImg.width();

		if (toyPer >= 0 && toyPer < 20) {
			imageChange(imgWidth * 0);
			$('#clone_toy_project .text_box .txt01').addClass('active');
		}

		if (toyPer >= 20 && toyPer < 54) {
			imageChange(imgWidth * 1);
			$('#clone_toy_project .text_box .txt02').addClass('active');
		}

		if (toyPer >= 54 && toyPer < 85) {
			imageChange(imgWidth * 2);
			$('#clone_toy_project .text_box .txt03').addClass('active');
		}

		if (toyPer >= 85) {
			imageChange(imgWidth * 3);
			console.log(imgWidth * 3)
			$('#clone_toy_project .text_box .txt04').addClass('active');
		}

		if (toyPer < 0) {
			$('#clone_toy_project .text_box .txt01').removeClass('active');
			$('#clone_toy_project .text_box .txt02').removeClass('active');
			$('#clone_toy_project .text_box .txt03').removeClass('active');
			$('#clone_toy_project .text_box .txt04').removeClass('active');
		}
	};

	// 모바일  clone toy 프로젝트 스크롤 시 텍스트 이미지 맞춤 변경  
	function contentInMobile() {

		var deviceImg = $('.device_fix .slide_wrap figure');
		var imgWidth = deviceImg.width();

		console.log('imgWidth', imgWidth)

		if (toyPer >= 5 && toyPer < 25) {
			imageChange(imgWidth * 0);
			$('#clone_toy_project .text_box p').removeClass('active');
			$('#clone_toy_project .text_box .txt01').addClass('active');
		}

		if (toyPer >= 25 && toyPer < 45) {
			imageChange(imgWidth * 1);
			$('#clone_toy_project .text_box p').removeClass('active');
			$('#clone_toy_project .text_box .txt02').addClass('active');
		}

		if (toyPer >= 45 && toyPer < 65) {
			imageChange(imgWidth * 2);
			$('#clone_toy_project .text_box p').removeClass('active');
			$('#clone_toy_project .text_box .txt03').addClass('active');
		}

		if (toyPer >= 65 && toyPer <= 85) {
			imageChange(imgWidth * 3);
			$('#clone_toy_project .text_box p').removeClass('active');
			$('#clone_toy_project .text_box .txt04').addClass('active');

		}


		if (toyPer > 85) {
			imageChange(imgWidth * 3);
			$('#clone_toy_project .text_box p').removeClass('active');
		}

		if (toyPer < 0) {
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

	// contact me 버튼 클릭시 해당 영역으로 이동
	contactForm = $('#contact_form')
	contactBtn = $('#contact_btn')
	socialBtn = $('#social_btn')
	contactContainer = contactForm.find('.container')

	socialBtn.click(function () {
		contactContainer.addClass('change_mod')
	})
	contactBtn.click(function () {
		contactContainer.removeClass('change_mod')
	})




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