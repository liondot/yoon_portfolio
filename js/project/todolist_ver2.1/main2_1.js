// 유자가 쇼핑리스트를 작성한다. 
// 플러스 버튼을 누르면 item창에 쇼핑 리스트가 생성된다. 
// 쇼핑 리스트는 text와 delete버튼, divider line이 생성 된다. 
// delete버튼을 클릭하면 list가 삭제된다. 

let footerInput = document.querySelector(".footer__input");
let footerBtn = document.querySelector(".footer__button");
let itemName = document.querySelector('.item__name')
let itemList = [];


footerBtn.addEventListener("click", addList);

function addList(){
  let inputValue = footerInput.value;
   itemAdd = {
     id : randomIDGenerate(),
     itemContents: inputValue
   }
  itemList.push(itemAdd)
  console.log(itemList)
  render();
}

function render() {
  let resultHTML = '';
  for(let i = 0; i<itemList.length; i++) {
    resultHTML += `
    <li class="item__row">
    <div class="item">
      <span class="item__name">${itemList[i].itemContents}</span>
      <button onclick="deleteBtn('${itemList[i].id}')" class="item_delete"><i class="fa-solid fa-trash-can"></i></button>
    </div>
    <div class="divider"></div>
  </li>
    `
  }

  document.querySelector('.items').innerHTML = resultHTML;
}

function deleteBtn(id) {
  console.log('삭제:', id);
  for(let i = 0; i<itemList.length; i++) {
    if(itemList[i].id == id ) {
      itemList.splice(i, 1)
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36). substr(2,9);
}