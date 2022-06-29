'use-strict'

const menuList = document.querySelector('#menu_list')
const toggleBtn = document.querySelector('.toggle_btn');
const mainSection = document.querySelector('#section01')
const mainSectionHeight = mainSection.getBoundingClientRect().height;
const spanTxt = document.querySelector('.spanTxt');


const BODY = document.querySelector('body, html')
const BODYOffset = BODY.getBoundingClientRect()

// spanTxt.addEventListener('click', clickResult);
document.addEventListener('scroll', ()=> {
console.log('윈도우 위치:', window.scrollY)

})



toggleBtn.addEventListener('click', toggle);

// 토글 버튼 
function toggle() {
    toggleBtn.classList.toggle('active')
    menuList.classList.toggle('active')
}

document.addEventListener('scroll', () => {
    if(window.scrollY > mainSectionHeight / 3) {
    }
})


// top btn 
const topBtn = document.querySelector('.arrow_top');

topBtn.addEventListener('click', goToTop);

function goToTop() {
    window.scrollTo(0, 0);
}


// var s = skrollr.init();
let $root = $('html, body');
let $position = [0, 1000, 2000, 3000, 4000, 5000, 6000,];
let $currentPosition = 0;



$(window).scroll(function () {
    // $currentPosition = getCurrentPosition();
    getCurrentPosition();
    console.log($currentPosition);

});


function getCurrentPosition() {
    // let positionNum;
    let scrollAmount = $(document).scrollTop();

    if (scrollAmount >= $position[4]) {
        // positionNum = 3;
        $currentPosition = 4;
    } else if (scrollAmount >= $position[3]) {
        // positionNum = 2;
        $currentPosition = 3;
    } else if (scrollAmount >= $position[2]) {
        // positionNum = 1;
        $currentPosition = 2;
    } else if (scrollAmount >= $position[1]) {
        // positionNum = 1;
        $currentPosition = 1;
    } else {
        // positionNum = 0;
        $currentPosition = 0;
    }

    // return positionNum;
}


// design swiper

 const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    slidesPerColumn: 3,
    slidesPerGroup :3,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    on: {
      init: function () {},
      orientationchange: function(){},
      beforeResize: function(){
        let vw = window.innerWidth;
        if(vw > 1000){
          mySwiper.params.slidesPerView = 3
            mySwiper.params.slidesPerColumn = 3
            mySwiper.params.slidesPerGroup = 3;
        } else {
          mySwiper.params.slidesPerView = 4
            mySwiper.params.slidesPerColumn = 2
            mySwiper.params.slidesPerGroup =4;
        }
        mySwiper.init();
      },
    },
});

// javascript 
