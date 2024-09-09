// Variables Used In Toolbar 'Customisation'
let toolbarBtn = document.getElementById("toolbarBtn");
let colorsTable = document.getElementById("colorsTab");
let toolBar = document.getElementById("toolbar");

// Function Used To Open & Close The Side Toolbar Named 'Customisation'
if (toolbarBtn && colorsTable && toolBar) {
    toolbarBtn.onclick = function() {
        colorsTable.classList.toggle("show");

        // Toggle slide classes with a single operation
        toolBar.classList.toggle("slideRight");
        toolBar.classList.toggle("slideLeft");
    }
} else { // If any of the elements isn't found then this error alert will be displayed
    toolbarBtn.onclick = function() {
        Swal.fire({
            icon: "error",
            title: "Sorry...",
            text: "An expected error occured!"
        });
    }
}