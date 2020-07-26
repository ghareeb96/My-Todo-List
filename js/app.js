const inputField = $("#newTodo");
const addBtn = $("#addBtn");
const todo = $(".todo");
let completedBtn = $('.completed');
let deleteBtn = $('.delete');
const trueColor = "rgba(0, 77, 0, 0.678)";
const falseColor = "rgba(133, 0, 0, 0.767)";


class Todo {
    constructor(task, isCompleted, dateAdded, dateCompleted) {
        this.task = task;
        this.isCompleted = isCompleted;
        this.dateAdded = dateAdded;
        this.dateCompleted = dateCompleted;
    }
}

class UI {
    static toggleClass(hClass, addedClass) {
        hClass.each(function () {
            $(this).hover(function () {
                $(this).parent().toggleClass(addedClass)
            })
        })
    }

    static displayTodos() {
        const todos = Store.getTodos();
        todos.forEach((todo) => {
            UI.addTodoToList(todo)
        });
    }

    static addTodoToList(todo) {
        const todoList = $(".list");


        todoList.append(
            `
            <div class="todo" style="background-color : ${todo.isCompleted ?  trueColor:falseColor}">
                <div class="task">
                    <h4>${todo.task}</h4>
                    <p class="time"><span>Added : </span>${todo.dateAdded}</p>
                    <p class="comp"><span>Completed </span>: ${todo.dateCompleted}</p>
                </div>
                <a class="delete">
                    <i class="fas fa-trash-alt"></i>
                </a>
                <a class="completed">
                    <i class="far fa-check-square"></i>
                </a>
            </div>
            `
        )
    }

    static deleteTodo(d_todo) {
        if (d_todo.classList.contains("delete")) {
            d_todo.parentElement.remove();
        } else {
            d_todo.parentElement.parentElement.remove();
        }
    }

    static completeTodo(date) {
        let todos = Store.getTodos();
        let dateComp = new Date();
        let newDate = dateComp + '';
        newDate = newDate.split("GMT")[0];
        todos.forEach((todo) => {
            if ("Added : " + todo.dateAdded == date + " " && todo.isCompleted === false) {
                todo.isCompleted = true;
                todo.dateCompleted = newDate;
                localStorage.setItem("todos", JSON.stringify(todos));
                location.reload();
            }
        })

    }


}


class Store {
    static getTodos() {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        return todos;
    }

    static addTodo(todo) {
        const todos = Store.getTodos();
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    static removeTodo(date) {
        let todos = Store.getTodos();
        todos.forEach((todo, index) => {
            if ("Added : " + todo.dateAdded == date) {
                todos.splice(index, 1);
            }
        })

        localStorage.setItem("todos", JSON.stringify(todos));
    }


}
$(document).ready(UI.displayTodos());
addBtn.click(() => {
    let date = new Date();
    let newDate = date + '';
    newDate = newDate.split("GMT")[0];
    UI.toggleClass($(".completed"), "active");
    UI.toggleClass($(".delete"), "delete");

    if (inputField.val()) {
        let newTodo = new Todo(inputField.val(), false, newDate, "Not Yet");
        UI.addTodoToList(newTodo);
        Store.addTodo(newTodo);

        UI.toggleClass($(".completed"), "active");
        UI.toggleClass($(".delete"), "delete");
    }
    inputField.val("");

})



$(document).on("click", ".delete", function (e) {
    UI.deleteTodo(e.target);
    if (e.target.classList.contains("delete")) {
        Store.removeTodo(e.target.previousElementSibling.children[1].innerText);
    } else {
        Store.removeTodo(e.target.parentElement.previousElementSibling.children[1].innerText);

    }

})


$(document).on("click", ".completed", function (e) {
    if (e.target.classList.contains("completed")) {
        UI.completeTodo(e.target.previousElementSibling.previousElementSibling.children[1].innerText);
    } else {
        UI.completeTodo(e.target.parentElement.previousElementSibling.previousElementSibling.children[1].innerText);
    }
});

UI.toggleClass($(".completed"), "active");
UI.toggleClass($(".delete"), "delete");