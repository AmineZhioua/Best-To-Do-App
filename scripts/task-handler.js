// Variables Used For Time & User Greeting
let userGreeting = document.getElementById("greeting");
let time = document.getElementById("time");

// Variables Used For Handling Tasks
let addButton = document.getElementById("addBtn");
let taskInput = document.getElementById("task");
let taskList = document.getElementById("task-list");

// Retrieve Tasks From Local Storage Or Initialize An Empty Array
let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];



// Variables Used For Color Changing Functionality
let colors = document.querySelectorAll(".colors-table .color");
let background = document.getElementById("background");

// Checks If There Is Any Background-Color Stored In The Local Storage Or The Default Color Will Be Applied
if(window.localStorage.getItem("bg-color") && window.localStorage.getItem("btn-color")) {
    background.style.setProperty('--before-bg-color', window.localStorage.getItem("bg-color"));
    addButton.style.backgroundColor = window.localStorage.getItem("btn-color");
}

// Logic Used For Changing Colors
colors.forEach((color) => {
    color.addEventListener("click", function() {
        let colorValue = this.getAttribute("data-value");
        background.style.setProperty('--before-bg-color', colorValue);
        addButton.style.backgroundColor = colorValue;

        window.localStorage.setItem("bg-color", colorValue);
        window.localStorage.setItem("btn-color", colorValue);
    });
});




// Method Used To Display The Date In The Page
let date = new Date();
let weekArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
time.innerText = `Date :
    ${weekArray[date.getDay() - 1]} ${date.getDate()}, ${date.getFullYear()}`;

// Method Used To Get The Username From Local Storage
if(window.localStorage.getItem("Username")) {
    userGreeting.innerText = `Hello, 
    ${window.localStorage.getItem("Username")}`;
} else { // If No Username Was Found The User Will Be Redirected To Home Page So He Can Provide A Username
    userGreeting.innerText = `Hello, Unknown`; // Default Message
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "It looks like you don't have a username!",
    });
    setTimeout(() => {
        window.location.href = "index.html";
    }, 3000);
}




// Display Already Existing Tasks Onload
if(window.localStorage.getItem("tasks")) {
    displayTasks();
};

// When Clicking On The Button The Task Will Be Added
addButton.addEventListener('click', function() {
    let task = taskInput.value.trim(); // Remove White Spaces From The Input Value
    if(task) { // Check If Task Is Not An Empty String
        tasksArray.push({ text: task, done: false }); // Add The Task To The Array
        updateStorage();
        displayTasks();
        taskInput.value = ""; // Clear Input Field
    } else {
        Swal.fire({
            title: "Please write a task before proceeding...",
            showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
            `
            },
            hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
            `
            }
        });
    }
});




// Function To Display The Tasks
function displayTasks() {
    taskList.innerHTML = ""; // Restart The List On Every New Task To Avoid Repetitions
    tasksArray.forEach((taskObj, index) => {
        let doneBtn = document.createElement("i"); // Create HTML Done Button Element
        let editButton = document.createElement("i"); // Create HTML Edit Button Element
        let deleteBtn = document.createElement("i"); // Create HTML Delete Button Element

        let myLi = document.createElement("li"); // Creating The Li That Contains All The Task Elements(Buttons, Task Paragraph, etc...)
        let taskParagraph = document.createElement("p"); // Create HTML Paragraph Element
        let myIconsDiv = document.createElement("div"); // Creating The Div That Contains All The Icons

        // Adding The Necessary Classes To Each Element
        taskParagraph.textContent = taskObj.text;
        doneBtn.classList.add("fa-solid", "fa-square-check");
        editButton.classList.add("fa-solid", "fa-pen-to-square");
        deleteBtn.classList.add("fa-solid", "fa-trash-can");
        myIconsDiv.classList.add("icons");

        // If The Task Is Marked As Done, Add The 'done' Class To The Li
        if (taskObj.done) {
            myLi.classList.add("done");
        }
        // Done Button Toggles The 'done' State
        doneBtn.onclick = function() { 
            taskObj.done = !taskObj.done;
            updateStorage();
            displayTasks();
        }
        
        // Anonymous Function To Delete A Task When Clicking On The Button
        deleteBtn.onclick = function() {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    tasksArray.splice(index, 1);
                    updateStorage();
                    displayTasks();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your task has been deleted.",
                        icon: "success"
                    });
                }
            });
            
        }

        // Anonymous Function To Edit A Task When Clicking On The Button
        editButton.onclick = function() {
            let editedTask = prompt("Edit Your Task :", taskObj.text);
            if (editedTask && editedTask.trim()) {
                taskObj.text = editedTask.trim();
                updateStorage();
                displayTasks();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Task cannot be empty!",
                });
            }
        }

        // Appending The Icons To The Div
        myIconsDiv.appendChild(doneBtn);
        myIconsDiv.appendChild(editButton);
        myIconsDiv.appendChild(deleteBtn);

        // Appending The Div & TaskParagraph To The Li
        myLi.appendChild(taskParagraph);
        myLi.appendChild(myIconsDiv);

        // Appending The Li To The Ul
        taskList.appendChild(myLi);
    });
}

// Converting The Array Into JSON String And Save It To Local Storage
function updateStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}