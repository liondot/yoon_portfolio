'use-strict'

const menuList = document.querySelector('#menu_list')
const toggleBtn = document.querySelector('.toggle_btn');
const mainSection = document.querySelector('#section01')
const mainSectionHeight = mainSection.getBoundingClientRect().height;
const spanTxt = document.querySelector('.spanTxt');


const BODY = document.querySelector('body, html')
const BODYOffset = BODY.getBoundingClientRect()



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


navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;

    if(link == null) {
        return;
    }
    menuList.classList.remove('active')
    toggleBtn.classList.remove('active')
    const scrollInTo = document.querySelector(link);
    scrollInTo.scrollIntoView({behavior:"smooth"});
})

// arrow top 버튼 핸들링 
arrowTop.addEventListener('click', ()=> {
    scrollIntoView('#section01')
})

contactMe.addEventListener('click', ()=> {
    scrollIntoView('#contact_me')
})



// 모바일 토글 버튼

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}
