const addTasks = document.querySelector('.add-items');
const taskSection = document.querySelector(".tasks");
const taskList = JSON.parse(localStorage.getItem('todos')) || [];

const addTask = e => {
  e.preventDefault();
  const task = {
    description: document.querySelector('[name=item]').value,
    done: false,
    id: taskList.length,
  }
  taskList.push(task);
  displayTask(taskList);
  localStorage.setItem('todos', JSON.stringify(taskList));
}

const displayTask = (taskList) => {
  taskSection.innerHTML = "";
  for (let i = 0; i < taskList.length; i += 1) {
    taskSection.innerHTML += `
    <li>
      <input type="checkbox" data-index=${i} id="item${i}" ${
      taskList[i].done ? "checked" : ""
    } />
          <label for="item${i}">${taskList[i].description}</label>
          <span class="material-icons delete-activity" data="${taskList[i].id}">
            delete
          </span>
        </li>
        `;
  }
};

addTasks.addEventListener("submit", addTask);
displayTask(taskList);