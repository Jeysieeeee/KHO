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

const clientData = [
  {
    id: 1,
    name: "Jeanny",
    gender: "Female",
    address: "Daet",
    email: "dsad@gmail.com",
    phone: "035543514554",
    status: "View Records",
  },
  {
    id: 2,
    name: "Jeanny",
    gender: "Female",
    address: "Daet",
    email: "dsad@gmail.com",
    phone: "035543514554",
    status: "View Records",
  },
  {
    id: 3,
    name: "Jeny",
    gender: "Feale",
    address: "Daet",
    email: "dsad@gmail.com",
    phone: "035543514554",
    status: "View Records",
  },
];
function addDeleteButtonListeners(data) {
  const deleteButtons = document.querySelectorAll(".view2");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      const itemToDelete = data[index];
      const confirmation = confirm(
        `Are you sure you want to delete the item: ${itemToDelete.name}?`
      );
      if (confirmation) {
        data.splice(index, 1);
        updateTable(data);
      }
    });
  });
}
function showClientForm() {
  const clientForm = document.getElementById("clientForm");
  clientForm.classList.add("show-form");
}
// Event listeners
document.getElementById("addPetBtn").addEventListener("click", showClientForm);
// Function to save client data
document.addEventListener("DOMContentLoaded", function () {
  const clientForm = document.getElementById("clientForm");
  document
    .getElementById("addPetBtn")
    .addEventListener("click", showClientForm);
  document
    .getElementById("saveClient")
    .addEventListener("click", saveClientData);
  clientForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form input values
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const age = document.getElementById("age").value;
    const gender = document.querySelector('input[name="gender"]:checked');

    if (firstName && lastName && address && age && gender) {
      // Create a client object
      const client = {
        id: clientId,
        name: `${firstName} ${lastName}`,
        status: "View Records",
      };

      // Push the client object into the data array
      data.push(client);
      clientId++;
      // Update the table with the new data
      updateTable(data);

      // Clear the input fields
      document.getElementById("clientForm").reset();

      // After handling the data and updating the table, you can hide the form
      hideClientForm();
      hideClientDialog();
    } else {
      alert("Please fill in all required fields.");
    }
  });
});

// Function to hide the client form
// Function to hide the client form
function hideClientForm() {
  const clientForm = document.getElementById("clientForm");
  clientForm.classList.remove("show-form");
}

// Function to hide the client dialog and overlay
function hideClientDialog() {
  const dialog = document.getElementById("clientDialog");
  dialog.style.display = "none";

  const overlay = document.querySelector(".overlay");
  overlay.style.display = "none";

  // Enable interactions with the rest of the page
  document.body.style.overflow = "auto";
}

// Event listener for the "Close" button
document.getElementById("closeDialog").addEventListener("click", function () {
  hideClientForm(); // Close the client form
  hideClientDialog();
});

// Function to show the client dialog and overlay
function showClientDialog() {
  const dialog = document.getElementById("clientDialog");
  dialog.style.display = "block";

  const overlay = document.querySelector(".overlay");
  overlay.style.display = "block";

  // Disable interactions with the rest of the page
  document.body.style.overflow = "hidden";
}

// Function to hide the client dialog and overlay
function hideClientDialog() {
  const dialog = document.getElementById("clientDialog");
  dialog.style.display = "none";

  const overlay = document.querySelector(".overlay");
  overlay.style.display = "none";

  // Enable interactions with the rest of the page
  document.body.style.overflow = "auto";
}
