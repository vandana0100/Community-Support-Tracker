document.addEventListener("DOMContentLoaded", function () {
  const summaryDiv = document.getElementById("summary");
  const table = document.getElementById("logTable");

  // Function to update the summary section
  function updateSummary() {
    const totalHours = getTotalHours();
    summaryDiv.innerText = `Total Hours Volunteered: ${totalHours}`;
  }

  // Function to calculate total hours from localStorage
  function getTotalHours() {
    const hours = localStorage.getItem("hours");
    return hours ? parseInt(hours) : 0;
  }

  // Function to delete a log
  function deleteLog(row, hours) {
    // Remove the log row from table
    row.remove();
    
    // Update localStorage
    const currentHours = parseInt(localStorage.getItem("hours") || 0);
    const newHours = currentHours - hours;
    localStorage.setItem("hours", newHours);

    // Update the summary
    updateSummary();
  }

  // Handle adding logs
  function addLog(hours) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${hours}</td><td><button class="delete">Delete</button></td>`;
    table.appendChild(row);

    // Set up delete button listener
    row.querySelector(".delete").addEventListener("click", function () {
      deleteLog(row, hours);
    });

    // Update localStorage
    const currentHours = parseInt(localStorage.getItem("hours") || 0);
    const newHours = currentHours + hours;
    localStorage.setItem("hours", newHours);

    // Update the summary
    updateSummary();
  }

  // Set up initial state
  updateSummary();
  
  // Example: Add a few initial logs for testing purposes
  addLog(2);
  addLog(3);

  // Expose addLog to the global scope for manual testing if needed
  window.addLog = addLog;
});
