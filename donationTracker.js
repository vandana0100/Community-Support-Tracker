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
      // Log the temporary data object to the console
      console.log(donationData);
  
      // Optionally, you can store the data in an array, or in localStorage
      // storeDonation(donationData);
      
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
  // Export the functions for testing
module.exports = { handleDonationFormSubmit, validateFormData };


  