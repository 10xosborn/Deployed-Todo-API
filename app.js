require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const {logRequest} = require("./middlewares/logger");
const { validatePostTodo } = require("./middlewares/validator_post");
const { validatePatchTodo } = require("./middlewares/validator_patch");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(logRequest); //Custom Logger Middleware
const PORT = process.env.PORT || 3000;

app.use(express.json()); //For data In/Out

const corsOptions = {
    origin: 'http://localhost:5173', //Allow only this origin to access the API
    optionsSuccessStatus: 200 //For legacy browser support
};
app.use(cors(corsOptions));

//In-Memory Data: Array of Objects
let todos = [
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

// Get Todos by Status
app.get('/todos/active', (req, res, next) => {
    try {
        const activeTodos = todos.filter((t) => t.completed === false);
        res.json({
            success: true,
            count: activeTodos.length,
            data: activeTodos
        });
    } catch (error) {
       next(error); 
    }
});

app.get('/todos/completed', (req, res, next) => {
    try {
        const completedTodos = todos.filter((t) => t.completed === true);
        res.json({
            success: true,
            count: completedTodos.length,
            data: completedTodos
        });
    } catch (error) {
        next(error);
    }
});

// Get Todos by single ID 
app.get('/todos/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            throw new Error('Invalid ID format' );
        }

        const todo = todos.find((t) => t.id === id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: `Todo with ID ${id} not found!`
            });
        }

        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (error) {
        next(error);
    }
});

//Post - Create new todos (use 400 for bad request, consistent keys)
app.post('/todos', validatePostTodo, (req, res, next) => {
    try {
        const {task, dueDate} = req.body;
        if (!task) return res.status(400).json({success: false, error: 'Task required'});
        const newTodo = {
        id: todos.length + 1,
        task: task,
        completed: false,
        dueDate: dueDate || null
    };
    todos.push(newTodo);

    res.status(201).json({
        success: true,
        message: 'Todo created successfully!',
        data: newTodo
    });
    } catch (error) {
        next(error);
    };
});

//Patch - Update todos
app.patch('/todos/:id', validatePatchTodo, (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) throw new Error('Invalid ID format');

        const todo = todos.find((t) => t.id === id);
        if (!todo) return res.status(404).json({success: false, error: `Todo with ID ${id} not found!`});

        const { id: _ignoreId, ...updates } = req.body; // prevent id change
        Object.assign(todo, updates);
        res.status(200).json({
            success: true,
            message: "Todo updated successfully!",
            data: todo
    });
    } catch (error) {
       next(error); 
    }
}); 

// Delete todos
app.delete('/todos/:id', (req, res, next) => {
    try {
        const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
        if (index === -1)
        return res.status(404).json({error: `Todo with ID ${req.params.id} not found!`});
        todos.splice(index, 1);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});


//404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use(errorHandler);

//Start server
app.listen(PORT, () => {
    console.log(`Server is runnning on http://localhost:${PORT}`);
    console.log(`API is live on http://localhost:${PORT}/api/todos`);
});