const form = document.querySelector('.add-items');
const taskSection = document.querySelector(".tasks");
let taskList = JSON.parse(localStorage.getItem('todos')) || [];
const deleteBtn = document.querySelectorAll(".delete-activity");
const clearButton = document.querySelector(".clear-btn");

const addTask = e => {
  e.preventDefault();
  const task = {
    description: document.querySelector('[name=item]').value,
    done: false,
    id: taskList.length
  }
  taskList.push(task);
  displayTask(taskList);
  localStorage.setItem('todos', JSON.stringify(taskList));
  e.target.reset();
}

const displayTask = (taskList) => {
  taskSection.innerHTML = "";
  for (let i = 0; i < taskList.length; i += 1) {
    taskSection.innerHTML += `
    <li>
      <input class="checkbox" type="checkbox" data-index=${i} id="item${i}" ${
      taskList[i].done ? "checked" : ""
    } />
          <label for="item${i}">${taskList[i].description}</label>
          <span class="material-icons delete-activity" data-index="${taskList[i].id}">
            delete
          </span>
        </li>
        `;
  }
};

const removeTask = e => {
  if (e.target.classList.contains("delete-activity")) {
    taskList.splice(e.target.parentElement, 1);
    displayTask(taskList);
    localStorage.setItem("todos", JSON.stringify(taskList));
  }
}
const clearCompleted = () => {
  taskList = taskList.filter(task => task.done === false);
  displayTask(taskList)
  localStorage.setItem('todos', JSON.stringify(taskList))
}
const toggleDone = (e) => {
  if (!e.target.matches("input")) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  taskList[index].done = !taskList[index].done;
  localStorage.setItem("todos", JSON.stringify(taskList));
  displayTask(taskList);
}
taskSection.addEventListener('click', removeTask)
taskSection.addEventListener("click", toggleDone);
clearButton.addEventListener("click", clearCompleted);
form.addEventListener("submit", addTask);
displayTask(taskList);
