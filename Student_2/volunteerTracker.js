// volunteerTracker.js

// Function to save data to localStorage
function saveDataToLocalStorage(data) {
  localStorage.setItem("volunteerData", JSON.stringify(data));
}

// Function to load persisted data from localStorage
function loadDataFromLocalStorage() {
  const data = localStorage.getItem("volunteerData");
  return data ? JSON.parse(data) : [];
}

// Function to render the persisted data into the table
function renderDataIntoTable() {
  const data = loadDataFromLocalStorage();
  const table = document.querySelector("#data-table");
  table.innerHTML = "";

  if (data.length) {
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.role}</td>
      `;
      table.appendChild(row);
    });
  }
}

module.exports = { saveDataToLocalStorage, loadDataFromLocalStorage, renderDataIntoTable };
