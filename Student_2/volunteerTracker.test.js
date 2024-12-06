const { saveDataToLocalStorage, loadDataFromLocalStorage, renderDataIntoTable } = require("./volunteerTracker");

// Mock setup to ensure `localStorage` and DOM exist
beforeEach(() => {
  let store = {};
  global.localStorage = {
    setItem: (key, value) => {
      store[key] = value;
    },
    getItem: (key) => store[key] || null,
    clear: () => (store = {}),
  };

  // Set up a fresh table element in DOM for rendering
  const table = document.createElement("table");
  table.id = "data-table";
  document.body.appendChild(table);
});

afterEach(() => {
  localStorage.clear();
  document.body.innerHTML = "";
});

test("should store data in localStorage", () => {
  const dataToSave = [
    { name: "John Doe", role: "Manager" },
    { name: "Jane Smith", role: "Developer" },
  ];
  saveDataToLocalStorage(dataToSave);

  expect(localStorage.getItem("volunteerData")).not.toBeNull();
  expect(JSON.parse(localStorage.getItem("volunteerData"))).toEqual(dataToSave);
});

test("should load data from localStorage and render into the table", () => {
  const sampleData = [
    { name: "AliceManager", role: "Manager" },
    { name: "BobDeveloper", role: "Developer" },
  ];

  // Simulate saving data to localStorage
  localStorage.setItem("volunteerData", JSON.stringify(sampleData));

  // Force rendering
  renderDataIntoTable();

  // Wait for DOM rendering to stabilize using setTimeout
  setTimeout(() => {
    const tableRows = document.querySelectorAll("#data-table tr");

    console.log("Table rows after rendering:", tableRows);

    expect(tableRows.length).toBe(2);
    expect(tableRows[0].innerText).toContain("AliceManager");
    expect(tableRows[1].innerText).toContain("BobDeveloper");
  }, 0);
});
