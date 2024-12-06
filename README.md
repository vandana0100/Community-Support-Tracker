# Community Support Tracker 

## Overview  
The **Community Support Tracker Project** is a front-end application aimed at supporting PiXELL River Financial's mission of enhancing community engagement. The project includes three main components:  
1. **Donation Tracker** - Led by Vandana Bhangu (Student 1)  
2. **Volunteer Hours Tracker**  
3. **Event Signup**  

This project provides a seamless user experience for tracking donations, volunteer hours, and event signups, with a focus on accessibility and responsive design.

---

## Project Features  

### Donation Tracker  - Stage One
The Donation Tracker is designed to simplify the process of managing and recording donations.  
**Key Features:**  
- A user-friendly form to input donation details (charity name, amount, date, and donor comments).  
- Responsive design for compatibility across devices.  
- Clean and intuitive layout for effective data visualization.  

**Student Contribution:**  
Vandana Bhangu takes the lead in implementing this feature, ensuring it meets design standards, usability, and functionality requirements. 

# Donation Tracker - Stage Two

## Overview

The **Donation Tracker** helps users track donations to charities. In **Stage Two**, the app includes:
- **Total Donation Summary**: Dynamically calculates and displays the total donation amount.
- **Donation Deletion**: Allows users to delete donations from the table and `localStorage`.

## Features
- **Total Donation Calculation**: The total donation amount is automatically updated in the summary section.
- **Donation Deletion**: Donations can be removed from both the table and `localStorage` when the "Delete" button is clicked.
- **Persistence**: Donations are stored in `localStorage`, so they persist even after page reloads.

## Files
- `donationTracker.js`: Contains the logic for updating the total donation and deleting donations.
- `donationTracker.test.js`: Jest tests to verify the correct functionality of the app.
- `index.html`: The HTML structure for the donation table and summary.
- `style.css`: Styling for the app.

## Usage
1. Open `index.html` in your browser.
2. Donations will be displayed from `localStorage` and can be deleted.
3. The total donation amount will update automatically after deletion.

**Created by Vandana Bhangu**


---

### Volunteer Hours Tracker  
Volunteer Hours Tracker (Led by Amandeep Kaur)
The Volunteer Hours Tracker is a feature within the Community Support Tracker project designed to allow volunteers to log their contributions. This tool enables users to input details about their volunteer hours, helping organizations track and recognize volunteer efforts.

Key Features:

Form for Logging Volunteer Hours:
Charity Name: Volunteers can enter the name of the organization they contributed to.
Hours Volunteered: The form includes a field for the number of hours volunteered.
Date: Volunteers can select the date when the activity took place.
Experience Rating: A drop-down rating system to assess the volunteer's experience from 1 (poor) to 5 (excellent).
Validation:
Ensures all fields are filled out correctly.
Checks if the "hours volunteered" is a valid number (e.g., no negative values).
Ensures the experience rating is between 1 and 5.
Responsive Design:
The form works well on both desktop and mobile devices.
Amandeep's Role:
Amandeep Kaur is responsible for developing this feature, ensuring the form is user-friendly, and implementing the necessary validation to ensure correct data input. Amandeep also focuses on making sure the tracker is responsive and integrates smoothly with the overall Community Support Tracker.


### Volunteer Tracker - stage 2

##  **Overview**

The **Volunteer Tracker** is a web application designed to allow users to track and log their volunteer hours. In **Stage Two**, the app includes:

- **Summary Section**: Dynamically calculates and displays the total hours volunteered.  
- **Log Deletion**: Allows users to delete log entries from both the table and `localStorage`.  

---

## **Features**

- **Total Hours Summary**: Automatically calculates and updates the summary section to show the total hours volunteered.  
- **Log Deletion**: Each log entry in the table includes a **"Delete"** button, allowing users to remove the log from both the visible table and `localStorage`.  
- **Persistence**: Volunteer logs are saved using `localStorage` so that data remains even after reloading the page.

---

##  **Files**

The following files are part of this implementation:

- **`volunteerTracker.js`**: Contains logic for updating the summary and implementing deletion functionality.  
- **`volunteerTracker.test.js`**: Jest test suite to verify that deletion and summary updates work as expected.  
- **`volunteer_tracker.html`**: The HTML layout for the volunteer logs table and summary section.  

Created by Amandeep Kaur

---





### Event Signup  
