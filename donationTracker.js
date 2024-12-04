// Sample data for testing purposes
const donations = [
  { charityName: "Charity A", donationAmount: 100, donationDate: "2024-12-01", donorComment: "Good cause" },
  { charityName: "Charity B", donationAmount: 200, donationDate: "2024-12-02", donorComment: "Keep it up" },
];

// Function to render the donation table
const renderDonationTable = () => {
  const tableBody = document.getElementById("donation-table-body");
  tableBody.innerHTML = ""; // Clear any existing rows

  donations.forEach((donation, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${donation.charityName}</td>
          <td>${donation.donationAmount}</td>
          <td>${donation.donationDate}</td>
          <td>${donation.donorComment || "No comment provided"}</td>
          <td><button class="delete-btn" data-index="${index}">Delete</button></td>
      `;
      tableBody.appendChild(row);
  });

  // Attach event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
      button.addEventListener("click", handleDeleteDonation);
  });
};

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
  const charityName = document.getElementById("charity-name").value.trim();
  const donationAmount = parseFloat(document.getElementById("donation-amount").value.trim());
  const donationDate = document.getElementById("donation-date").value.trim();
  const donorComment = document.getElementById("donor-message").value.trim();

  // Create an object to store the data temporarily
  const donationData = {
      charityName,
      donationAmount,
      donationDate,
      donorComment,
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
      // Add the new donation to the array
      donations.push(donationData);

      // Re-render the table with updated data
      renderDonationTable();

      // Reset form after successful submission
      document.getElementById("donation-form").reset();

      // Provide feedback to the user
      alert("Donation successfully added!");
  }
}

// Function to validate form data
function validateFormData(data) {
  // Check if any required field is empty
  if (!data.charityName || !data.donationAmount || !data.donationDate) {
      alert("Please fill out all required fields.");
      return false;
  }

  // Check if donation amount is a valid positive number
  if (isNaN(data.donationAmount) || data.donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return false;
  }

  return true;
}

// Function to handle donation deletion
function handleDeleteDonation(event) {
  const index = event.target.getAttribute("data-index");
  donations.splice(index, 1); // Remove the donation at the specified index
  renderDonationTable(); // Re-render the table
}

// Attach form submit handler
document.getElementById("donation-form").addEventListener("submit", handleDonationFormSubmit);

// Render the table after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderDonationTable();
});
