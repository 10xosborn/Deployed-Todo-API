require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(express.json()); //For data In/Out
app.use(cors('*')) //Enable CORS for all origins

let todos = [
    //In-Memory Data: Array of Objects
    {
    id: 1,
    task: "Creating a Todo API",
    completed: false,
    dueDate: null
    }
];


//Basic route
app.get('/', (req, res) => {
    res.json({
        message: "Todo API is ready!",
        version: "1.0.0",
        endpoints: {
            tasks: "/api/todos"
        }
    });
});

//Todo API routes
app.get('/api/todos', (req, res) => {
    res.json({
        success: true,
        count: todos.length,
        data: todos
    });
});

//Get All Todos
app.get('/todos', (req, res) => {
    res.json({
        success: true,
        count: todos.length,
        data: todos
    });
});

//Get Todos by single ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todos) {
        res.status(404).json({
            sucess: false,
            message: `Todos with ID ${req.params.id} not found!`
        });
    }

    res,json({
        success: true,
        data: todo
    });
});

//Patch - Update todos
app.patch('/todos/:id', (req, res) => {
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({error: `Todos with ID ${req.params.id} not found!`});
    Object.assign(todo, req.body);
    res.status(200).json({
        sucess: true,
        message: "Todo updated successfully!",
        data: todo
    });
}); 

// Delete todos
app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1)
        return res.status(404).json({error: `Todo with ID ${req.params.id} not found!`});
    todos.splice(index, 1);
    res.status(204).send();
});

//Post - Create new todos
app.post('/todos', (req, res) => {
    //Validate todo creation will come here
    const {task, dueDate} = req.body;
    if (!task) return res.status(404).json({error: 'Task required'});
    const newTodo = {
    id: todos.length + 1,
    task: task,
    completed: false,
    dueDate: dueDate || null
    };
    todos.push(newTodo);

    res.status(201).json({
        success: true,
        message: 'Todos created successfully!',
        data: newTodo
    });
});


//404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

//Start server
app.listen(PORT, () => {
    console.log(`Server is runnning on http://localhost:${PORT}`);
    console.log(`API is live on http://localhost:${PORT}/api/todos`);
});