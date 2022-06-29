// 랜덤번호 지정 
// 사용자가 번호를 입력, 그리고 go라는 버튼을 클릭 
// 만약에 사용자가 랜덤번호를 맞출 경우 맞췄습니다라는 메세지 띄움
// 랜덤번호 < 사용자가 입력한 번호 => DOWN!!! 
// 랜덤번호 > 사용자 번호 => UP !!!
// RESET 버튼을 누르면 게임이 리셋된다. 
// 5번의 기회를 다쓰면 게임이 끝난다. (더이상 추측 불가, 버튼이 disable)
// 사용자가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다. 
// 사용자가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않느다. 

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chance = 5;
let gameOver = false;
let chanceArea = document.getElementById('chance-area');
let history = [];

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', function () {
  userInput.value = ""
})

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log('정답', computerNum)
}

function play() {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100사이의 값을 입력하시오!"
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 값입니다. 다른 숫자를 입력하시오!"
    return;
  }

  chance--;
  chanceArea.textContent = `남은기회: ${chance} 번`

  if (userValue < computerNum) {
    resultArea.textContent = "UP!!!"
  } else if (userValue > computerNum) {
    resultArea.textContent = "DOWN!!!"
  } else {
    resultArea.textContent = "정답입니다!!!"
    gameOver = true;
  }

  history.push(userValue)
  console.log(history)

  if (chance < 1) {
    playButtonDisabled()
  }

  if (gameOver == true) {
    // playButton.disabled = true;
    playButtonDisabled()
  }
}

function playButtonDisabled() {
  playButton.disabled = true
}

function reset() {
  playButton.disabled = false;

  // 사용자가 작성한 창이 리셋되고 
  userInput.value = ''
  // 새로운 정답이 생성되고 
  pickRandomNum();
  resultArea.textContent = "정답을 맞춰보세요.!!!"
 chance = 5
}


pickRandomNum()