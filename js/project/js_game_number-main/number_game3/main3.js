// 랜딩넘버
// 1~100사이 숫자 사용자가 입력 
// 랜딩넘버보다 사용자 숫자가 높을 경우 "down!!" notice 
// 랜딩넘버보다 사용자 수가 낮을 경우 "up!!" notice 
// 총 5번의 기회, 숫자 작성 할 때마다 1개씩 차감 
// 정답 못맞추고 5번의 기회 모두 사용할 경우 go btn disable 
// 같은 숫자를 작성할 경우 기회 차감 되지 않고 notice 
// 1~100사이가 아닌 숫자를 입력할 경우 notice 
// 정답일 경우 go btn disable 
// reset버튼 클릭시 go btn disable true, 남은 기회 디폴트 설정 

let computerNum = 0;
let inputNumber = document.querySelector("#input_number");
let resetBtn = document.getElementById('#reset_btn');
let playBtn = document.querySelector('#click_btn');

playBtn.addEventListener('click', play)

function play() {
  const inputValue = inputNumber.value;
  console.log(inputValue)
}


// function pickRandomNum() {
//   const computerNum = Math.floor(Math.random() * 100) + 1;
//   console.log("정답:",  computerNum)
// }

// pickRandomNum()
