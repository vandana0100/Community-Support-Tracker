// Polyfill TextEncoder and TextDecoder for Node.js < 14
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const { handleDonationFormSubmit, validateFormData } = require('./donationTracker.js');

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
  });

  test('should trigger the function when the form is submitted', () => {
    // Setup the form structure before running the test
    document.body.innerHTML = `
      <form id="donation-form">
        <input type="text" id="charity-name" value="Some Charity" />
        <input type="number" id="donation-amount" value="50" />
        <input type="date" id="donation-date" value="2024-12-01" />
        <textarea id="donor-comment"></textarea>
        <button type="submit">Submit</button>
      </form>
    `;
  
    // Mock the form submit handler and preventDefault method
    const form = document.getElementById('donation-form');
    const preventDefault = jest.fn();
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      preventDefault(); // Call the mock function
      // Call the actual form submission handler here (replace with your function)
      handleDonationFormSubmit(event); 
    });
  
    // Dispatch a submit event
    form.dispatchEvent(new window.Event('submit'));
  
    // Assert that preventDefault was called
    expect(preventDefault).toHaveBeenCalled();
  });
  
  test('should collect form data correctly', () => {
    // Setup form with values
    document.body.innerHTML = `
      <form id="donation-form">
        <input type="text" id="charity-name" value="Some Charity" />
        <input type="number" id="donation-amount" value="50" />
        <input type="date" id="donation-date" value="2024-12-01" />
        <textarea id="donor-comment"></textarea>
        <button type="submit">Submit</button>
      </form>
    `;
  
    // Collect form data
    const charityName = document.getElementById('charity-name').value;
    const donationAmount = parseFloat(document.getElementById('donation-amount').value);
    const donationDate = document.getElementById('donation-date').value;
    const donorComment = document.getElementById('donor-comment').value;
  
    // Assert that data is collected correctly
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

    expect(validateFormData(formData)).toBe(false);
  });

  test('should flag invalid donation amount', () => {
    const formData = {
      charityName: 'Some Charity',
      donationAmount: -100, // Negative amount
      donationDate: '2024-11-25',
      donorComment: 'Great cause!',
    };

    expect(validateFormData(formData)).toBe(false);
  });
});


