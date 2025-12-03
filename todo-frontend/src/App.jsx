import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch todos
    const fetchTodos = async () => {
        setLoading(true);
        setError('');
        try {
            let url = `${API_URL}/todos`;
            if (filter === 'active') url = `${API_URL}/todos/active`;
            if (filter === 'completed') url = `${API_URL}/todos/completed`;

            const response = await fetch(url);
            const result = await response.json();

            if (result.success) {
                setTodos(result.data);
            }
        } catch (err) {
            setError('Failed to fetch todos. Make sure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Add new todo
    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const response = await fetch(`${API_URL}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    task: newTask,
                    completed: false,
                    dueDate: dueDate ? dueDate : null,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setNewTask('');
                setDueDate('');
                fetchTodos();
            } else {
                setError(result.error || 'Failed to add todo');
                console.error('Backend error:', result);
            }
        } catch (err) {
            setError('Failed to add todo. Make sure the backend is running.');
            console.error(err);
        }
    };

    // Toggle todo completion
    const toggleTodo = async (id, completed) => {
        try {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !completed }),
            });

            const result = await response.json();

            if (result.success) {
                fetchTodos();
            }
        } catch (err) {
            setError('Failed to update todo');
            console.error(err);
        }
    };

    // Delete todo
    const deleteTodo = async (id) => {
        try {
            await fetch(`${API_URL}/todos/${id}`, {
                method: 'DELETE',
            });
            fetchTodos();
        } catch (err) {
            setError('Failed to delete todo');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [filter]);

    return (
        <div className="app">
            <h1>Todo List</h1>

            {error && <div className="error">{error}</div>}

            <form onSubmit={addTodo} className="add-todo-form">
                <input
                    type="text"
                    placeholder="Enter a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="task-input"
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="date-input"
                />
                <button type="submit" className="add-button">Add Todo</button>
            </form>

            <div className="filter-buttons">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={filter === 'active' ? 'active' : ''}
                    onClick={() => setFilter('active')}
                >
                    Active
                </button>
                <button
                    className={filter === 'completed' ? 'active' : ''}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
            </div>

            {loading ? (
                <p className="loading">Loading...</p>
            ) : (
                <div className="todo-list">
                    {todos.length === 0 ? (
                        <p className="no-todos">No todos found</p>
                    ) : (
                        todos.map((todo) => (
                            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id, todo.completed)}
                                />
                                <div className="todo-content">
                                    <span className="task">{todo.task}</span>
                                    {todo.dueDate && (
                                        <span className="due-date">Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                                    )}
                                </div>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}

            <div className="stats">
                <p>Total: {todos.length} {todos.length === 1 ? 'task' : 'tasks'}</p>
            </div>
        </div>
    )
}

export default App
