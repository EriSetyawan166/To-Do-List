function getTaskFromLocalStorage() {
    const taskJSON = localStorage.getItem('tasks');
    return taskJSON ? JSON.parse(taskJSON) : [];
}

function saveTaskFromLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((tasks, index) => {
         const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = tasks;

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('btn-group');

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-secondary', 'me-2');
        editButton.textContent = 'Edit';
        editButton.setAttribute('onclick', `editTask(${index})`);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('onclick', `deleteTask(${index})`);

        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);

        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('d-flex');
        buttonWrapper.appendChild(buttonGroup);

        li.appendChild(taskTextElement);
        li.appendChild(buttonWrapper);

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        tasks.push(taskText);
        saveTaskFromLocalStorage(tasks);
        renderTasks(tasks);
        taskInput.value = '';
    }
}

function editTask(index) {
    const newTaskText = prompt("Edit the ttask:", tasks[index]);

    if (newTaskText !== null) {
        tasks[index] = newTaskText.trim();
        saveTaskFromLocalStorage(tasks);
        renderTasks(tasks);
    }
}

function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTaskFromLocalStorage(tasks);
        renderTasks(tasks);
    }
}


const tasks = getTaskFromLocalStorage()
renderTasks(tasks);

const addTaskBtn = document.getElementById('addTaskBtn');
addTaskBtn.addEventListener('click', addTask);
