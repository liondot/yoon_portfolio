// 랜덤번호 지정
// 유저가 랜덤 번호를 입력한다. 그리고 go라는 버튼 누름 
// 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다 
// 랜덤번호 < 유저번호 down!!!이라고 노티스
// 랜덤번호 > 유저번호 up!!이라고 노티스
// reset버튼을 누르면 게임이 리셋된다. 
// 5번의 기회를 다쓰면 게임이 끝난다(더이상 추측 불가. 버튼이 disable)
// 유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다. 
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깍지 않는다. 
// 유저가 숫자를 맞출 경우 GO 버튼 disable 

// 1 랜덤번호 지정 
let computerNum = 0
// 2 유저가 랜덤 번호를 입력한다. 그리고 go라는 버튼 누름 
let playButton = document.getElementById('play-button')
let userInput = document.getElementById('user-input')
let resultArea = document.querySelector('.result')
let resultTxt = document.querySelector('.result-text')
let resetBtn = document.getElementById('reset-button')
let chanceArea = document.querySelector('.chance-area')
let imgArea = document.querySelector('.img_area')
let resultView = document.getElementById('result_view')
let chance = 5;
let gameOver = false;
let history = [];



playButton.addEventListener('click', add);
resetBtn.addEventListener('click', reset);
userInput.addEventListener('focus', function(){
  userInput.value = ''
})

resultView.addEventListener('click', ()=> {
  resultView.textContent = `정답 : ${computerNum}`
})

chanceArea.innerHTML = `남은 기회 : ${chance}`;


function pickRandomNum() {
  computerNum = Math.floor(Math.random() *100) + 1;
  console.log("정답", computerNum)
}

pickRandomNum()

// 2 유저가 랜덤 번호를 입력한다. 그리고 go라는 버튼 누름 
function add() {
  let userValue = userInput.value;
  if(userValue > 100 || userValue < 0) {
    resultArea.textContent = "1~100사이의 숫자를 입력하시오!"
    return
  }

  if(history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요"
    return
   }

  chance --;
  chanceArea.textContent = `남은기회: ${chance}번`
  console.log( "chance", chance)

  if(userValue == computerNum) {
    imgArea.src = "https://i.pinimg.com/originals/bb/96/75/bb96754ec4caec9717822460c6762cb5.gif"
    resultArea.textContent = "맞췄습니다."
    // gameOver == true;
    playButton.disabled = true

  } else if (userValue > computerNum) {
    imgArea.src = "https://i.pinimg.com/originals/13/12/9e/13129ef527ef324c8ce8ea112e81b46c.gif"
    resultArea.textContent = "DOWN!!!."

  } else {
    imgArea.src = "https://i.pinimg.com/originals/6f/e1/64/6fe16492d54dfb97b36216c4c39d5bea.gif"
    resultArea.textContent = "UP!!!."
  }

  history.push(userValue);

  if(chance < 1) {
    gameOver = true;
  }
  if(gameOver == true) {
    playButton.disabled = true;
  }

}


function reset() {
  // 1. 리셋버튼을 누르면 input창이 비어짐, 
  userInput.value = ''
  // 2. 랜덤 번호가 새로 생성됨 
  pickRandomNum()

  resultArea.textContent = "1에서 100사이의 숫자를 입력하시오."
  gameOver = false;
  playButton.disabled = false;
  chance = 5;
  chanceArea.innerHTML = `남은기회: ${chance}번`
  userValue = [];
}
