let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let underLineTabs = document.querySelectorAll(".task-tabs div:nth-child(n+2)");
let mode = "all";
let taskList = [];
let filterList = [];

addButton.addEventListener("click", addTask);
underLineTabs.forEach((menu) =>
  menu.addEventListener("click", (e) => tabsIndicator(e))
);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  //   console.log("clicked");
  if (taskInput.value.trim() === "") {
    alert("할일을 입력해주세요");
    return;
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
  taskInput.value = "";
  taskInput.focus();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
            <div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div class="icon">
              <i onClick="toggleComplete('${list[i].id}')" class="fa-solid fa-thumbs-up fa-lg"></i>
              <i onClick="deleteTask('${list[i].id}')" class="fa-regular fa-trash-can fa-lg"></i>
            </div>
          </div>`;
    } else {
      resultHTML += `<div class="task">
     <div class="task-content">${list[i].taskContent}</div>
      <div class="icon">
        <i onClick="toggleComplete('${list[i].id}')" class="fa-regular fa-thumbs-up fa-lg"></i>
        <i onClick="deleteTask('${list[i].id}')" class="fa-regular fa-trash-can fa-lg"></i>
      </div>
    </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  mode = "all";
  render();
  //console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  mode = "all";
  render();
}

function filter(event) {
  console.log("filter", event.target);
  filterList = [];
  mode = event.target.id;
  tabsIndicator(event);
  if (mode === "all") {
    //전체 리스트를 보여준다.
    render();
  } else if (mode === "ongoing") {
    //진행중인 아이템을 보여준다.
    //task.isComplete=false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    //끝난 아이템을 보여준다.
    //task.isComplete=true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function tabsIndicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
