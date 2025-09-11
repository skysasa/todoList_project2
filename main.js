let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add");

addButton.addEventListener("click", addTask);

let taskList = [];

function addTask() {
  //   console.log("clicked");
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `
            <div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div class="icon">
              <i onClick="toggleComplete('${taskList[i].id}')" class="fa-solid fa-thumbs-up fa-lg"></i>
              <i onClick="deleteTask('${taskList[i].id}')" class="fa-regular fa-trash-can fa-lg"></i>
            </div>
          </div>`;
    } else {
      resultHTML += `<div class="task">
     <div class="task-content">${taskList[i].taskContent}</div>
      <div class="icon">
        <i onClick="toggleComplete('${taskList[i].id}')" class="fa-regular fa-thumbs-up fa-lg"></i>
        <i onClick="deleteTask('${taskList[i].id}')" class="fa-regular fa-trash-can fa-lg"></i>
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
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
