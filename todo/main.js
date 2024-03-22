const inpt = document.querySelector("input");
const specs = document.querySelector(".specs");
const section = document.querySelector("section");
const main = document.querySelector("main");

let todos = [];

inpt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        updatePage();
        inpt.value = "";
    }
});

function updatePage() {
    const inputValue = inpt.value.trim();
    if (inputValue !== "") {
        const task = {
            title: inputValue,
            id: Math.random(),
            completed: false
        };
        todos.push(task);
        main.classList.add("active");
        updateDOM();
        display();
    }
}

function display() {
    const count = todos.filter(task => !task.completed).length;
    specs.innerHTML = `
    <h3>${count} items left</h3>
    <h3>Clear Tasks</h3>`;

    if (todos.length === 0) {
        main.classList.remove("active");
    } else {
        main.classList.add("active");
    }
}

function deleteTask(taskId) {
    todos = todos.filter(task => task.id !== taskId);
    updateDOM();
    display();
}

function updateDOM() {
    section.innerHTML = "";
    todos.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("box");
        taskElement.innerHTML = `
        <div class="task">
            <div class="left">
                <img onclick="completedTask(${task.id})" class="oval" src="./assets/mobile/oval.svg">
                <p id="${task.id}">${task.title}</p>
            </div>
            <img onclick="deleteTask(${task.id})" class="delete" src="./assets/mobile/X.svg">
        </div>
        <div class="line"></div>`;
        section.append(taskElement);
    });
}

function completedTask(taskId) {
    const task = todos.find(task => task.id === taskId);
    if (task) {
        p.classList.add("completed")
        task.completed = !task.completed;
        display();
    }else{
        p.classList.remove("completed")
        
        display();
    }
}
