const form = document.querySelector('.add-items');
const taskSection = document.querySelector(".tasks");
const taskList = JSON.parse(localStorage.getItem('todos')) || [];
const deleteBtn = document.querySelectorAll(".delete-activity");

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
  e.target.reset();
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

taskSection.addEventListener('click', (e) => {
  if (e.target.classList.contains("delete-activity")) {
    taskList.splice(e.target.parentElement, 1);
    displayTask(taskList);
    localStorage.setItem("todos", JSON.stringify(taskList));
  }
})




form.addEventListener("submit", addTask);



// deleteTask();
displayTask(taskList);