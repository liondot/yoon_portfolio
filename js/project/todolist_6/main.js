// 1. 유저가 값을 입력 
// +버튼을 클릭하면 할일이 추가 된다. 
// delete버튼을 누르면 할일이 사라진다. 
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다. 
// 1. check버튼을 클릭하는 순간 true false 
// 2. true면 완료된걸로 간주하고 밑줄 
// 3. false면 안끝난걸로 간주하고 그대로 
// 진행중 끝남 탭을 누르면 바가 이동한다. 
// 끝난탭은, 끝난 아이템만 진행중텝은 진행중인 아이템만 나온다. 
// 전체탭을 누르면 다시 전체아이템으로 돌아옴 

let taskInput = document.getElementById("task_input");
let addBtn = document.getElementById("add_btn")
let taskList = []
let tabs = document.querySelectorAll(".task_tabs div");
let mode = 'all'
let filterList = []

addBtn.addEventListener("click", addTask);

function addTask() {
  let task = {
    taskContent: taskInput.value,
    isComplete: false,
    id: rendomIDGenerate()
  }
  taskList.push(task)
  render()
}

function render() {
  let list = []
  if(mode == "all") {
    list = taskList
  } else if ( mode == "ongoing" || mode == "done"){
    list = filterList
  }
  let resultHTML = ''
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
    <div class="task">
      <div class="task_done">${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">Check</button>
        <button onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>
    `
    } else {
      resultHTML += `
      <div class="task">
         <div>${list[i].taskContent}</div>
         <div>
           <button onclick="toggleComplete('${list[i].id}')">Check</button>
           <button onclick="deleteTask('${list[i].id}')">Delete</button>
         </div>
       </div>`
    }
  }
  document.getElementById("task_board").innerHTML = resultHTML
}


for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event)
  });
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode == "all") {
    render()
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i])
      }
    }
  }
  else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i])
      }
    }
  }
  render()

}


function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render()
  console.log(taskList)
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render()
}

function rendomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}