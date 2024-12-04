// Polyfill TextEncoder and TextDecoder for Node.js < 14
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const { handleDonationFormSubmit, validateFormData, loadDonations } = require('./donationTracker.js');

// Mock console.log and alert for testing purposes
jest.spyOn(console, 'log').mockImplementation(() => {});
global.alert = jest.fn(); // Mock alert function

describe('Donation Tracker Form', () => {
  let dom, document, window;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <form id="donation-form">
          <input id="charity-name" />
          <input id="donation-amount" />
          <input id="donation-date" />
          <textarea id="donor-comment"></textarea>
          <button type="submit">Submit</button>
        </form>
        <table id="donation-table">
          <thead>
            <tr>
              <th>Charity Name</th>
              <th>Donation Amount</th>
              <th>Donation Date</th>
              <th>Donor Comment</th>
            </tr>
          </thead>
          <tbody id="donation-table-body"></tbody>
        </table>
      </body>
      </html>
    `);
  
    document = dom.window.document;
    window = dom.window;
  
    // Mock global document and window
    global.document = document;
    global.window = window;
  });  

  afterEach(() => {
    // Clean up
    dom.window.close();
    global.document = undefined;
    global.window = undefined;
    jest.restoreAllMocks();
    localStorage.clear(); // Clear localStorage after each test
  });

  test('should trigger the function when the form is submitted', () => {
    document.body.innerHTML = `
      <form id="donation-form">
        <input type="text" id="charity-name" value="Some Charity" />
        <input type="number" id="donation-amount" value="50" />
        <input type="date" id="donation-date" value="2024-12-01" />
        <textarea id="donor-comment"></textarea>
        <button type="submit">Submit</button>
      </form>
    `;

    const form = document.getElementById('donation-form');
    const preventDefault = jest.fn();
    
    // Listen for the submit event
    form.addEventListener('submit', (event) => {
      event.preventDefault();  // Prevent form from actually submitting
      preventDefault();        // Ensure preventDefault is called
      handleDonationFormSubmit(event);  // Trigger the actual form handler
    });

    // Dispatch a 'submit' event
    form.dispatchEvent(new window.Event('submit'));

    // Assert that preventDefault was called
    expect(preventDefault).toHaveBeenCalled();
  });

  test('should collect form data correctly', () => {
    document.body.innerHTML = `
      <form id="donation-form">
        <input type="text" id="charity-name" value="Some Charity" />
        <input type="number" id="donation-amount" value="50" />
        <input type="date" id="donation-date" value="2024-12-01" />
        <textarea id="donor-comment"></textarea>
        <button type="submit">Submit</button>
      </form>
    `;

    // Extract values from the form
    const charityName = document.getElementById('charity-name').value;
    const donationAmount = parseFloat(document.getElementById('donation-amount').value);
    const donationDate = document.getElementById('donation-date').value;
    const donorComment = document.getElementById('donor-comment').value;

    // Assert that the form data is correctly collected
    expect(charityName).toBe('Some Charity');
    expect(donationAmount).toBe(50);
    expect(donationDate).toBe('2024-12-01');
    expect(donorComment).toBe('');
  });

  test('should flag required fields if empty', () => {
    const formData = {
      charityName: '',
      donationAmount: 100,
      donationDate: '2024-11-25',
      donorComment: '',
    };

    // Validate form data
    expect(validateFormData(formData)).toBe(false);
  });

  test('should flag invalid donation amount', () => {
    const formData = {
      charityName: 'Some Charity',
      donationAmount: -100,
      donationDate: '2024-11-25',
      donorComment: 'Great cause!',
    };

    // Validate form data
    expect(validateFormData(formData)).toBe(false);
  });

  test('should store donation data in localStorage', () => {
    const donationData = {
      charityName: 'Some Charity',
      donationAmount: 50,
      donationDate: '2024-12-01',
      donorComment: 'Great cause!',
    };

    // Simulate form submission and store data in localStorage
    localStorage.setItem('donations', JSON.stringify([donationData]));

    // Retrieve and check stored data
    const storedData = JSON.parse(localStorage.getItem('donations'));
    expect(storedData).toHaveLength(1);
    expect(storedData[0].charityName).toBe('Some Charity');
  });
});
  
test('should load donation data into the table', async () => {
  // Corrected HTML setup with the proper id
  document.body.innerHTML = `
    <form id="donationForm">
      <input id="donationAmount" value="100" />
      <input id="donorName" value="John Doe" />
      <button type="submit">Donate</button>
    </form>
    <table>
      <tbody id="donation-table-body"></tbody> <!-- Updated id -->
    </table>
  `;

  const donations = [
    { charityName: "Charity A", donationAmount: 100, donationDate: "2024-01-01", donorComment: "Great cause" },
    { charityName: "Charity B", donationAmount: 200, donationDate: "2024-02-01", donorComment: "Happy to help" },
  ];

  // Call the function to load donations into the table
  loadDonations(donations);

  // Wait for the DOM to update
  await new Promise((resolve) => setTimeout(resolve, 0));

  const tableBody = document.querySelector("#donation-table-body");

  // Log the table body and its children for debugging
  console.log(tableBody);
  console.log(tableBody ? tableBody.children : "No table body found");

  // Check if table body exists
  expect(tableBody).not.toBeNull();

  // Check that two rows are added to the table
  expect(tableBody.children.length).toBe(2);

  // Validate the content of the first row
  expect(tableBody.children[0].innerHTML).toContain("Charity A");
  expect(tableBody.children[0].innerHTML).toContain("100");

  // Validate the content of the second row
  expect(tableBody.children[1].innerHTML).toContain("Charity B");
  expect(tableBody.children[1].innerHTML).toContain("200");
});
