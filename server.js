
const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Home
app.get("/", (req, res) => {
  res.json({
    message: "AWS Node.js Demo API is running 🚀",
    version: "1.0.0"
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is healthy"
  });
});

// Get tasks
app.get("/tasks", (req, res) => {
  const tasks = [
    {
      id: 1,
      title: "Learn AWS",
      completed: false
    },
    {
      id: 2,
      title: "Learn Docker",
      completed: false
    },
    {
      id: 3,
      title: "Learn CI/CD",
      completed: false
    }
  ];

  res.json(tasks);
});

// Create task
app.post("/tasks", (req, res) => {


    console.log("body",req.body)
  const { title } = req.body;

  console.log("tasks",title)

  if (!title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  res.status(201).json({
    message: "Task created successfully",
    task: {
      id: Date.now(),
      title,
      completed: false
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

