// Username Variables
let userName = document.getElementById("username");
let confirmBtn = document.getElementById("confirmBtn");

// Variables Used For Color Changing Functionality
let colors = document.querySelectorAll(".colors-table .color");
let background = document.getElementById("background");
let confirmBtnColor = document.getElementById("confirmBtn");

// Checks If There Is Any Background-Color Stored In The Local Storage Or The Default Color Will Be Applied
if(window.localStorage.getItem("bg-color") && window.localStorage.getItem("btn-color")) {
    background.style.setProperty('--before-bg-color', window.localStorage.getItem("bg-color"));
    confirmBtnColor.style.backgroundColor = window.localStorage.getItem("btn-color");
}

// Logic Used For Changing Colors
colors.forEach((color) => {
    color.addEventListener("click", function() {
        let colorValue = this.getAttribute("data-value");
        background.style.setProperty('--before-bg-color', colorValue);
        confirmBtnColor.style.backgroundColor = colorValue;

        window.localStorage.setItem("bg-color", colorValue);
        window.localStorage.setItem("btn-color", colorValue);
    });
});


// Checks If There Is A Username Already Stored In The Local Storage
if(window.localStorage.getItem("Username") && userName && confirmBtn) {
    userName.value = window.localStorage.getItem("Username");
    Swal.fire({
        title: `You already provided a username!`,
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

// Function Used To Submit The Username From The Input To The Local Storage
confirmBtn.onclick = function() {
    let usernameValue = userName.value.trim();

    if(usernameValue && usernameValue.length <= 10 && usernameValue.length >= 5) {
        window.localStorage.setItem("Username", usernameValue);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your username has been successfully saved!",
            showConfirmButton: false,
            timer: 2000
        });
        setTimeout(() => {
            window.location.href = "task-list.html";
        }, 2500)
    } else {
        Swal.fire({
            title: `Make sure your username is : 
            - Not empty
            - Contains at least 5 letters and 10 at maximum`,
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
}