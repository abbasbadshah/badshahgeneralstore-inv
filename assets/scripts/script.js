// Array to store item purchases
// Array to store item purchases
let purchases = [];

// Array to store customer details
let customers = [];

function addCustomer() {
  // Get customer details from the form
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  // Get the current date and time
  const dateTime = new Date().toLocaleString();

  // Create customer object
  const customer = {
    name: name,
    phone: phone,
    email: email,
    dateTime: dateTime,
  };

  // Add customer to the customers array
  customers.push(customer);

  // Display the customers in the table
  displayCustomers();

  // Store customer details (you need to implement this)
  // storeCustomerDetails(customer);

  // Hide the form
  document.getElementById("customerForm").style.display = "none";

  // Show the table within a responsive container
  const customerTableContainer = document.getElementById(
    "customerTableContainer"
  );
  customerTableContainer.style.display = "block";

  // Prevent form submission
  return false;
}

function displayCustomers() {
  const table = document.getElementById("customerTable");

  // Clear the table body
  table.innerHTML = "";

  // Add the table heading row
  const headingRow = table.insertRow();
  const heading1 = headingRow.insertCell();
  const heading2 = headingRow.insertCell();
  const heading3 = headingRow.insertCell();
  const heading4 = headingRow.insertCell();

  heading1.textContent = "Name";
  heading2.textContent = "Phone";
  heading3.textContent = "Email";
  heading4.textContent = "Date & Time";

  // Add rows for each customer
  customers.forEach(function (customer) {
    const row = table.insertRow();
    const nameCell = row.insertCell();
    const phoneCell = row.insertCell();
    const emailCell = row.insertCell();
    const dateTimeCell = row.insertCell();

    nameCell.textContent = customer.name;
    phoneCell.textContent = customer.phone;
    emailCell.textContent = customer.email;
    dateTimeCell.textContent = customer.dateTime;
  });
}

function addItem() {
  const purchaseTable = document.getElementById("purchaseTable");

  // Create a new row and cells for the item
  const row = purchaseTable.insertRow();
  const itemNameCell = row.insertCell();
  const rateCell = row.insertCell();
  const quantityCell = row.insertCell();
  const totalCell = row.insertCell();
  const actionsCell = row.insertCell();

  // Create a dropdown list for item selection
  const itemDropdown = document.createElement("select");
  itemDropdown.classList.add("form-select"); // Add Bootstrap class

  itemDropdown.addEventListener("change", updateRate);

  // Add options to the dropdown list
  const items = {
    "Select the item": 0,
    // Disposal Items
    "Bio Cup": 50,
    "Bio Cup (2nd)": 45,
    "Bio Plates (X-Small)": 45,
    "Bio Cup (Mid)": 45,
    "Bio Cup (sq)": 150,
    "Paper Cup (60ml)": 15,
    "Paper Cup (90ml)": 25,
    "Paper Cup (120ml)": 45,
    "Paper Cup (150ml)": 55,
    "Paper Cup (170ml)": 65,
    "Paper Cup (200ml)": 75,
    "Dona (Small)": 15,
    "Dona (Medium)": 20,
    "6 no. Paper Plates (20pc)": 7,
    "7 no. Paper Plates (20pc)": 10,
    "8no. Paper Plates (20pc)": 15,
    "9 no. Paper Plates (20pc)": 20,
    "10 no. Paper Plates (20pc)": 30,
    // Carry Bags items
    "8 x 10 China (1kg)": 130,
    "9 x 13 China (1kg)": 130,
    "13 x 16 China (1kg)": 130,
    "16 x 20 China (1kg)": 130,
    // Parcel items
    // Milkbags items
    // Plastics items
    // Milton Items
    // Birthday Items
    // Toys Items
    // Container items
    // Water Bottles
    // Rapping Items
    // PP bags items
    // DOPP bags items
    "bara dona": 20,
  };

  for (const item in items) {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    itemDropdown.appendChild(option);
  }

  itemNameCell.appendChild(itemDropdown);

  // Create a readonly input field for the rate
  const rateInput = document.createElement("input");
  rateInput.classList.add("form-control"); // Add Bootstrap class
  rateInput.type = "number";
  rateInput.readOnly = true;
  rateCell.appendChild(rateInput);

  // Create an input field for quantity
  const quantityInput = document.createElement("input");
  quantityInput.classList.add("form-control"); // Add Bootstrap class
  quantityInput.type = "number";
  quantityCell.appendChild(quantityInput);

  // Calculate the total for the item
  const calculateTotal = () => {
    const rate = parseFloat(rateInput.value);
    const quantity = parseFloat(quantityInput.value);
    const total = rate * quantity;
    totalCell.textContent = total.toFixed(2);

    calculateTotalPayment();
  };

  // Add event listeners to the inputs to update the total
  quantityInput.addEventListener("input", calculateTotal);

  // Create a remove button
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("btn", "btn-danger"); // Add Bootstrap classes
  removeButton.addEventListener("click", () => {
    removeItem(row);
  });
  actionsCell.appendChild(removeButton);

  // Update the rate based on the selected item
  function updateRate() {
    const selectedItem = itemDropdown.value;
    rateInput.value = items[selectedItem];
    calculateTotal();
  }

  // Set the initial rate based on the first item
  updateRate();

  // Store the item details in the purchases array
  const item = {
    itemName: "",
    rate: 0,
    quantity: 0,
    total: 0,
  };
  purchases.push(item);

  // Update the purchases array with the new item details
  const updateItemDetails = () => {
    item.itemName = itemDropdown.value;
    item.rate = parseFloat(rateInput.value);
    item.quantity = parseFloat(quantityInput.value);
    item.total = item.rate * item.quantity;

    calculateTotalPayment();
  };

  // Add event listeners to the inputs to update the purchases array
  itemDropdown.addEventListener("change", updateItemDetails);
  quantityInput.addEventListener("input", updateItemDetails);
}

