// donationTracker.test.js

const { updateDonationSummary, handleDeleteButtonClick, initializeDonationTable } = require('./donationTracker.js');

describe('Donation Tracker', () => {
  beforeEach(() => {
    // Mocking localStorage
    global.localStorage = {
      getItem: jest.fn(() => JSON.stringify([
        { id: '1', charityName: 'Charity A', amount: 100, date: '2024-12-01', comment: 'Great cause' },
        { id: '2', charityName: 'Charity B', amount: 50, date: '2024-12-02', comment: 'Nice work' }
      ])),
      setItem: jest.fn(),
    };

    // Mock document structure (mimicking a simple HTML structure for the table)
    document.body.innerHTML = `
      <table>
        <tbody id="donation-table-body"></tbody>
      </table>
      <div id="total-donation-amount">0.00</div>
    `;

    // Initialize the donation table with mock donations
    initializeDonationTable();
  });

  test('should correctly calculate the total donation amount in the summary', () => {
    // We should wait for the table to initialize before making the assertion
    setTimeout(() => {
      // Ensure the total donation amount is correctly displayed
      const totalAmount = document.getElementById('total-donation-amount').textContent;
      expect(totalAmount).toBe('150.00'); // 100 + 50 = 150
    }, 0);
  });

  test('should delete a donation from the DOM when delete button is clicked', () => {
    setTimeout(() => {
      // Find the delete button
      const deleteButton = document.querySelector('.delete-button');

      // Ensure the delete button is found
      expect(deleteButton).not.toBeNull();

      // Simulate a click on the delete button
      deleteButton.click();

      // Check if the row is removed from the DOM
      const rows = document.querySelectorAll('tr');
      expect(rows.length).toBe(1); // One row should remain after deletion (only one donation left)
    }, 0);
  });

  test('should remove the deleted donation from localStorage', () => {
    setTimeout(() => {
      const deleteButton = document.querySelector('.delete-button');

      // Simulate a click on the delete button
      deleteButton.click();

      // Check if localStorage is updated after deletion
      expect(localStorage.setItem).toHaveBeenCalledWith('donations', JSON.stringify([
        { id: '2', charityName: 'Charity B', amount: 50, date: '2024-12-02', comment: 'Nice work' }
      ]));
    }, 0);
  });

  test('should update the total donation amount in the summary after a donation is deleted', () => {
    setTimeout(() => {
      const deleteButton = document.querySelector('.delete-button');

      // Simulate a click on the delete button
      deleteButton.click();

      // Check if the total amount is updated correctly after deletion
      const totalAmount = document.getElementById('total-donation-amount').textContent;
      expect(totalAmount).toBe('50.00'); // After deletion, only the second donation remains
    }, 0);
  });
});
