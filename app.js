const { v4: uuidv4 } = require("uuid");
const express = require("express");
const { Ticket } = require("lucide-react");
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "todos.json");

const app = express();
app.use(express.json());
app.use(express.static("public"));

let TODOS = [];

if (fs.existsSync(FILE)) {
  TODOS = JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

function saveTodos() {
  fs.writeFileSync(FILE, JSON.stringify(TODOS, null, 2));
}

app.get("/", (req, res) => {
  res.send("Test");
});

app.get("/todos", (req, res) => {
  res.send(TODOS);
  saveTodos();
});

app.post("/todos", (req, res) => {
  const { text } = req.body;
  const { title } = req.body;

  if (!text || !title) {
    res.status(400).json({ error: "Title oder Text fehlt:" });
  }

  let todo = {
    title,
    text,
    done: false,
    id: uuidv4(),
  };

  TODOS.push(todo);
  res.send(TODOS);
  saveTodos();
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const before = TODOS.length;

  let newTODOS = [];

  for (let i = 0; i < TODOS.length; i++) {
    if (TODOS[i].id !== id) {
      newTODOS.push(TODOS[i]);
    }
  }

  TODOS = newTODOS;

  if (TODOS.length == before) {
    res.status(400).json({ error: "NO ID FOUND" });
  }

  res.send(TODOS);
  saveTodos();
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { done } = req.body;

  for (let i = 0; i < TODOS.length; i++) {
    if (TODOS[i].id == id) {
      TODOS[i].done = done;
    }
  }

  res.send(TODOS);
  saveTodos();
});

app.listen(3000, () => {
  console.log("Server rennt auf http://localhost:3000/");
});
