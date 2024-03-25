const inpt = document.querySelector("input");
const specs = document.querySelector(".specs");
const section = document.querySelector("section");
const main = document.querySelector("main");
const footer = document.querySelector("footer")


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
        addTask();
        display();
        filterTasks(activeCategory);
    }
}

function display() {
    const count = todos.filter(task => !task.completed).length;
    specs.innerHTML = `
    <h3>${count} items left</h3>
    <h3 onclick="clearCompleted()" class="clearAllTasks">Clear Completed</h3>`;

    if (todos.length === 0) {
        main.classList.remove("active");
    } else {
        main.classList.add("active");
    }
}

function deleteTask(taskId) {
    const task = todos.find(task => task.id === taskId);
    if (task) {
        todos = todos.filter(task => task.id !== taskId);
        addTask();
        display();
        filterTasks(activeCategory);
        addToLocalStorage()
    }
}

function clearCompleted() {
    todos = todos.filter(task => !task.completed);
    addTask();
    display();
    filterTasks('all');
    addToLocalStorage()
}

function addTask() {
    section.innerHTML = "";
    todos.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("box");
        taskElement.id = `${task.id}`
        taskElement.innerHTML = `
        <div class="task">
            <div class="left">
                <img onclick="completedTask(${task.id})" class="circle" src="${task.completed ? './assets/desktop/checked.svg' : './assets/mobile/circle.svg'}">
                <p id="${task.id}" class="${task.completed ? 'completed' : ''}">${task.title}</p>
            </div>
            <img onclick="deleteTask(${task.id})" class="delete" src="./assets/mobile/delete.svg">
        </div>
        <div class="line"></div>`;
        section.append(taskElement);
    });
    addToLocalStorage()
}


function completedTask(taskId) {
    const task = todos.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        const currentFilter = activeCategory;
        addTask();
        display();
        filterTasks(currentFilter);
        addToLocalStorage()
    }
}

categoryFilter('all');

let activeCategory = 'all';

function categoryFilter(activeCategory) {
    footer.innerHTML = `
    <div class="panel">
    <h1 class="${activeCategory === 'all' ? "activatedCategory" : ""}" id="allCategory" onclick="filterTasks('all')">All</h1>
    <h1 class="${activeCategory === 'active' ? "activatedCategory" : ""}" id="activeCategory" onclick="filterTasks('active')">Active</h1>
    <h1 class="${activeCategory === 'completed' ? "activatedCategory" : ""}" id="completedCategory" onclick="filterTasks('completed')">Completed</h1>
    </div>`;
}

function filterTasks(taskCategory) {
    todos.forEach(item => {
        const taskElement = document.getElementById(item.id);
        taskElement.classList.remove('hidden');
        switch (taskCategory) {
            case 'active':
                if (item.completed) {
                    taskElement.classList.add('hidden');
                }
                break;
            case 'completed':
                if (!item.completed) {
                    taskElement.classList.add('hidden');
                }
                break;
            default:
                break;
        }
    });

    activeCategory = taskCategory;
    categoryFilter(activeCategory);
}

function addToLocalStorage() {
    localStorage.setItem("data", JSON.stringify(todos));
}


function loadDataFromLocalStorage() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        todos = JSON.parse(savedData);
        addTask();
        display();
        filterTasks(activeCategory);
    }
}

loadDataFromLocalStorage();