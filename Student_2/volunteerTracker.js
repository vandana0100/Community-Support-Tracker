// Function to handle form submission
document.getElementById('volunteer-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Collect form data
    const charityName = document.getElementById('charity-name').value;
    const hoursVolunteered = parseFloat(document.getElementById('hours-volunteered').value);
    const volunteerDate = document.getElementById('volunteer-date').value;
    const experienceRating = parseInt(document.getElementById('experience-rating').value);
  
    // Create temporary data object
    const volunteerData = {
      charityName: charityName,
      hoursVolunteered: hoursVolunteered,
      volunteerDate: volunteerDate,
      experienceRating: experienceRating
    };
  
    // Validate form data
    if (!charityName || !volunteerDate) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (isNaN(hoursVolunteered) || hoursVolunteered <= 0) {
      alert("Please enter a valid number for hours volunteered.");
      return;
    }
  
    if (isNaN(experienceRating) || experienceRating < 1 || experienceRating > 5) {
      alert("Please select a valid experience rating (1 to 5).");
      return;
    }
  
    // Log data to console (can be replaced with an API call or localStorage for real usage)
    console.log('Volunteer Data:', volunteerData);
  
    // Optionally reset the form after submission
    document.getElementById('volunteer-form').reset();
  });
  