// Function to handle form submission
function handleDonationFormSubmit(event) {
  // Prevent default form submission
  event.preventDefault();

  // Collect form data
  const charityName = document.getElementById('charity-name').value;
  const donationAmount = parseFloat(document.getElementById('donation-amount').value);
  const donationDate = document.getElementById('donation-date').value;
  const donorComment = document.getElementById('donor-comment').value;

  // Create an object to store the data temporarily
  const donationData = {
    charityName,
    donationAmount,
    donationDate,
    donorComment
  };

  // Validate form data
  if (validateFormData(donationData)) {
    // Store the data in localStorage
    storeDonation(donationData);

    // Reset form after successful submission
    document.getElementById('donation-form').reset();
  }
}

// Function to validate form data
function validateFormData(data) {
  // Check if any required field is empty
  if (!data.charityName || !data.donationAmount || !data.donationDate) {
    alert('Please fill out all required fields.');
    return false;
  }

  // Check if donation amount is a valid positive number
  if (isNaN(data.donationAmount) || data.donationAmount <= 0) {
    alert('Please enter a valid donation amount.');
    return false;
  }

  return true;
}

// Function to store donation data in localStorage
function storeDonation(data) {
  const donations = JSON.parse(localStorage.getItem('donations')) || [];
  donations.push(data);
  localStorage.setItem('donations', JSON.stringify(donations));
}

function loadDonations(donations) {
  const tableBody = document.querySelector("#donation-table-body");

  // Ensure that the table body exists before proceeding
  if (!tableBody) {
    console.error("Table body not found.");
    return;
  }

  donations.forEach((donation) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${donation.charityName}</td>
      <td>${donation.donationAmount}</td>
      <td>${donation.donationDate}</td>
      <td>${donation.donorComment}</td>
    `;
    tableBody.appendChild(row);
  });
}


// Expose functions globally for testing
window.handleDonationFormSubmit = handleDonationFormSubmit;
window.validateFormData = validateFormData;
window.loadDonations = loadDonations;  

module.exports = {
  handleDonationFormSubmit,
  validateFormData,
  loadDonations,
};
