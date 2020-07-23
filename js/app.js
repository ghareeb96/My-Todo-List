const inputField = $("#newTodo");
const addBtn = $("#addBtn");
const todoList = $(".list");
const completedBtn = $('.completed');
const deleteBtn = $('.deleted');
let newTodo;

class Todo {
    constructor(task, isCompleted, dateAdded) {
        this.task = task;
        this.isCompleted = isCompleted;
        this.dateAdded = dateAdded;
    }
}

addBtn.click(() => {
    let date = new Date();
    let newDate = date + '';
    newDate = newDate.split("GMT")[0];
    addClass($(".completed"), "active");
    addClass($(".delete"), "delete");
    if (inputField.val()) {
        newTodo = new Todo(inputField.val(), false, newDate);

        todoList.append(
            `
            <div class="todo">
                <div class="task">
                    <h4>${newTodo.task}</h4>
                    <p class="time">Added : ${newTodo.dateAdded}</p>
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
        console.log(newTodo.dateAdded);
        console.log(newTodo.isCompleted);

        addClass($(".completed"), "active");
        addClass($(".delete"), "delete");

    }

})
addClass($(".completed"), "active");
addClass($(".delete"), "delete");























//! Todo buttons handler ///////////////////
function addClass(hClass, addedClass) {
    hClass.each(function () {
        $(this).hover(function () {
            $(this).parent().toggleClass(addedClass)
        })
    })
}