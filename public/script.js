let titleInput = document.getElementById("inputTitle");
let todoInput = document.getElementById("inputTodo");
let addButton = document.getElementById("addButton");
let list = document.getElementById("todoList");

const API_URL = "http://localhost:3000/todos";

async function showTodo() {
  try {
    let response = await fetch(`${API_URL}`);
    let todos = await response.json();

    list.innerHTML = "";

    console.log(todos);

    for (let i = 0; i < todos.length; i++) {
      let title = todos[i].title;
      let todo = todos[i].text;
      let id = todos[i].id; //UUID
      let done = todos[i].done;

      list.innerHTML += `
        <li data-id="${id}" class="${done ? "completed" : ""}">
            <div class="todo-left">
                <input id="${id}" type="checkbox" ${done ? "checked" : ""} />
                <span>${title}:  ${todo}</span>
            </div>
            <div class="delete-btn">X</div>
        </li>
      `;
    }
  } catch (error) {
    console.error("Fehler beim Laden:", error);
  }
}

async function addTodo(title, text) {
  try {
    const data = { title, text };
    if (!title || !text) {
      console.error("Fehler Text oder Title fehlt:", error);
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    showTodo();
    titleInput.value = ""; 
    todoInput.value = "";
  } catch (error) {
    console.error("Fehler beim Erstellen:", error);
  }
}

async function deleteTodo() {
  list.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-btn")) {
      let li = e.target.closest("li");
      let id = li.dataset.id;

      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        li.remove();
      } catch (error) {
        console.error("Fehler beim Löschen:", error);
      }
    }
  });
}


async function updateTodo() {
  list.addEventListener("change", async (e) => {

    //With Help from Gemini AI
    if (e.target.type === "checkbox") {
      let id = e.target.id;
      let done = e.target.checked;
      let li = e.target.closest("li");

      try {
        await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ done }),
        });

        if (done) {
          li.classList.add("completed");
        } else {
          li.classList.remove("completed");
        }
      } catch (error) {
        console.error("Fehler beim Update:", error);
      }
    }
  });
}

todoInput.addEventListener('keyup' ,function(event){
  if(event.key == "Enter") {
    addTodo(titleInput.value,todoInput.value);
  }
})

titleInput.addEventListener('keyup',function(event){
  if(event.key == "Enter") {
    addTodo(titleInput.value,todoInput.value);
  }
})

showTodo();
updateTodo();
deleteTodo();
