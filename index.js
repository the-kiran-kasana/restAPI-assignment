const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for tasks
let tasks = []; // Array to store task objects
let currentId = 1; // Variable to keep track of the next task ID

// GET /tasks: Retrieve a list of all tasks
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// GET /tasks/:id: Retrieve a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        res.status(200).json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// POST /tasks: Create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const newTask = {
        id: currentId++,
        title,
        description
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /tasks/:id: Update an existing task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description } = req.body;

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        tasks[taskIndex] = { id: taskId, title, description };
        res.status(200).json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// DELETE /tasks/:id: Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});













// const express = require('express');
// const app = express();
// const PORT = 3000;

// app.use(express.json());

// // In-memory storage for tasks
// let tasks = [];
// let currentId = 1;

// // GET /tasks: Retrieve a list of all tasks
// app.get('/tasks', (req, res) => {
//     res.status(200).json(tasks);
// });

// // GET /tasks/:id: Retrieve a specific task by ID
// app.get('/tasks/:id', (req, res) => {
//     const taskId = parseInt(req.params.id);
//     const task = tasks.find(t => t.id === taskId);

//     if (task) {
//         res.status(200).json(task);
//     } else {
//         res.status(404).json({ message: 'Task not found' });
//     }
// });

// // POST /tasks: Create a new task
// app.post('/tasks', (req, res) => {
//     const { title, description } = req.body;

//     if (!title || !description) {
//         return res.status(400).json({ message: 'Title and description are required' });
//     }

//     const newTask = {
//         id: currentId++,
//         title,
//         description
//     };

//     tasks.push(newTask);
//     res.status(201).json(newTask);
// });

// // PUT /tasks/:id: Update an existing task by ID
// app.put('/tasks/:id', (req, res) => {
//     const taskId = parseInt(req.params.id);
//     const { title, description } = req.body;

//     const taskIndex = tasks.findIndex(t => t.id === taskId);

//     if (taskIndex !== -1) {
//         if (!title || !description) {
//             return res.status(400).json({ message: 'Title and description are required' });
//         }

//         tasks[taskIndex] = { id: taskId, title, description };
//         res.status(200).json(tasks[taskIndex]);
//     } else {
//         res.status(404).json({ message: 'Task not found' });
//     }
// });

// // DELETE /tasks/:id: Delete a task by ID
// app.delete('/tasks/:id', (req, res) => {
//     const taskId = parseInt(req.params.id);

//     const taskIndex = tasks.findIndex(t => t.id === taskId);

//     if (taskIndex !== -1) {
//         tasks.splice(taskIndex, 1);
//         res.status(204).send();
//     } else {
//         res.status(404).json({ message: 'Task not found' });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
