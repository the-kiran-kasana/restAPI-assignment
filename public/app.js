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
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        tasksDiv.appendChild(taskDiv);
    });
}


async function createTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (!title || !description) {
        alert('Title and Description are required!');
        return;
    }

    const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
        fetchTasks();
    } else {
        alert('Failed to create task');
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


document.addEventListener('DOMContentLoaded', fetchTasks);
