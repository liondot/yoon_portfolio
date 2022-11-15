// 1. 랜덤 번호 지정 
// 2. 입력된 번호, 그리고 go라는 버튼 누름 
// 3. 번호를 맞추면 "맞췄습니다."노티스 
// 4. 랜덤번호 < 유저번호 "down!" 노티스 
// 5. 랜덤번호 > 유저본호 "up!" 노티스 
// 6. 유저가 1~100범위 밖에 숫자 입력시 노티스, chance는 줄어들지 않음 
// 7. 유저가 이미 입력한 숫자 입력하면 노티스, chance줄어들지 않음 
// 8. 유저가 숫자를 맞출 경우 go 버튼 disable 


let computerNum = 0;
let userInput = document.getElementById('user_input');
let playBtn = document.getElementById('play_button');
let resultArea = document.querySelector('.result_area');
let chanceArea = document.querySelector('.chance_area');
let imageArea = document.querySelector('.image_area');
let noticeArea = document.querySelector('.notice_area');
let resetBtn = document.querySelector('#reset_button');
let resultView = document.querySelector('#result_view');


let chance = 5;
let gameOver = false;
let history = [];


userInput.addEventListener('focus', function () {
  userInput.value = ''
})

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum)
}

pickRandomNum()

chanceArea.innerHTML = `남은 기회 :  ${ chance}`;

function add() {
  let userValue = userInput.value;
  if (userValue > 100 || userValue < 0) {
    resultArea.textContent = "1~100사이의 숫자를 입력하시오!"
    return
  }
  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요!"
    return
  }

  chance--;
  chanceArea.textContent = `남은 기회: ${chance}번`
  console.log("chance", chance)

  if (userValue == computerNum) {
    imageArea.src = "https://i.pinimg.com/originals/bb/96/75/bb96754ec4caec9717822460c6762cb5.gif"
    noticeArea.textContent = "축하합니다!!! 정답입니다~!"
    resultArea.textContent = ""

  } else if (userValue > computerNum) {
    imageArea.src = "https://media2.giphy.com/media/Dgt282fuOmSnC/giphy.gif?cid=ecf05e47v824hhtpq8v03hiqmz5mlanzmxj2rn5fqjca6zsk&rid=giphy.gif&ct=g"
    resultArea.textContent = "DOWN!!!"
  } else {
    imageArea.src = "https://i.pinimg.com/originals/6f/e1/64/6fe16492d54dfb97b36216c4c39d5bea.gif"
    resultArea.textContent = "UP!!!"
  }

  history.push(userValue);

  if (chance < 1) {
    gameOver = true;
  }
  if (gameOver == true) {
    playBtn.disabled = true;
  }
}

function reset() {
  userInput.value = '';

  pickRandomNum()

  gameOver = false;
  playBtn.disabled = false;
  chance = 5;
  chanceArea.innerHTML = `남은 기회 : ${chance} 번`;

}



playBtn.addEventListener('click', add);
resetBtn.addEventListener('click', reset);
resultView.addEventListener('click', () => {
  resultView.textContent = `${computerNum}`
})