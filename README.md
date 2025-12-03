# Todo List API

A RESTful API for managing todos with MongoDB integration, built with Express.js.

## Features

- ✅ Create, read, update, and delete todos
- ✅ Filter completed todos
- ✅ Set due dates for tasks
- ✅ Request logging middleware
- ✅ Input validation
- ✅ CORS support
- ✅ Centralized error handling

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Middleware**: CORS, dotenv
- **Validation**: Custom validators

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Base URL
```
http://localhost:{PORT}
```
Replace `{PORT}` with the port specified in your `.env` file (default: 3000)

### 1. **GET /** - API Info
Returns API metadata.

**Response:**
```json
{
  "message": "Todo API is ready!",
  "version": "1.0.0",
  "endpoints": {
    "tasks": "/todos"
  }
}
```

### 2. **GET /todos** - Get All Todos
Retrieves all todos from the database.

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "task": "Buy groceries",
      "dueDate": "2024-01-15",
      "completed": false
    }
  ]
}
```

### 3. **GET /todos/completed** - Get Completed Todos
Retrieves only completed todos.

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

### 4. **GET /todos/:id** - Get Single Todo
Retrieves a specific todo by ID.

**Parameters:**
- `id` (string): MongoDB ObjectId

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "task": "Buy groceries",
    "dueDate": "2024-01-15",
    "completed": false
  }
}
```

**Response (Not Found):**
```json
{
  "success": false,
  "message": "Todo with ID xxx not found!"
}
```

### 5. **POST /todos** - Create New Todo
Creates a new todo item.

**Request Body:**
```json
{
  "task": "Buy groceries",
  "dueDate": "2024-01-15"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Todo created successfully!",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "task": "Buy groceries",
    "dueDate": "2024-01-15",
    "completed": false
  }
}
```

### 6. **PATCH /todos/:id** - Update Todo
Updates an existing todo.

**Request Body:**
```json
{
  "task": "Buy groceries and vegetables",
  "completed": true,
  "dueDate": "2024-01-20"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Todo updated successfully!",
  "data": {...}
}
```

### 7. **DELETE /todos/:id** - Delete Todo
Deletes a todo item.

**Response:**
```
204 No Content
```

## Middleware

- **Logger**: Logs all incoming requests
- **Validator (POST)**: Validates todo creation requests
- **Validator (PATCH)**: Validates todo update requests
- **Error Handler**: Centralized error handling

## Error Handling

The API uses centralized error handling. All errors return a standardized format with appropriate HTTP status codes.

## Example Usage

### Create a Todo
```bash
curl -X POST http://localhost:$PORT/todos \
  -H "Content-Type: application/json" \
  -d '{"task": "Complete project", "dueDate": "2024-01-20"}'
```

### Get All Todos
```bash
curl http://localhost:$PORT/todos
```

### Update a Todo
```bash
curl -X PATCH http://localhost:$PORT/todos/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete a Todo
```bash
curl -X DELETE http://localhost:$PORT/todos/507f1f77bcf86cd799439011
```

## Project Structure

```
.
├── app.js
├── middlewares/
│   ├── logger.js
│   ├── validator_post.js
│   ├── validator_patch.js
│   └── errorHandler.js
├── models/
│   └── todo_model.js
├── database/
│   └── todo_db.js
├── .env
└── package.json
```

## License

MIT
