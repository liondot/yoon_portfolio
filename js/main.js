'use-strict'

const menuList = document.querySelector('#menu_list')
// const toggleBtn = document.querySelector('.toggle_btn');
const mainSection = document.querySelector('#section01')
const mainSectionHeight = mainSection.getBoundingClientRect().height;
const spanTxt = document.querySelector('.spanTxt');


const BODY = document.querySelector('body, html')
const BODYOffset = BODY.getBoundingClientRect()



// toggleBtn.addEventListener('click', toggle);

// 토글 버튼 
function toggle() {
    toggleBtn.classList.toggle('active')
    menuList.classList.toggle('active')
}

document.addEventListener('scroll', () => {
    if (window.scrollY > mainSectionHeight / 2) {
        menuList.classList.add('visible');
    } else {
        menuList.classList.remove('visible');
    }
})


// top btn 
const topBtn = document.querySelector('.arrow_top');

topBtn.addEventListener('click', goToTop);

function goToTop() {
    window.scrollTo(0, 0);
}


// var s = skrollr.init();
// let $root = $('html, body');
// let $position = [0, 1000, 2000, 3000, 4000, 5000, 6000,];
// let $currentPosition = 0;



$(window).scroll(function () {
    getCurrentPosition();
});


function getCurrentPosition() {
    // let positionNum;
    let scrollAmount = $(document).scrollTop();

}

// Navbar toggle btn 

// 스크롤링 핸들 
const arrowTop = document.querySelector('.arrow_top');
const contactMe = document.querySelector('.contact_me');
const navbarMenu = document.querySelector('.navbar');
const menuItems = document.querySelector('.menu_items')

console.log(menuItems)

menuItems.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if (link == null) {
        return;
    }
    // menuList.classList.remove('active')
    // toggleBtn.classList.remove('active')
    const scrollInTo = document.querySelector(link);
    scrollInTo.scrollIntoView({
        behavior: "smooth"
    });
})

// arrow top 버튼 핸들링 
arrowTop.addEventListener('click', () => {
    scrollIntoView('#section01')
})




// 모바일 토글 버튼

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({
        behavior: 'smooth'
    });
}


// 텍스트 나오기 

let yOffset = 0; //pageYOffset대신 쓸 변수
let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 높이 값
let currentScene = 0; //현재 활성화된 (눈 앞에 보고 있는 )씬(scroll-section)

const scenInfo = [{
        //0
        type: 'sticky',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
            container: document.querySelector('.section_box')
        }
    },
    {
        //1
        type: 'sticky',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
            container: document.querySelector('.section_box')
        }
    },
    {
        //2
        type: 'sticky',
        heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
            container: document.querySelector('.section_box')
        }
    },
]

function setLayout() {
    
}

function scrollLoop() {
    
}

window.addEventListener('resize', setLayout);
window.addEventListener('scroll', ()=>{
    yOffset = window.pageYOffset;
    scrollLoop();
});
setLayout();