function displayPurchases() {
  const table = document.getElementById("purchaseTable");

  // Clear the table body
  table.innerHTML = "";

  // Add the table heading row
  const headingRow = table.insertRow();
  const heading1 = headingRow.insertCell();
  const heading2 = headingRow.insertCell();
  const heading3 = headingRow.insertCell();
  const heading4 = headingRow.insertCell();
  const heading5 = headingRow.insertCell();

  heading1.textContent = "Item Name";
  heading2.textContent = "Rate";
  heading3.textContent = "Quantity";
  heading4.textContent = "Total";
  heading5.textContent = "Actions";

  // Add rows for each purchase
  purchases.forEach(function (purchase, index) {
    const row = table.insertRow();
    const itemNameCell = row.insertCell();
    const rateCell = row.insertCell();
    const quantityCell = row.insertCell();
    const totalCell = row.insertCell();
    const actionsCell = row.insertCell();
    itemNameCell.textContent = purchase.itemName;
    rateCell.textContent = purchase.rate;
    quantityCell.textContent = purchase.quantity;
    totalCell.textContent = purchase.total;

    // Create remove button element
    const removeButton = document.createElement("button");
    removeButton.classList.add("btn", "btn-danger"); // Add Bootstrap classes
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeItem(index);
    });

    // Append the remove button to the actions cell
    actionsCell.appendChild(removeButton);
  });

  // Update the total payment
  calculateTotalPayment();
}

function updatePurchaseRow(index) {
  const purchaseTable = document.getElementById("purchaseTable");

  // Get the row to update
  const row = purchaseTable.rows[index + 1];

  // Update the quantity and total cells
  const quantityCell = row.cells[2];
  const totalCell = row.cells[3];

  const rate = purchases[index].rate;
  const quantity = purchases[index].quantity;
  const total = rate * quantity;

  purchases[index].total = total; // Update the total in the purchases array

  quantityCell.textContent = quantity;
  totalCell.textContent = total;
}

function calculateTotalPayment() {
  let totalPayment = 0;

  // Calculate the total payment from all purchases
  purchases.forEach(function (purchase) {
    totalPayment += purchase.total;
  });

  // Update the total payment input field
  document.getElementById("totalPayment").value = totalPayment;
}

function removeItem(row) {
  const purchaseTable = document.getElementById("purchaseTable");

  // Remove the corresponding purchase from the array
  const index = Array.from(purchaseTable.rows).indexOf(row) - 1;
  purchases.splice(index, 1);

  // Remove the row
  purchaseTable.deleteRow(row.rowIndex);

  // Update the total payment
  calculateTotalPayment();

  // Refresh the input fields for the remaining rows
  refreshInputFields();
}

function refreshInputFields() {
  const purchaseTable = document.getElementById("purchaseTable");

  // Iterate over the rows (skip the header row)
  for (let i = 1; i < purchaseTable.rows.length; i++) {
    const row = purchaseTable.rows[i];
    const quantityInput = row.cells[2].querySelector("input");

    // Update the input field with its current value
    quantityInput.value = purchases[i - 1].quantity;
  }
}

