// volunteerTracker.test.js

// Mocking DOM elements to simulate the form
document.body.innerHTML = `
  <form id="volunteer-form">
    <input id="charity-name" type="text" />
    <input id="hours-volunteered" type="number" />
    <input id="volunteer-date" type="date" />
    <input id="experience-rating" type="number" />
    <button type="submit">Submit</button>
  </form>
`;

const volunteerTracker = require('./volunteerTracker'); // Assuming the JS code is in volunteerTracker.js

describe('Volunteer Hours Tracker Form Tests', () => {
  
  beforeEach(() => {
    // Clear any existing data or events before each test
    jest.clearAllMocks();
  });

  test('should trigger function on form submission', () => {
    const submitSpy = jest.spyOn(volunteerTracker, 'handleSubmit');
    const form = document.getElementById('volunteer-form');
    
    form.dispatchEvent(new Event('submit'));

    expect(submitSpy).toHaveBeenCalled();
  });

  test('should collect form data correctly', () => {
    // Fill the form with mock data
    document.getElementById('charity-name').value = 'Red Cross';
    document.getElementById('hours-volunteered').value = '5';
    document.getElementById('volunteer-date').value = '2024-11-01';
    document.getElementById('experience-rating').value = '4';

    const submitEvent = new Event('submit');
    const form = document.getElementById('volunteer-form');
    form.dispatchEvent(submitEvent);
    
    // Check the data collected by the function (You can adjust the function to return data)
    expect(volunteerTracker.volunteerData).toEqual({
      charityName: 'Red Cross',
      hoursVolunteered: 5,
      volunteerDate: '2024-11-01',
      experienceRating: 4,
    });
  });

  test('should validate required fields', () => {
    document.getElementById('charity-name').value = '';
    document.getElementById('hours-volunteered').value = '5';
    document.getElementById('volunteer-date').value = '';
    document.getElementById('experience-rating').value = '4';

    const form = document.getElementById('volunteer-form');
    const submitEvent = new Event('submit');
    form.dispatchEvent(submitEvent);

    expect(alert).toHaveBeenCalledWith("Please fill in all required fields.");
  });

  test('should validate hours volunteered', () => {
    document.getElementById('charity-name').value = 'Red Cross';
    document.getElementById('hours-volunteered').value = '-5'; // Invalid hours
    document.getElementById('volunteer-date').value = '2024-11-01';
    document.getElementById('experience-rating').value = '4';

    const form = document.getElementById('volunteer-form');
    const submitEvent = new Event('submit');
    form.dispatchEvent(submitEvent);

    expect(alert).toHaveBeenCalledWith("Please enter a valid number for hours volunteered.");
  });

  test('should validate experience rating', () => {
    document.getElementById('charity-name').value = 'Red Cross';
    document.getElementById('hours-volunteered').value = '5';
    document.getElementById('volunteer-date').value = '2024-11-01';
    document.getElementById('experience-rating').value = '6'; // Invalid rating

    const form = document.getElementById('volunteer-form');
    const submitEvent = new Event('submit');
    form.dispatchEvent(submitEvent);

    expect(alert).toHaveBeenCalledWith("Please select a valid experience rating (1 to 5).");
  });

  test('should populate temporary data object with form data', () => {
    document.getElementById('charity-name').value = 'Red Cross';
    document.getElementById('hours-volunteered').value = '5';
    document.getElementById('volunteer-date').value = '2024-11-01';
    document.getElementById('experience-rating').value = '4';

    const form = document.getElementById('volunteer-form');
    const submitEvent = new Event('submit');
    form.dispatchEvent(submitEvent);

    // Check if the data object was populated correctly
    expect(volunteerTracker.volunteerData).toEqual({
      charityName: 'Red Cross',
      hoursVolunteered: 5,
      volunteerDate: '2024-11-01',
      experienceRating: 4,
    });
  });
});
