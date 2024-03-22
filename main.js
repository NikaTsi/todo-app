const inpt = document.querySelector("input")
const box = document.querySelector(".box")
const specs = document.querySelector(".specs")
const section = document.querySelector("section")
const main = document.querySelector("main")



let todos = []

inpt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        updatePage()
        display()
        inpt.value = ""
    }
})




function updatePage() {
    if (!inpt.value.trim() == "") {
        
        let task = {
            title: inpt.value,
            id: Math.random(),
            // completed: false
        }
        todos.push(task)
        main.classList.add("active")
        updateDOM()
        
    }
    display()
}



function display() {
        let count = todos.length
        specs.innerHTML = `
        <h3>${count} items left</h3>
        <h3>Clear Tasks</h3>`
    
    if (todos.length == ""){
        main.classList.remove("active")
        
    }
}


function deleteTask(taskId) {
    todos = todos.filter(task => task.id !== taskId);
    updateDOM()
    display()
}



function updateDOM() {
    section.innerHTML = ""; 
    todos.forEach(task => {
        let taskElement = document.createElement("div");
        taskElement.classList.add("box");
        taskElement.innerHTML = `
        <div class="task">
        <div class="left">
                    <img  onclick="completed(${task.id})" class="oval" src="./assets/mobile/oval.svg">
                    <p id = "${task.id}">${task.title}</p>
                </div>
                <img onclick="deleteTask(${task.id})" class="delete" src="./assets/mobile/X.svg">
            </div>
            <div class="line"></div>`;
        section.append(taskElement);
    });
}


function completed(taskId){
    const p = document.getElementById(taskId)
    p.classList.toggle("completed")

    const oval = document.querySelector(".oval")

    
    let count = todos.length

    if (p.classList.contains("completed")){
        count--
        console.log(count);
    }else {
        count++
        console.log(count);
        
    }
    display()
    
}




// const inpt = document.querySelector("input");
// const specs = document.querySelector(".specs");
// const section = document.querySelector("section");
// const main = document.querySelector("main");

// let todos = [];

// inpt.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//         updatePage();
//         inpt.value = "";
//     }
// });

// function updatePage() {
//     if (!inpt.value.trim() == "") {
//         let task = {
//             title: inpt.value,
//             id: Math.random(),
//             completed: false
//         };
//         todos.push(task);
//         main.classList.add("active");
//         updateDOM();
//         display();
//     }
// }

// function display() {
//     let count = todos.filter(task => !task.completed).length;
//     specs.innerHTML = `
//         <h3>${count} items left</h3>
//         <h3>Clear Tasks</h3>`;
//     if (count === 0) {
//         main.classList.remove("active");
//     }
// }

// function deleteTask(taskId) {
//     todos = todos.filter(task => task.id !== taskId);
//     updateDOM();
//     display();
// }

// function updateDOM() {
//     section.innerHTML = "";
//     todos.forEach(task => {
//         let taskElement = document.createElement("div");
//         taskElement.classList.add("box");
//         taskElement.innerHTML = `
//         <div class="task">
//         <div class="left">
//                     <img  onclick="completed(${task.id})" class="oval" src="./assets/mobile/oval.svg">
//                     <p id = "${task.id}" class="${task.completed ? 'completed' : ''}">${task.title}</p>
//                 </div>
//                 <img onclick="deleteTask(${task.id})" class="delete" src="./assets/mobile/X.svg">
//             </div>
//             <div class="line"></div>`;
//         section.append(taskElement);
//     });
// }

// function completed(taskId) {
//     const task = todos.find(task => task.id == taskId);
//     if (task) {
//         task.completed = !task.completed;
//     }
//     display();
// }
