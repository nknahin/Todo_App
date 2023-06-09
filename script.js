import { Todo } from "./todo.js";
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoLists = document.getElementById("lists");
const messageelement = document.getElementById("message");


//sjow  message
const showMessage = (text, status) => {
    messageelement.textContent = text;
    messageelement.classList.add(`bg-${status}`);
    setTimeout(()=> {
        messageelement.textContent = "";
        messageelement.classList.remove(`bg-${status}`);
    },1000)
}

//create todo
const createTodo = (newTodo) => {
    const todoElement = document.createElement("li");
    todoElement.id = newTodo.todoId;
    todoElement.classList.add("li-style");
    todoElement.innerHTML = `
    <span> ${newTodo.todoValue} </span>
    <span> <button class="btn" id="deleteButton"> <i class="fas fa-trash"> </i> </button>   </span>
    `
    todoLists.appendChild(todoElement);
    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click", deleteTodo)
};


const deleteTodo = (event) =>{
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(selectedTodo);
    showMessage("Todo is deleted.", "danger");
    
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));


}

//gettodos from local storage
const getTodosFromLocalStorage = () => {
    return localStorage.getItem("mytodos") ? JSON.
    parse(localStorage.getItem("mytodos")) : [];
}


//add todo
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;
    


    //unique id
    const todoId = Date.now().toString();

    const newTodo = new Todo(todoId, todoValue);
    createTodo(newTodo);
    showMessage("Todo is added.", "success");


    //adding todo to local storage
    const todos = getTodosFromLocalStorage();
    todos.push({newTodo});
    localStorage.setItem("mytodos", JSON.stringify(todos));

    todoInput.value = "";
};

//load todo

const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo)); // Corrected typo: todoValue
}


// adding listener

todoForm.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded",loadTodos);