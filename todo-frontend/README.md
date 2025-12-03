# Todo List Frontend

A simple React.js frontend for the Todo List API.

## Features

- View all todos
- Filter todos by status (All, Active, Completed)
- Add new todos with optional due dates
- Mark todos as complete/incomplete
- Delete todos

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend is running on `http://localhost:3000`

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints Used

- `GET /todos` - Fetch all todos
- `GET /todos/active` - Fetch active todos
- `GET /todos/completed` - Fetch completed todos
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Technologies

- React 18
- Vite
- Vanilla CSS