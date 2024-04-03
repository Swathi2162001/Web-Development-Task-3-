document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const li = document.createElement('li');
            li.classList.add('task');
            if (task.completed) {
                li.classList.add('completed');
            }
            const taskNameSpan = document.createElement('span');
            taskNameSpan.textContent = task.name;
            li.appendChild(taskNameSpan);

            const prioritySpan = document.createElement('span');
            prioritySpan.textContent = '(' + task.priority + ')';
            prioritySpan.classList.add('priority-' + task.priority);
            li.appendChild(prioritySpan);

            const statusBtn = document.createElement('button');
            statusBtn.textContent = task.completed ? 'Pending' : 'Complete';
            statusBtn.addEventListener('click', function () {
                toggleTaskStatus(index);
            });
            li.appendChild(statusBtn);

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', function () {
                editTask(index);
            });
            li.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function () {
                deleteTask(index);
            });
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask() {
        const taskName = taskInput.value.trim();
        const priority = prioritySelect.value;
        if (taskName !== '') {
            tasks.push({ name: taskName, priority: priority, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function toggleTaskStatus(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    function editTask(index) {
        const newName = prompt('Enter new task name:');
        if (newName !== null) {
            tasks[index].name = newName;
            renderTasks();
        }
    }

    addTaskBtn.addEventListener('click', addTask);

    renderTasks();
});