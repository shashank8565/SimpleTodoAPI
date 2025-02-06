const express = require("express");
const data = require("./data.json");
const fs = require("fs");
const { json } = require("body-parser");

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/getTasks", (req, res) => {
  res.json(data);
});

app.post("/addTasks", (req, res) => {
  const newTask = req.body; // Get the new task from the request body

  // Read the existing data from the file
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      // If there's another error, return a 500 error
      return res.status(500).json({ message: "Error reading file" });
    }

    let jsonData = [];
    if (data) {
      // If data exists, parse the existing JSON data
      try {
        jsonData = JSON.parse(data);
      } catch (parseErr) {
        return res.status(500).json({ message: "Error parsing JSON data" });
      }
    }

    // Append the new task to the existing array
    jsonData.push(newTask);

    // Write the updated JSON array back to the file
    fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing file" });
      }
      res.status(200).json({ message: "Data saved successfully" });
    });
  });
});

app.patch("/editTask/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;

  fs.readFile("data.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ Message: "There is an error" });
    }
    let tasks = [];

    try {
      tasks = JSON.parse(data); // parse data into array
    } catch (parseErr) {
      return res.status(404).json({ Message: "Error parsing json data" });
    }

    //  find task by id

    const taskIndex = tasks.findIndex((task) => task.id == id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...body };

    fs.writeFile("data.json", JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing file" });
      }
      res
        .status(200)
        .json({ message: "Task updated successfully", task: tasks[taskIndex] });
    });
  });
});

app.delete("/deleteTask/:id", (req, res) => {
  const id = Number(req.params.id); // Convert to number

  fs.readFile("data.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading file" });
    }

    let tasks = [];

    try {
      tasks = JSON.parse(data) || [];
    } catch (parseErr) {
      return res.status(400).json({ message: "Error parsing JSON data" });
    }

    // Find the index of the task
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Remove task from array
    tasks.splice(taskIndex, 1);

    // Write updated tasks back to file
    fs.writeFile("data.json", JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing file" });
      }
      res.status(200).json({ message: "Task deleted successfully" });
    });
  });
});

app.listen(port, () => {
  console.log("The server started successfully");
});
