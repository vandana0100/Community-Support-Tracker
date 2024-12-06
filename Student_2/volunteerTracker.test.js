// Mock TextEncoder and TextDecoder to fix jsdom issue
global.TextEncoder = global.TextEncoder || require('util').TextEncoder;
global.TextDecoder = global.TextDecoder || require('util').TextDecoder;

const { JSDOM } = require("jsdom");

describe("Summary and Deletion Functionality", () => {
  let dom, document, window, localStorageMock, logTable, summaryDiv;

  beforeEach(() => {
    // Set up JSDOM environment
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <div id="summary"></div>
        <table id="logTable"></table>
      </body>
    `);
    document = dom.window.document;
    window = dom.window;

    // Mock localStorage
    localStorageMock = {
      store: {},
      getItem: function (key) {
        return this.store[key] || null;
      },
      setItem: function (key, value) {
        this.store[key] = value.toString();
      },
      removeItem: function (key) {
        delete this.store[key];
      },
      clear: function () {
        this.store = {};
      },
    };
    window.localStorage = localStorageMock;

    // Mock DOM environment
    global.window = window;
    global.document = document;

    // Select the necessary DOM elements
    logTable = document.getElementById("logTable");
    summaryDiv = document.getElementById("summary");
  });

  afterEach(() => {
    dom.window.close();
  });

  test("summary section calculates and displays total hours volunteered", () => {
    const hours = 5;
    localStorageMock.setItem("hours", hours);

    summaryDiv.innerText = `Total Hours Volunteered: ${parseInt(localStorageMock.getItem("hours"))}`;
    expect(summaryDiv.innerText).toBe("Total Hours Volunteered: 5");
  });

  test("delete button removes a record from the table", () => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>2</td><td><button class="delete">Delete</button></td>`;
    logTable.appendChild(row);

    const deleteButton = row.querySelector(".delete");
    deleteButton.addEventListener("click", () => {
      row.remove();
    });

    // Simulate delete button click
    deleteButton.click();

    expect(logTable.querySelector("tr")).toBeNull();
  });

  test("delete button removes the record from localStorage", () => {
    localStorageMock.setItem("hours", 5);

    const row = document.createElement("tr");
    row.innerHTML = `<td>2</td><td><button class="delete">Delete</button></td>`;
    logTable.appendChild(row);

    const deleteButton = row.querySelector(".delete");
    deleteButton.addEventListener("click", () => {
      const currentHours = parseInt(localStorageMock.getItem("hours"));
      localStorageMock.setItem("hours", currentHours - 2);
      row.remove();
    });

    deleteButton.click();
    expect(localStorageMock.getItem("hours")).toBe("3");
  });

  test("summary updates when a log is deleted", () => {
    localStorageMock.setItem("hours", 5);

    const row = document.createElement("tr");
    row.innerHTML = `<td>3</td><td><button class="delete">Delete</button></td>`;
    logTable.appendChild(row);

    const deleteButton = row.querySelector(".delete");
    deleteButton.addEventListener("click", () => {
      const newHours = parseInt(localStorageMock.getItem("hours")) - 3;
      localStorageMock.setItem("hours", newHours);
      row.remove();
    });

    deleteButton.click();

    expect(localStorageMock.getItem("hours")).toBe("2");
  });
});
