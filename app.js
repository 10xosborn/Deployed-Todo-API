require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const { logRequest } = require("./middlewares/logger");
const { validatePostTodo } = require("./middlewares/validator_post");
const { validatePatchTodo } = require("./middlewares/validator_patch");
const { errorHandler } = require("./middlewares/errorHandler");
const Todo = require("./models/todo_model");
const connectDB = require("./database/todo_db");

app.use(logRequest); //Custom Logger Middleware

app.use(express.json()); //Body Parser
app.use(cors('*')); //CORS Middleware

//Basic route
app.get('/', (req, res) => {
    res.json({
        message: "Todo API is ready!",
        version: "1.0.0",
        endpoints: {
            tasks: "/todos"
        }
    });
});

//Get All Todos
app.get('/todos', async (req, res, next) => {
    try {
        const todos = await Todo.find({});
        res.json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (error) {
        next(error);
    }
});

// Get Completed Todos
app.get('/todos/completed', async (req, res, next) => {
    try {
        const completedTodos = await Todo.find({ completed: true });
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
app.get('/todos/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: `Todo with ID ${req.params.id} not found!`
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

//Post - Create new todos
app.post('/todos', validatePostTodo, async (req, res, next) => {
    try {
        const { task, dueDate } = req.body;
        const newTodo = new Todo({
            task,
            dueDate: dueDate || null
        });
        await newTodo.save();
        res.status(201).json({
            success: true,
            message: 'Todo created successfully!',
            data: newTodo
        });
    } catch (error) {
        next(error);
    }
});

//Patch - Update todos
app.patch('/todos/:id', validatePatchTodo, async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!todo) {
            return res.status(404).json({
                success: false,
                error: `Todo with ID ${req.params.id} not found!`
            });
        }
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
app.delete('/todos/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({
                success: false,
                error: `Todo with ID ${req.params.id} not found!`
            });
        }
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

const PORT = process.env.PORT || 3000;

// Start server with async initialization
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();