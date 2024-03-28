const input = document.querySelector("input");
const specs = document.querySelector(".specs");
const section = document.querySelector("section");
const header = document.querySelector("header")
const body = document.querySelector("body")
const main = document.querySelector("main");
const footer = document.querySelector("footer")


const themeChangerButtons = document.querySelectorAll(".themeIcon");
const themeChangerButton1 = themeChangerButtons[0]
const themeChangerButton2 = themeChangerButtons[1]
const themeChangerButton3 = themeChangerButtons[2]
const themeChangerButton4 = themeChangerButtons[3]



let todos = [];

let theme = "light";

function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    updateTheme();
    categoryFilter(activeCategory)
    addTask()
    display()
    categoryFilter(activeCategory)
}

function updateTheme() {
    if (theme === "light") {
        themeChangerButton2.classList.add("hidden");
        themeChangerButton4.classList.add("hidden");
        themeChangerButton1.classList.remove("hidden");
        themeChangerButton3.classList.remove("hidden");
        body.classList.remove("darkModeBody")
        header.classList.remove("darkModeHeader")
        input.classList.remove("darkModeBars")
        input.classList.remove("darkModeInput")
        main.classList.remove("darkModeBars")
    } else if (theme === "dark") {
        themeChangerButton1.classList.add("hidden");
        themeChangerButton3.classList.add("hidden");
        themeChangerButton2.classList.remove("hidden");
        themeChangerButton4.classList.remove("hidden");
        body.classList.add("darkModeBody")
        header.classList.add("darkModeHeader")
        input.classList.add("darkModeBars")
        input.classList.add("darkModeInput")
        main.classList.add("darkModeBars")
    }

    localStorage.setItem('theme', theme);
}

themeChangerButtons.forEach(button => {
    button.addEventListener("click", toggleTheme);
});

function loadThemeFromLocalStorage() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        theme = storedTheme;
        updateTheme();
    }
}

loadThemeFromLocalStorage();

themeChangerButtons.forEach(button => {
    button.addEventListener("click", toggleTheme);
});

if (theme === "light") {
    themeChangerButton2.classList.add("hidden");
    themeChangerButton4.classList.add("hidden");
} else if (theme === "dark") {
    themeChangerButton1.classList.add("hidden");
    themeChangerButton3.classList.add("hidden");
}



input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        updatePage();
        input.value = "";
    }
});

function updatePage() {
    const inputValue = input.value.trim();
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
    <h3 class="${theme === "dark" ? "darkModeInfo" : ""}">${count} items left</h3>
    <h3 onclick="clearCompleted()" class="${theme === "dark" ? "darkModeInfoHover" : "clearAllTasks"}">Clear Completed</h3>`;

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
        const circle = theme === "dark" ? "./assets/mobile/circle-darkmode.svg" : "./assets/mobile/circle.svg"
        const completedClass = task.completed && (theme === "dark" || theme === "light") ? (task.completed && theme === "dark" ? "completedDarkMode" : "completedLightMode") : (theme === "light" ? "" : "textDarkMode");

        taskElement.classList.add("box");
        taskElement.id = `${task.id}`
        taskElement.innerHTML = `
        <div class="task">
            <div class="left">
                <img onclick="completedTask(${task.id})" class="circle" src="${task.completed ? './assets/desktop/checked.svg' : `${circle}`}">
                <p id="${task.id}" class="${completedClass}">${task.title}</p>
            </div>
            <img onclick="deleteTask(${task.id})" class="delete" src="./assets/mobile/delete.svg">
        </div>
        <div class="${theme === "dark" ? "darkModeLine" : "line"}"></div>`;
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
    const darkMode = theme === "dark" ? "darkModeInfoHover" : ""
    let active = darkMode && activeCategory === 'all' ? "activatedCategory" : ""

    footer.innerHTML = `
    <div class="panel ${theme === "dark" ? "darkModePanel" : ""}">
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

