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

// Function to filter the table based on user input
function filterTable() {
  const filterInput = document.getElementById("filterbox");
  const table = document.getElementById("filtertable");
  const tableRows = table.getElementsByTagName("tr");
  const noMatchMessage = document.getElementById("no-match-message");
  const searchText = filterInput.value.toLowerCase();
  let noMatch = true;

  // Loop through the table rows
  for (let i = 1; i < tableRows.length; i++) {
    const row = tableRows[i];
    const cells = row.getElementsByTagName("td");
    let rowVisible = false;

    // Loop through the cells in each row (ID, Name, and Status)
    for (let j = 0; j < cells.length; j++) {
      const cell = cells[j];
      const cellText = cell.textContent.toLowerCase();

      if (cellText.includes(searchText)) {
        rowVisible = true;
        noMatch = false;
        break;
      }
    }

    // Display or hide the row based on search results
    row.style.display = rowVisible ? "table-row" : "none";
  }

  // Show or hide the "No matching found" message
  noMatchMessage.style.display = noMatch ? "block" : "none";
}

// Add an input event listener to the input field
document.addEventListener("DOMContentLoaded", function () {
  const filterInput = document.getElementById("filterbox");
  filterInput.addEventListener("input", filterTable);
});

// Pagination configuration
const itemsPerPage = 5;
let currentPage = 1;

// Pagination controls
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");
const tableBody = document.querySelector("#filtertable tbody");

// Function to update the table with the current page data
function updateTable(data) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);
  const tableBody = document.querySelector("#filtertable tbody");
  tableBody.innerHTML = "";

  // Populate the table with the current page's data
  pageData.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
         <td>${item.id}</td>
         <td>${item.name}</td>
         <td>
             <button type="button" class="view btn-primary btn-lg gradient">
                 View Records
             </button>
             <button type="button" class="view2 btn-primary btn-lg gradient" data-index="${index}">
                 <i class="fa fa-trash"></i>
                 Delete
             </button>
         </td>
     `;
    tableBody.appendChild(row);
  });

  // Update the page info text
  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(
    data.length / itemsPerPage
  )}`;

  // Disable/enable navigation buttons as needed
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled =
    currentPage === Math.ceil(data.length / itemsPerPage);

  // Add event listeners to the "Delete" buttons
  addDeleteButtonListeners(data);
}

// Sample data (replace this with your actual data)
const data = [
  {
    id: 1,
    name: "Jeanny",
    status: "View Records",
  },
  { id: 2, name: "Dummy", status: "View Records" },
  { id: 3, name: "Dummy", status: "View Records" },
  { id: 4, name: "Dummy", status: "View Records" },
  { id: 5, name: "Dummy", status: "View Records" },
  { id: 6, name: "Dummy", status: "View Records" },
  { id: 7, name: "Dummy", status: "View Records" },
  { id: 8, name: "Dummy", status: "View Records" },
  { id: 9, name: "Dummy", status: "View Records" },
  { id: 10, name: "Dummy", status: "View Records" },
  { id: 11, name: "Dummy", status: "View Records" },
  { id: 12, name: "Dummy", status: "View Records" },
  // Add more data here
];
data.forEach((item) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${item.id}</td>
    <td>${item.firstName} ${item.lastName}</td>
    <td>
      <button type="button" class="view btn-primary btn-lg gradient">${item.status}</button>
    </td>
  `;

  tableBody.appendChild(row);
});
// Initial table update
updateTable(data);

// Pagination button event listeners
prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateTable(data);
  }
});

nextPageButton.addEventListener("click", () => {
  if (currentPage < Math.ceil(data.length / itemsPerPage)) {
    currentPage++;
    updateTable(data);
  }
});

// Function to add event listeners to the "Delete" buttons
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
let clientId = 13;
// Function to show the client form
function showClientForm() {
  const clientForm = document.getElementById("clientForm");
  clientForm.classList.add("show-form");
}
// Event listeners
document
  .getElementById("addClientBtn")
  .addEventListener("click", showClientForm);
// Function to save client data
document.addEventListener("DOMContentLoaded", function () {
  const clientForm = document.getElementById("clientForm");
  document
    .getElementById("addClientBtn")
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
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;

    if (
      firstName &&
      lastName &&
      address &&
      age &&
      gender &&
      phoneNumber &&
      email
    ) {
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

/// Event listeners
document
  .getElementById("addClientBtn")
  .addEventListener("click", showClientDialog);
document.getElementById("saveClient").addEventListener("click", saveClientData);
