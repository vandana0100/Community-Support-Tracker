// donationTracker.js

// Function to update the total donation summary
function updateDonationSummary() {
  const tableBody = document.getElementById('donation-table-body');
  const rows = Array.from(tableBody.querySelectorAll('tr'));

  // Calculate total donation amount
  const total = rows.reduce((sum, row) => {
    const amountCell = row.querySelector('.donation-amount-cell');
    return sum + parseFloat(amountCell.textContent || 0);
  }, 0);

  // Update the summary section with the total amount
  document.getElementById('total-donation-amount').textContent = total.toFixed(2);
}

// Function to handle deletion of a donation row
function handleDeleteButtonClick(event) {
  const row = event.target.closest('tr');
  const tableBody = document.getElementById('donation-table-body');

  // Remove from localStorage
  const donationId = row.getAttribute('data-donation-id');
  let donations = JSON.parse(localStorage.getItem('donations')) || [];
  donations = donations.filter(donation => donation.id !== donationId);
  localStorage.setItem('donations', JSON.stringify(donations));

  // Remove the row from the table
  tableBody.removeChild(row);

  // Update the summary after deletion
  updateDonationSummary();
}

// Function to initialize the donation table
function initializeDonationTable() {
  const tableBody = document.getElementById('donation-table-body');
  const donations = JSON.parse(localStorage.getItem('donations')) || [];

  donations.forEach(donation => {
    const row = document.createElement('tr');
    row.setAttribute('data-donation-id', donation.id);

    row.innerHTML = `
      <td>${donation.charityName}</td>
      <td class="donation-amount-cell">${donation.amount.toFixed(2)}</td>
      <td>${donation.date}</td>
      <td>${donation.comment}</td>
      <td><button class="delete-button">Delete</button></td>
    `;

    const deleteButton = row.querySelector('.delete-button');
    deleteButton.addEventListener('click', handleDeleteButtonClick);

    tableBody.appendChild(row);
  });

  // Update the donation summary after the table is populated
  updateDonationSummary();
}

module.exports = { updateDonationSummary, handleDeleteButtonClick, initializeDonationTable };
