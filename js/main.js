'use-strict'

const menuList = document.querySelector('#menu_list')
const mainSection = document.querySelector('#section01')
const mainSectionHeight = mainSection.getBoundingClientRect().height;
const spanTxt = document.querySelector('.spanTxt');


const BODY = document.querySelector('body, html')
const BODYOffset = BODY.getBoundingClientRect()




// 토글 버튼 
// function toggle() {
//     toggleBtn.classList.toggle('active')
//     menuList.classList.toggle('active')
// }

document.addEventListener('scroll', () => {
    if(window.scrollY > mainSectionHeight / 2) {
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

// loading 
window.addEventListener('load', () => {
    document.body.classList.remove('before_loading');
})

document.querySelector('.progress').addEventListener('transitionend', (e) => {
    document.body.removeChild(e.currentTarget);
})



// $(window).scroll(function () {
//     getCurrentPosition();
// });


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

    if(link == null) {
        return;
    }
    // menuList.classList.remove('active')
    // toggleBtn.classList.remove('active')
    const scrollInTo = document.querySelector(link);
    scrollInTo.scrollIntoView({behavior:"smooth"});
})

// arrow top 버튼 핸들링 
arrowTop.addEventListener('click', ()=> {
    scrollIntoView('#section01')
})




// 모바일 토글 버튼

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}
