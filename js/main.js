'use-strict';

$(function () {
	const section = $('.section');
	let offsetTop = [];
	let offsetBottom = [];

	const navCon = $('.nav_con')
	const navToggle = navCon.find('.nav_toggle')
	const navList = navCon.find('.nav_list')

	const mainTitle = $('.main_title')

	// main section 
	const mainSection = $('#main_section')
	let sectionMainTop;
	let sectionMainBottom;
 
	const scrollTxt = $('.scroll_txt');
	const scrollBox = $('.scroll_box');
	const allText = $('.fix_box .txt');

	let winScrollTop;
	let scrollTxtTop;
	let scrollTxtBottom;

	// my skill 
	const mySkill = $('.my_skill');
	const skills = $('.skills');

	const titText = mySkill.find('.intro_txt');
	const maskLeft = mySkill.find('.left_mask');
	const maskRight = mySkill.find('.right_mask');
	const bgImage = mySkill.find('.bg_img');
	const endingContent = mySkill.find('.ending_txt');

	// MYproject 
	const myProject = $('#my_project')
	const webLine = $('.web_line');
	const projectCont = myProject.find('.contents')

	// frontend project 
	const frontendSec = $('#frontend_project');

	let isMobile;
	let sectionIsMoving = false;

	let frontendHeight;
	let frontendOffsetTop;
	let frontendBottom;
	let frontendScrollTop;
	let frontendPercent;
	let frontendRealHeight;
	let frontendPer;

	// final notice 
	const finalNotice = $('#final_notice')
	
	// contact_form 
	let contactForm = $('#contact_form');
	let contactContainer = contactForm.find('.container')
	let contactMe = contactForm.find('.contact_me')
	let developerImg = contactForm.find('.developer_img')
	let contactOffsetTop;
	let contactBottom;

	const skillCode = $('.skill_code');
	const codeSkillText = skillCode.find('.skill_txt');
	const codeSkillBar = skillCode.find('.skill_bar');
	const skillDesign = $('.skill_design');
	const designSkillText = skillDesign.find('.skill_txt');
	const designSkillBar = skillDesign.find('.skill_bar');

	// final_notice 
	const motionArea = $('.motion_area')

	let mySkillHeight;
	let mySkillRealHeight;
	let mySkillOffsetTop;
	let valueThisTop;
	let valuePercent;
	let parallaxSpeed = 1200;

	let maxNum;

	// 메인섹션 스크롤 애니메이션 효과 	
	function moveStartRender() {
		if (!navToggle.hasClass('active') && $(window).width() > 900) {
			navToggle.addClass('active')
			$('.main_images').addClass('active')
			$('html').stop(true).animate({
				scrollTop: sectionMainBottom,
			}, 1000, function () {
				sectionIsMoving = false;
			})
		}else if(!navToggle.hasClass('active')) {
			navToggle.addClass('active')
			$('.main_images').addClass('active')
		} else if(navToggle.hasClass('active')){
			navToggle.removeClass('active')
			$('.main_images').removeClass('active')

			$('html').stop(true).animate({
				scrollTop: sectionMainTop,
			}, 500, function () {
				sectionIsMoving = false;
			})
		} 
	}


	function navInSection(){
		if(winScrollTop >= offsetTop[0] && offsetBottom[0] + 1 > winScrollTop) {
			sectionInActive(0)
			$('.profile').addClass('active')
			$('.git_icon a').css({
				"color":"black"
			})
		} else if(winScrollTop >= offsetTop[1] && offsetBottom[1] > winScrollTop) {
			navToggle.addClass('active')
			sectionInActive(1)
			$('.git_icon a').css({
				"color":"black"
			})
		} else if(winScrollTop >= offsetTop[2] && offsetBottom[2] > winScrollTop) {
			sectionInActive(2)
			navToggle.addClass('active')
			$('.git_icon a').css({
				"color":"black"
			})
		} else if(winScrollTop >= offsetTop[3] && offsetBottom[3] > winScrollTop) {
			sectionInActive(3)
			navToggle.addClass('active')
			$('.git_icon a').css({
				"color":"black"
			})
		} else if(winScrollTop >= offsetTop[4] && offsetBottom[4] > winScrollTop) {
			sectionInActive(4)
			navToggle.addClass('active')
			$('.git_icon a').css({
				"color":"black"
			})
		} else if(winScrollTop >= offsetTop[5] && offsetBottom[5] > winScrollTop) {
			sectionInActive(5)
			navToggle.addClass('active')
			$('.git_icon a').css({
				"color":"white"
			})
		} else if(winScrollTop >= offsetTop[6] && offsetBottom[6] > winScrollTop) {
			sectionInActive(6)
			navToggle.addClass('active')
			$('.git_icon a').css({
				"color":"black"
			})
		}

	}

	// 해당 섹션안에 진입할 때 menu 활성화 
	function sectionInActive(index){
		listActive(index)
	}

	function listActive(index){
		let list = $('.nav_list li a');
		list.removeClass('active');
		list.eq(index).addClass('active');
	}

	// 애니메이션 값 셋팅
	function setProperty() {
		winScrollTop = $(window).scrollTop();
		isMobile = $(window).width() <= 900 ? true : false;

		// nav_list 각 세션에 섹션 클래스 탑값과 높이값 
		section.each(function(index,obj){
			offsetTop[index] = $(obj).offset().top;
			offsetBottom[index] = offsetTop[index] + $(obj).height();
		})
	
		// 메인섹션 set 
		sectionMainTop = mainSection.offset().top;
		sectionMainBottom = sectionMainTop + mainSection.height();
	
		if (winScrollTop > sectionMainTop && winScrollTop < sectionMainBottom) {
			if (!sectionIsMoving) {
				sectionIsMoving = true;
				moveStartRender()
			} 
		}

		// contactme 위치에 있을 때 애니메이션 실행 값 
		contactOffsetTop = contactForm.offset().top
		contactBottom = contactOffsetTop + contactForm.height()

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

		render(valueTextPercent, valueHeightPercent);

		frontendOffsetTop = frontendSec.offset().top;
		frontendHeight = frontendSec.height();
		frontendBottom = frontendOffsetTop + frontendHeight;
		frontendRealHeight = (frontendHeight - $(window).height());
		frontendScrollTop = winScrollTop - frontendOffsetTop;
		frontendPercent = frontendScrollTop / frontendRealHeight;
		frontendPer = frontendPercent * 100;

		console.log('percnet', percent)
		
	}

// 나의 스킬 랜더UI 
	function render(valueTextPercent, valueHeightPercent) {
		if (maxNum > 100) { //100이 넘어갈 때 더이상 값이 올리가지 않음
			codeSkillText.text("100 " + '%')
			designSkillText.text("100 " + '%')

			codeSkillBar.css({ 
				width: "40" + '%'
			});
			designSkillBar.css({ 
				width: "40" + '%'
			});

		} else if (maxNum < 100) {
			//index : 0-html , 1-css, 2-sass, 3-js, 4-jquery, 5-react
			codeSkillText.eq(0).text(Math.floor(valueTextPercent / 1.17) + '%'); //html skill
			codeSkillText.eq(1).text(Math.floor(valueTextPercent / 1.19) + '%'); //css skill 
			codeSkillText.eq(2).text(Math.floor(valueTextPercent / 1.4) + '%'); //sass skill
			codeSkillText.eq(3).text(Math.floor(valueTextPercent / 1.9) + '%'); //js skill 
			codeSkillText.eq(4).text(Math.floor(valueTextPercent / 1.5) + '%'); //jquery skill
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
				width: valueHeightPercent / 1.8 + '%'
			});
			codeSkillBar.eq(5).css({ //react skill
				width: valueHeightPercent / 1.85 + '%'
			});

			designSkillBar.eq(0).css({ //photoshop skill
				width: valueHeightPercent / 1.45 + '%'
			});
			designSkillBar.eq(1).css({ //illust skill
				width: valueHeightPercent / 1.5 + '%'
			});
			designSkillBar.eq(2).css({ //figma skill
				width: valueHeightPercent / 2 + '%'
			});
		}
	};
	

	function moveFunc() {
		setProperty();
		motionRender();
		navInSection();

		// 스크롤이 my project영역일때 메인타이틀과 웹라인 영역 나타남
		if(percent > 107) {
			mainTitle.eq(1).addClass('active')
			webLine.eq(1).addClass('active')
			
		} else if (percent < 107 || percent > 140) {
			mainTitle.eq(1).removeClass('active')
			webLine.eq(1).removeClass('active')
		}

		// 스크롤이 frontend project영역일때 PC, MOBILE 메인타이틀과 웹라인 영역 나타남
		function frontendMainTitle(){
		if(percent > 146) {
			mainTitle.eq(2).addClass('active')
			webLine.eq(2).addClass('active')
		} else if (percent < 146 || percent > 180) {
			mainTitle.eq(2).removeClass('active')
			webLine.eq(2).removeClass('active')
		}
	}

	function moFrontendMainTitle(){
		if(percent > 158) {
			mainTitle.eq(2).addClass('active')
			webLine.eq(2).addClass('active')
		} else if (percent < 158 || percent > 180) {
			mainTitle.eq(2).removeClass('active')
			webLine.eq(2).removeClass('active')
		}
	}
	
	//  scroll_txt영역이 윈도우창에 도착했을 때 텍스트 나타남  
		if (winScrollTop > scrollTxtTop && winScrollTop <= scrollTxtBottom) {
			textInOut()
		} else {}

		// 모바일, pc ver
		if (isMobile) {
			contentInMobile();
			moFrontendMainTitle();
			moMyProjectCon();
			moFinalNoticeFun();
			
		} else {
			contentIn();
			frontendMainTitle();
			myProjectCon();
			finalNoticeFun();
		}
	}


	// scroll_txt 인아웃 애니메이션
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

		// 컨텍트 미 영역에 들어올때 애니메이션 실행 
		if(winScrollTop > contactOffsetTop && winScrollTop < contactBottom) {
			contactContainer.addClass('active')
			contactMe.addClass('active')
			developerImg.addClass('active')
		} else {
			contactContainer.removeClass('active')
			contactMe.removeClass('active')
			developerImg.removeClass('active')
		}
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

		// 스롤이 my skill 섹션에 도착하면 타이틀 라인 애니메이션 실행 
		if (percent > 11) {
			webLine.eq(0).addClass('active')
		} else if (percent < 11 || percent > 200) {
			webLine.eq(0).removeClass('active')
		}

	};

	// frontend 프로젝트 스크롤 시 텍스트 이미지 맞춤 변경 
	function contentIn() {
		var deviceImg = $('.device_fix .slide_wrap figure');
		var imgWidth = deviceImg.width();

		console.log('frontendper', frontendPer)

		if (frontendPer >= 0 && frontendPer < 52) {
			imageChange(imgWidth * 0);
			$('#frontend_project .text_box .txt01').addClass('active');
		}

		if (frontendPer >= 52 && frontendPer < 85) {
			imageChange(imgWidth * 1);
			$('#frontend_project .text_box .txt02').addClass('active');
		}

		if (frontendPer >= 85 && frontendPer < 117) {
			imageChange(imgWidth * 2);
			$('#frontend_project .text_box .txt03').addClass('active');
		}

		if (frontendPer >= 117) {
			imageChange(imgWidth * 3);
			$('#frontend_project .text_box .txt04').addClass('active');
		}

		if (frontendPer < 0) {
			$('#frontend_project .text_box .txt01').removeClass('active');
			$('#frontend_project .text_box .txt02').removeClass('active');
			$('#frontend_project .text_box .txt03').removeClass('active');
			$('#frontend_project .text_box .txt04').removeClass('active');
		}
	};

	// 모바일  FRONTEND 프로젝트 스크롤 시 텍스트 이미지 맞춤 변경  
	function contentInMobile() {

		var deviceImg = $('#frontend_project .slide_wrap figure');
		var imgWidth = deviceImg.width();

		
		if (frontendPer >= 5 && frontendPer < 25) {
			imageChange(imgWidth * 0);
			$('#frontend_project .text_box p').removeClass('active');
			$('#frontend_project .text_box .txt01').addClass('active');
		}
		if (frontendPer >= 25 && frontendPer < 45) {
			imageChange(imgWidth * 1);
			$('#frontend_project .text_box p').removeClass('active');
			$('#frontend_project .text_box .txt02').addClass('active');
		}
		if (frontendPer >= 45 && frontendPer < 65) {
			imageChange(imgWidth * 2);
			$('#frontend_project .text_box p').removeClass('active');
			$('#frontend_project .text_box .txt03').addClass('active');
		}
		if (frontendPer >= 65 && frontendPer <= 85) {
			imageChange(imgWidth * 3);
			$('#frontend_project .text_box p').removeClass('active');
			$('#frontend_project .text_box .txt04').addClass('active');
		}
		if (frontendPer > 85) {
			imageChange(imgWidth * 3);
			$('#frontend_project .text_box p').removeClass('active');
		}
		if (frontendPer < 0) {
			(imgWidth * 0);
			$('#frontend_project .text_box p').removeClass('active');
		}

	};


	function imageChange(moveX) {
		let img = $('#frontend_project .slide_wrap .slide')
		img.css({
			transform: 'translateX(' + -moveX + 'px)'
		})
	}
	
		// my_project 스크롤 위치에 도착하면 컨텐츠 애니메이션 실행 pc, mobile
		function myProjectCon(){
			if (percent > 112 && percent < 200) {
				projectCont.eq(0).addClass('active')
			} else if (percent < 107 || percent > 200) {
				projectCont.eq(0).removeClass('active')
			}
			if (percent >= 120 && percent < 200) {
				projectCont.eq(1).addClass('active')
			} else if (percent < 116 || percent > 200) {
				projectCont.eq(1).removeClass('active')
			}
			if (percent >= 128 && percent < 200) {
				projectCont.eq(2).addClass('active')
			} else if (percent < 125 || percent > 200) {
				projectCont.eq(2).removeClass('active')
			}
			if (percent >= 135 && percent < 200) {
				projectCont.eq(3).addClass('active')
			} else if (percent < 133 || percent > 200) {
				projectCont.eq(3).removeClass('active')
			}
		}

		function moMyProjectCon(){
			if (percent > 110 && percent < 200) {
				projectCont.eq(0).addClass('active')
			} else if (percent < 107 || percent > 200) {
				projectCont.eq(0).removeClass('active')
			}
			if (percent >= 121 && percent < 200) {
				projectCont.eq(1).addClass('active')
			} else if (percent < 121 || percent > 200) {
				projectCont.eq(1).removeClass('active')
			}
			if (percent >= 132 && percent < 200) {
				projectCont.eq(2).addClass('active')
			} else if (percent < 130 || percent > 200) {
				projectCont.eq(2).removeClass('active')
			}
			if (percent >= 145 && percent < 200) {
				projectCont.eq(3).addClass('active')
			} else if (percent < 151 || percent > 200) {
				projectCont.eq(3).removeClass('active')
			}
		}
	
		// finalNotice bg, txt 애니메이션 pc mobile ver
	function finalNoticeFun() {
		if(percent > 195 && percent < 230){
			$('body').css({backgroundColor:'black'})
		}else {
			$('body').css({backgroundColor:'white'})
		}

		if(percent > 198 && percent < 225){
			motionArea.addClass('active')
			finalNotice.addClass('active')
		} else if (percent < 210 || percent > 225){
			motionArea.removeClass('active')
			finalNotice.removeClass('active')
		}
	}

	function moFinalNoticeFun() {
		if(percent > 200 && percent < 230){
			$('body').css({backgroundColor:'black'})

		}else {
			$('body').css({backgroundColor:'white'})
		}

		if(percent > 204&& percent < 225){
			motionArea.addClass('active')
			finalNotice.addClass('active')
		} else if (percent <210 || percent > 225){
			motionArea.removeClass('active')
			finalNotice.removeClass('active')
		}
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

	// toggle  
	$(function() {
		navToggle.on('click', function() {
			navList.toggleClass('active', 200, 'easeOutSine');
			navCon.toggleClass('active', 200, 'easeOutSine');
		});
	});

	function init() {
		moveFunc()
		navInSection()
	}

	$(window).scroll(function () {
		moveFunc()
		navInSection()
	})

	$(window).resize(function () {
		init()
	})

	init()
});