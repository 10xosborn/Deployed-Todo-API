# Todo API

A simple RESTful API for managing todos built with Express.js. Features in-memory storage for quick prototyping and testing.

## Features

- ✅ Create, read, update, and delete todos
- ✅ In-memory data storage
- ✅ CORS enabled
- ✅ RESTful API design
- ✅ JSON responses

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory:

```
PORT=3000
```

## Usage

Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info and available endpoints |
| GET | `/todos` | Get all todos |
| GET | `/api/todos` | Get all todos (alternative) |
| GET | `/todos/:id` | Get a specific todo by ID |
| POST | `/todos` | Create a new todo |
| PATCH | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

## Request Examples

### Create a Todo
```bash
POST /todos
Content-Type: application/json

{
  "task": "Learn Express.js",
  "dueDate": "2025-12-31"
}
```

### Update a Todo
```bash
PATCH /todos/1
Content-Type: application/json

{
  "completed": true
}
```

## Response Format

Success response:
```json
{
  "success": true,
  "data": {...}
}
```

Error response:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Tech Stack

- Node.js
- Express.js
- CORS
- dotenv

## License

<<<<<<< HEAD
MIT
=======
MIT
>>>>>>> b72fa76 (Added Validation for URL requests)
