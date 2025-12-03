# Todo List - Setup Guide

## Project Structure

```
Todo List API/
├── app.js                    # Backend API (Express.js)
├── middlewares/              # Backend middleware files
└── todo-frontend/            # React Frontend (separate folder)
    ├── src/
    │   ├── App.jsx          # Main React component
    │   ├── App.css          # Component styles
    │   ├── main.jsx         # React entry point
    │   └── index.css        # Global styles
    ├── index.html           # HTML template
    ├── package.json         # Dependencies
    └── vite.config.js       # Vite configuration
```

## How to Run

### 1. Start the Backend (Terminal 1)

```bash
cd "c:\Users\10xosborn\CS\Java Script\BeTechified Backend Dev\Week 4\Todo List API"
node app.js
```

The backend will run on `http://localhost:3000`

### 2. Start the Frontend (Terminal 2)

```bash
cd "c:\Users\10xosborn\CS\Java Script\BeTechified Backend Dev\Week 4\Todo List API\todo-frontend"
npm run dev
```

The frontend will run on `http://localhost:5173`

### 3. Open Your Browser

Navigate to `http://localhost:5173` to use the Todo List application.

## Features Implemented

✅ **View Todos** - Display all todos from the backend
✅ **Add Todo** - Create new todos with task name and optional due date
✅ **Toggle Complete** - Mark todos as complete/incomplete
✅ **Delete Todo** - Remove todos from the list
✅ **Filter Todos** - Filter by All, Active, or Completed status
✅ **Error Handling** - Display error messages when backend is unavailable
✅ **Loading States** - Show loading indicator while fetching data

## API Integration

The frontend connects to these backend endpoints:

- `GET /todos` - Fetch all todos
- `GET /todos/active` - Fetch active todos only
- `GET /todos/completed` - Fetch completed todos only
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update todo (toggle completion)
- `DELETE /todos/:id` - Delete a todo

## Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Vanilla CSS** - Styling

### Backend (Existing)
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Custom middleware** - Logging, validation, error handling

## Notes

- The backend CORS is already configured to allow requests from `http://localhost:5173`
- Make sure both servers are running simultaneously
- The frontend will show an error message if it can't connect to the backend
