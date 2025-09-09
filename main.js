let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add");

addButton.addEventListener("click", addTask);

let taskList = [];

function addTask() {
  //   console.log("clicked");
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
            <div>${taskList[i]}</div>
            <div>
              <button>check</button>
              <button>Delete</button>
            </div>
          </div>`;
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}