// Function to generate the invoice
function generateInvoice() {
  const customer = {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main Street",
  };

  // Get the table body element
  const tableBody = document.getElementById("itemsTableBody");

  // Create an array to store the purchased items
  const purchases = [];

  // Iterate over each row in the table
  for (let i = 0; i < tableBody.rows.length; i++) {
    const row = tableBody.rows[i];

    const item = row.cells[0].textContent;
    const price = parseFloat(row.cells[1].textContent);
    const quantity = parseInt(row.cells[2].querySelector("input").value);

    purchases.push({ item, price, quantity });
  }

  // Calculate the total payment
  const totalPayment = purchases.reduce((total, purchase) => {
    const itemTotal = purchase.price * purchase.quantity;
    return total + itemTotal;
  }, 0);

  // Generate the invoice HTML
  const invoice = `
    <h2>Invoice</h2>
    <p><strong>Customer Name:</strong> ${customer.name}</p>
    <p><strong>Customer Email:</strong> ${customer.email}</p>
    <p><strong>Customer Address:</strong> ${customer.address}</p>
    <table>
    <tr>
    <th>#</th>
    <th>Item</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Total</th>
    </tr>
    ${purchases
      .map(
        (purchase, index) => `
    <tr>
     <td>${index + 1}</td>
     <td>${purchase.item}</td>
     <td>${purchase.price.toFixed(2)}</td>
     <td>${purchase.quantity}</td>
     <td>${(purchase.price * purchase.quantity).toFixed(2)}</td>
    </tr>
    `
      )
      .join("")}
    <tr>
    <td colspan="4"><strong>Total Payment:</strong></td>
    <td>${totalPayment.toFixed(2)}</td>
    </tr>
    </table>`;

  // Update the invoice HTML
  document.getElementById("invoice").innerHTML = invoice;
}

// Listen for changes in the table
document
  .getElementById("itemsTable")
  .addEventListener("input", generateInvoice);

  function displayAll() {
    // Get customer details
    const customerName = document.getElementById("name").value;
    const customerEmail = document.getElementById("email").value;
    const customerPhone = document.getElementById("phone").value;
    const customerDateTime = new Date().toLocaleString();
  
    // Create the customer details table
    let customerTable = `
      <table  class = "table table-striped">
       <tr>
           <th>Name</th>
           <th>Email</th>
           <th>Phone</th>
           <th>Date & Time</th>
       </tr>
       <tr>
           <td>${customerName}</td>
           <td>${customerEmail}</td>
           <td>${customerPhone}</td>
           <td>${customerDateTime}</td>
       </tr>
      </table>`;
  
    // Create the purchase details table
    let purchaseTable = `
      <table class = "table table-dark">
       <tr>
           <th>Item Name</th>
           <th>Rate</th>
           <th>Quantity</th>
           <th>Total</th>
       </tr>`;
  
    // Add rows for each purchase
    purchases.forEach(function (purchase) {
      purchaseTable += `
       <tr>
           <td>${purchase.itemName}</td>
           <td>${purchase.rate}</td>
           <td>${purchase.quantity}</td>
           <td>${purchase.total}</td>
       </tr>`;
    });
  
    // Calculate the grand total payment
    let grandTotalPayment = 0;
    purchases.forEach(function (purchase) {
      grandTotalPayment += purchase.total;
    });
  
    // Add the grand total row
    purchaseTable += `
      <tr>
       <th colspan="3">Grand Total</th>
       <th>${grandTotalPayment}</th>
      </tr>
      </table>`;
  
    // Display the tables in the displayBill div
    document.getElementById("displayBill").innerHTML =
      customerTable + purchaseTable;
  
    // Hide the customer form after displaying details
    document.getElementById("customerForm").style.display = "none";
  }

function storeCustomerDetails(customer) {
  // Implement Google Sheets integration to store customer details
  // Example code to update Google Sheets using the Sheets API
  // Replace with your own implementation

  // Create a new Google Sheets API client instance
  const sheetsClient = SheetsClient();

  // Get the spreadsheet ID of your Google Sheet
  const spreadsheetId = "YOUR_SPREADSHEET_ID";

  // Define the range where you want to write the customer details
  const range = "Sheet1!A1:C1";

  // Prepare the values to be written to the Google Sheet
  const values = [[customer.name, customer.phone, customer.email]];

  // Update the Google Sheet with the customer details
  sheetsClient
    .writeValues(spreadsheetId, range, values)
    .then(() => {
      console.log("Customer details stored in Google Sheets");
    })
    .catch((error) => {
      console.error("Error storing customer details in Google Sheets:", error);
    });
}

function clearCustomerRecord() {
  customers = [];
  purchases = [];
  displayCustomers();
  displayPurchases();
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  document.getElementById("totalPayment").value = "";
  document.getElementById("displayBill").innerHTML = "";
  document.getElementById("customerForm").style.display = "block";
  const purchaseTableContainer = document.getElementById("purchaseTableContainer");
  purchaseTableContainer.style.display = "none";
  const purchaseTable = document.getElementById("purchaseTable");
  while (purchaseTable.rows.length > 1) {
    purchaseTable.deleteRow(1);
  }
}