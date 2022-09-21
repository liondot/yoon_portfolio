$(function () {
    let winScrollTop;
    let navToggle = $('.nav_toggle')
    let section = $('.section')

    let mainSection = $('.main_section');
    let mainSecImg = $('.main_images .main_img')

    let offsetTop = [];
    let offsetBottom = [];
    let mainSecTop;
    let mainSecBottom;
    let sectionIsMoving = false; //섹션이 이동중인지 체크

    let leftNum = -300;

	var parallaxSpeed = 600; // 패럴럭스 요소의 스피드
	var mainPercent; // 패럴럭스 백분율값을 담을 변수를 선업합니다
	var parallaxStartValue = 1000; //패럴럭스요소가 200 위치에서 시작하도록 설정합니다.
	var mainMoveDistance; // 패럴럭스 요소가 움직일 거리를 담을 변수 선업합니다

    // navbar toggle 
    $(document).ready(function () {
        $(".fa-bars").click(function () {
            $(".nav_list").animate({
                opacity: "toggle",
                right: "toggle"
            });
        });
    });

    function setValue() {
        winScrollTop = $(window).scrollTop();

        // console.log(winScrollTop)
        section.each(function (index, obj) {
            offsetTop[index] = $(obj).offset().top;
            offsetBottom[index] = offsetTop[index] + $(obj).height();
            console.log(winScrollTop)
        })

        // main_section 
        mainSecTop = mainSection.offset().top; //parallaxOffsetTop
        mainSecBottom = mainSecTop + mainSection.height();
        mainThisTop = winScrollTop - mainSecTop; //parallaxThisTop 
        mainPercent = mainThisTop / parallaxSpeed * 100 // parallaxPercent
        mainMoveDistance = Math.max(parallaxStartValue - parallaxStartValue, Math.min(parallaxStartValue, parallaxStartValue - (parallaxStartValue * (mainPercent/100)))); //패럴럭스 요소가 움직일 거리를 구함


        console.log(`mainThisTop : ${mainThisTop}`)
        console.log(`mainPercent : ${mainPercent}`)
        console.log(`mainMoveDistance : ${mainMoveDistance}`)

      
    }


	function motionParallax() { // 스크롤할때 계속 호출될 패럴럭스 함수 선언
		mainSecImg.eq(0).css({ //계산된 값을 엘리먼트에 적용
			transform : `translate(${- mainMoveDistance}px, ${mainMoveDistance}px) rotate(25deg)`,
            transition: `all .5s easy-in`
		});

		mainSecImg.eq(1).css({ //계산된 값을 엘리먼트에 적용
			transform : `translate(${- mainMoveDistance + 140 }px, ${mainMoveDistance - 250}px) rotate(25deg)`,
		});

		mainSecImg.eq(2).css({ //계산된 값을 엘리먼트에 적용
			transform : `translate(${- mainMoveDistance + 140 }px, ${mainMoveDistance - 250}px) rotate(25deg)`,
		});

		mainSecImg.eq(3).css({ //계산된 값을 엘리먼트에 적용
			transform : `translate(${mainMoveDistance + 300 }px, ${ - mainMoveDistance - 200}px) rotate(25deg)`,
		});

		mainSecImg.eq(4).css({ //계산된 값을 엘리먼트에 적용
			transform : `translate(${mainMoveDistance + 300 }px, ${ - mainMoveDistance - 200}px) rotate(25deg)`,
		});

		mainSecImg.eq(5).css({ //계산된 값을 엘리먼트에 적용
			transform : `translate(${mainMoveDistance + 300 }px, ${ - mainMoveDistance - 200}px) rotate(25deg)`,
		});
	};


    function checkInSection() {
        if (winScrollTop >= offsetTop[0] && winScrollTop < offsetBottom[0]) {
            sectionActive(0)
            navToggle.removeClass('active')
            console.log('첫번째')
        } else if (winScrollTop >= offsetTop[1] && winScrollTop < offsetBottom[1]) {
            sectionActive(1) + 1
            activeCheck()
            console.log('두번째')
        } else if (winScrollTop >= offsetTop[2] && winScrollTop < offsetBottom[2]) {
            sectionActive(2) + 1
        } else if (winScrollTop >= offsetTop[3] && winScrollTop < offsetBottom[3]) {
            sectionActive(3)
        }

    }


    function moveSection() { //스크롤 할 때 호출함
        checkInSection()
        setValue()
        // motionParallax()

        if (winScrollTop > mainSecTop && winScrollTop < mainSecBottom) { //섹션에 진입했는지 체크합니다.
            if (!sectionIsMoving) { //애니메이션이 진행 중인지 체크합니다.
                sectionIsMoving = true;
                moveStartRender(); //섹션 이동을 처리하는 함수
            }
        }
        // if(winScrollTop = 0) {
        //     motionParallax()
        // }
        if (winScrollTop >= mainSecBottom) {
            activeCheck(); //새로고침을 할 때 페이지가 아래에서 시작할 경우 액티브돼야 할 요소들을 처리
        }
    };


    // 메인섹션 스크롤 처리 함수 
    function moveStartRender() {

        if (!navToggle.hasClass('active')) {
            navToggle.addClass('active');
            motionParallax()

            $('html').stop(true).animate({
                scrollTop: mainSecBottom + 1
            }, 500, function () {
                sectionIsMoving = false;

            });
          
         

        } else {

            navToggle.removeClass('active');
            motionParallax(); 

            $('html').stop(true).animate({
                scrollTop: mainSecTop
            },500,function(){
                sectionIsMoving = false; 
            });
        }
    };

    function sectionActive(index) {
        listActive(index)
    }

    function listActive(index) {
        var list = $('.nav_list li a');
        list.removeClass('active');
        list.eq(index).addClass('active');
    }


    $('.nav_list li a').click(function (e) {
        if ($(this.hash).offset()) {
            $('html')
                .animate({
                    scrollTop: $(this.hash).offset().top + 1
                }, 300)
        }
    })

    function activeCheck() { //새로고침을 할 때 페이지가 아래에서 시작할 경우 액티브돼야 할 요소들을 처리
        navToggle.addClass('active')
    };

    function moveSection() { //스크롤 할 때 호출함
        checkInSection()
        setValue()


        if (winScrollTop > mainSecTop && winScrollTop < mainSecBottom) { //섹션에 진입했는지 체크합니다.

            if (!sectionIsMoving) { //애니메이션이 진행 중인지 체크합니다.
                sectionIsMoving = true;
                moveStartRender(); //섹션 이동을 처리하는 함수
            }
        }

        if (winScrollTop >= mainSecBottom) {
            activeCheck(); //새로고침을 할 때 페이지가 아래에서 시작할 경우 액티브돼야 할 요소들을 처리
        }
    };

    // how_to section 텍스트 나타났다 사라짐
    var allText = $('.txt');
	$(window).scroll(function( ){ //스크롤 이벤트를 추가합니다.
		var dis = $(window).scrollTop() / (($('.howBox').height() - $(window).height()) / 4);
		var gap = 1;
		allText.each(function(tomato, arr) {
			$(arr).attr( //제이쿼리 attr 메소드로 엘리먼트의 속성을 수정.
				'style',
				'--progress:' + (Math.max(0, dis - (tomato * gap))) + ''
			)
		})

	})



    function init() {
        moveSection()
    }

    $(window).resize(function() {
        moveSection()
    })

    $(window).scroll(function(e) {
        // winScrollTop = $(window).scrollTop();
        moveSection()
        init()
    });

    init()

});