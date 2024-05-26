
async function fetchTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    const tasksDiv = document.getElementById('tasks');
    tasksDiv.innerHTML = '';
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        tasksDiv.appendChild(taskDiv);
    });
}

async function createOrUpdateTask() {
    const id = document.getElementById('taskId').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (!title || !description) {
        alert('Title and Description are required!');
        return;
    }

    const task = { title, description };
    let method = 'POST';
    let url = '/tasks';

    if (id) {
        method = 'PUT';
        url = `/tasks/${id}`;
    }

    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    if (response.ok) {
        clearForm();
        fetchTasks();
    } else {
        alert('Failed to save task');
    }
}

async function editTask(id) {
    const response = await fetch(`/tasks/${id}`);
    if (response.ok) {
        const task = await response.json();
        document.getElementById('taskId').value = task.id;
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;
    } else {
        alert('Failed to fetch task');
    }
}

async function deleteTask(id) {
    const response = await fetch(`/tasks/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        fetchTasks();
    } else {
        alert('Failed to delete task');
    }
}

function clearForm() {
    document.getElementById('taskId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

document.addEventListener('DOMContentLoaded', fetchTasks);












