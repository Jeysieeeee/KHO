// Sidebar toggle behavior
$(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar, #content").toggleClass("active");
  });
});

// Get the current date and time
const currentDate = new Date();
const currentHour = currentDate.getHours();

// Get the <h6> element
const greetingElement = document.getElementById("greetingText");

// Update the greeting based on the time of day
if (currentHour >= 0 && currentHour < 12) {
  greetingElement.textContent = "Good morning";
} else if (currentHour >= 12 && currentHour < 18) {
  greetingElement.textContent = "Good afternoon";
} else {
  greetingElement.textContent = "Good evening";
}

const petData = [
  {
    name: "Meyli1",
    species: "Dog",
    status: "View Records",
  },
  {
    name: "Meyli2",
    species: "Dog",
    status: "View Records",
  },
  {
    name: "Meyli3",
    species: "Dog",
    status: "View Records",
  },
  {
    name: "Meyli",
    species: "Dog",
    status: "View Records",
  },
  {
    name: "Meyli",
    species: "Dog",
    status: "View Records",
  },
  {
    name: "Meyli",
    species: "Dog",
    status: "View Records",
  },
  {
    name: "Meyli",
    species: "Dog",
    status: "View Records",
  },
  {
    name: "Meyli",
    species: "Dog",
    status: "View Records",
  },
  {
    name: "Meyli",
    species: "Dog",
    status: "View Records",
  },
];
const itemsPerPage = 5;
let currentPage = 1;
//POPULATETABLE TO DISPLAY THE DATA ON THE TABLE
function populateTable() {
  const tableBody = document.querySelector(".table-body");

  petData.forEach((pet, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = pet.name;

    const speciesCell = document.createElement("td");
    speciesCell.textContent = pet.species;

    const actionsCell = document.createElement("td");

    const viewButton = document.createElement("button");
    viewButton.type = "button";
    viewButton.className = "view btn-primary btn-lg gradient";
    viewButton.textContent = pet.status;
    viewButton.addEventListener("click", () => {
      window.location.href = "pet-info.html";
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "view2 btn-primary btn-lg gradient";
    deleteButton.innerHTML = '<i class="fa fa-trash"></i> Delete';
    deleteButton.addEventListener("click", () => {
      const itemIndex = index; // Capture the correct index using the loop variable
      // Confirm the deletion with a confirmation dialog
      const confirmation = confirm(
        `Are you sure you want to delete the item: ${petData[itemIndex].name}?`
      );

      if (confirmation) {
        petData.splice(itemIndex, 1);
        updateTable(); // Refresh the table after deletion
      }
    });

    actionsCell.appendChild(viewButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(speciesCell);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}
//UPDATE FUNCTION TO UPDATE THE TABLE WHEN DELETENG AND ADDING DATA
function updateTable() {
  const tableBody = document.querySelector(".table-body");
  tableBody.innerHTML = ""; // Clear the table

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = petData.slice(startIndex, endIndex);

  displayedData.forEach((pet, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = pet.name;

    const speciesCell = document.createElement("td");
    speciesCell.textContent = pet.species;

    const actionsCell = document.createElement("td");

    const viewButton = document.createElement("button");
    viewButton.type = "button";
    viewButton.className = "view btn-primary btn-lg gradient";
    viewButton.textContent = "View Records";
    viewButton.addEventListener("click", () => {
      window.location.href = "pet-info.html";
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "view2 btn-primary btn-lg gradient";
    deleteButton.innerHTML = '<i class="fa fa-trash"></i> Delete';
    deleteButton.addEventListener("click", () => {
      const itemIndex = index;
      const confirmation = confirm(
        `Are you sure you want to delete the item: ${petData[itemIndex].name}?`
      );

      if (confirmation) {
        petData.splice(itemIndex, 1);
        updateTable(); // Refresh the table after deletion
      }
    });

    actionsCell.appendChild(viewButton);
    actionsCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(speciesCell);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
  updatePageInfo();
}
// Function to update the page info (e.g., "Page 1 of 1")
function updatePageInfo() {
  const pageInfo = document.getElementById("pageInfo");
  const totalPages = Math.ceil(petData.length / itemsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

// Function to go to the previous page
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
  }
});

// Function to go to the next page
document.getElementById("nextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(petData.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    updateTable();
  }
});
updateTable();

// Select the button and the dialog element
const addPetBtn = document.getElementById("addPetBtn");
const petDialog = document.getElementById("petDialog");
const petForm = document.getElementById("petForm");

// Event listener to the button
addPetBtn.addEventListener("click", () => {
  petDialog.style.display = "block";
  petForm.style.display = "block";
});

document.getElementById("closeDialog").addEventListener("click", () => {
  petDialog.style.display = "none"; // Hide the form dialog
});

document.getElementById("savePet").addEventListener("click", () => {
  // Handle form submission, e.g., adding the new pet data to your data array
  // After submission, you can hide the form dialog if needed:
  petDialog.style.display = "none";
});

const petNameInput = document.getElementById("firstName");
const speciesInput = document.getElementById("species");

// Add an event listener to the form for submission
petForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const petName = petNameInput.value;
  const species = speciesInput.value;

  // Create a new pet object with the captured data
  const newPet = {
    name: petName,
    species: species,
  };
  petData.unshift(newPet);
  currentPage = 1;
  updateTable();

  // Clear the form inputs
  petNameInput.value = "";
  speciesInput.value = "";

  petDialog.style.display = "none";
});

function downloadTableAsDoc() {
  // Create a new Blob with the table's HTML content
  const tableHtml = document.querySelector(".table-1").innerHTML;
  const blob = new Blob(["<html><body>" + tableHtml + "</body></html>"], {
    type: "application/msword",
  });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contact-information.doc";
  a.click();

  // Clean up
  URL.revokeObjectURL(url);
}
function showOtherButton() {
  var cancel = document.getElementById("cancel-info");
  var save = document.getElementById("save-info");
  var browse = document.getElementById("browse");
  var label = document.getElementById("label");
  var upload = document.getElementById("upload");
  const tdElements = document.querySelectorAll(".edit-table td");
  cancel.style.display = "block";
  save.style.display = "block";
  browse.style.display = "block";
  label.style.display = "block";
  upload.style.display = "block";

  tdElements.forEach((td) => {
    if (td.cellIndex === 1) {
      const isEditable = td.getAttribute("contenteditable") === "true";
      td.setAttribute("contenteditable", !isEditable);
    }
  });
}

function showOtherButton() {
  var cancel = document.getElementById("cancel-info");
  var save = document.getElementById("save-info");
  var browse = document.getElementById("browse");
  var label = document.getElementById("label");
  var upload = document.getElementById("upload");
  const tdElements = document.querySelectorAll(".edit-table td");
  cancel.style.display = "block";
  save.style.display = "block";
  browse.style.display = "block";
  label.style.display = "block";
  upload.style.display = "block";

  tdElements.forEach((td) => {
    if (td.cellIndex === 1) {
      const isEditable = td.getAttribute("contenteditable") === "true";
      td.setAttribute("contenteditable", !isEditable);
    }
  });
}

function cancelEdit() {
  var cancel = document.getElementById("cancel-info");
  var save = document.getElementById("save-info");
  var browse = document.getElementById("browse");
  var label = document.getElementById("label");
  var upload = document.getElementById("upload");
  const tdElements = document.querySelectorAll(".edit-table td");
  cancel.style.display = "none";
  save.style.display = "none";
  browse.style.display = "none";
  label.style.display = "none";
  upload.style.display = "none";

  tdElements.forEach((td) => {
    td.setAttribute("contenteditable", "false");
  });
}

function saveData() {
  var confirmation = confirm("Are you sure you want to save the changes?");
  if (confirmation) {
    // Code to save the data goes here
    alert("Data saved successfully!");
    var cancel = document.getElementById("cancel-info");
    var save = document.getElementById("save-info");
    var browse = document.getElementById("browse");
    var label = document.getElementById("label");
    var upload = document.getElementById("upload");
    cancel.style.display = "none";
    save.style.display = "none";
    browse.style.display = "none";
    label.style.display = "none";
    upload.style.display = "none";
  }
}

function browseImage() {
  const fileInput = document.getElementById("file-input");
  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    const label = document.getElementById("label");
    label.innerText = file ? file.name : "No file selected";
  });
  fileInput.click();
}

function uploadImage() {
  const fileInput = document.getElementById("file-input");
  const uploadedImage = document.getElementById("uploaded-image");
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const url = URL.createObjectURL(file);
    uploadedImage.src = url;
  }
  var cancel = document.getElementById("cancel-info");
  var save = document.getElementById("save-info");
  var browse = document.getElementById("browse");
  var label = document.getElementById("label");
  var upload = document.getElementById("upload");
  cancel.style.display = "none";
  save.style.display = "none";
  browse.style.display = "none";
  label.style.display = "none";
  upload.style.display = "none";
}

function showConsult() {
  const buttons = document.getElementById("pet-consultation-form");
  buttons.style.display = "block";
}

function backCLick() {
  const buttons = document.getElementById("pet-consultation-form");
  buttons.style.display = "none";
}

function clinicalExamShow() {
  const showHidden = document.getElementById("div-hidden");
  showHidden.style.display = "block";
}
