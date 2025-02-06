

# 📝 Task Management API

A simple **Task Management API** built with **Node.js** and **Express**. This API allows you to manage your tasks easily with features like adding, editing, and deleting tasks! 🚀

## 📦 Features

- **GET /getTasks**: Fetch all tasks 📋
- **POST /addTasks**: Add a new task ✨
- **PATCH /editTask/:id**: Edit a task by its ID ✍️
- **DELETE /deleteTask/:id**: Delete a task 🗑️

Tasks are saved in a `data.json` file. 💾

## 🚀 Getting Started

### Prerequisites

You’ll need **Node.js** and **npm** installed on your machine. 🖥️

1. Clone the repository:
   ```bash
   git clone https://github.com/shashank8565/SimpleTodoAPI.git
   ```

2. Go into the project folder:
   ```bash
   cd SimpleTodoAPI
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### 🏃‍♂️ Running the App

To start the server locally:
```bash
npm start
```

The server will be available at `http://localhost:3000`. 🎉

## 💻 API Endpoints

### 1. **GET /getTasks** 🧑‍💻

Fetch all tasks stored in the `data.json` file.

#### Example:
```http
GET http://localhost:3000/getTasks
```

#### Response:
```json
[
  { "id": 1, "task": "Complete JavaScript tutorial" },
  { "id": 2, "task": "Review pull requests on GitHub" },
  ...
]
```

### 2. **POST /addTasks** ➕ 

Add a new task to your task list!

#### Example:
```http
POST http://localhost:3000/addTasks
```

#### Request Body:
```json
{
  "id": 11,
  "task": "Learn about Express.js middleware"
}
```

#### Response:
```json
{
  "message": "Data saved successfully"
}
```

### 3. **PATCH /editTask/:id** ✏️

Edit an existing task by its `id`.

#### Example:
```http
PATCH http://localhost:3000/editTask/2
```

#### Request Body:
```json
{
  "task": "Review pull requests on GitHub and create issues"
}
```

#### Response:
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 2,
    "task": "Review pull requests on GitHub and create issues"
  }
}
```

### 4. **DELETE /deleteTask/:id** 🗑️

Delete a task by its `id`.

#### Example:
```http
DELETE http://localhost:3000/deleteTask/3
```

#### Response:
```json
{
  "message": "Task deleted successfully"
}
```

## 💡 Data Structure

Tasks are stored in the `data.json` file like this:

```json
[
  { "id": 1, "task": "Complete JavaScript tutorial" },
  { "id": 2, "task": "Review pull requests on GitHub" },
  ...
]
```

## 🚧 Error Handling

- If a task is not found while editing or deleting, you'll get a `404` error: `Task not found`.
- If there's a problem reading or writing the `data.json` file, a `500` error will be returned.

