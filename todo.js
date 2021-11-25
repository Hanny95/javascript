const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODOS_LS = "toDos";

function filterFn(toDo) {

}
let toDos = [];

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanTodos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanTodos;
    saveTodos();
}
// filter --> array의 모든 아이템을 통해 함수를 실행후 
// true인 아이템들만 가지고 새로운 array를 만듦

// JSON.stringify --> 자바스크립트 object를 string으로 바꿔줌
// JSON --> 데이터를 전달할때 자바스크립트가 다룰 수 있도록 Object로 바꿔주는 기능
function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    todoList.appendChild(li);
    const toDosObj = {
        text: text,
        id: newId
    };
    toDos.push(toDosObj);
    saveTodos();

}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}

function loadTodos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintTodo(toDo.text);
        })
       
    } 
}

function init() {
    loadTodos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();