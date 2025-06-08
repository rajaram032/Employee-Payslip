function displayName() {
  const savedName = sessionStorage.getItem("username");
  const greetingElement = document.getElementById("greeting");

  if (savedName) {
    const capitalizedName =
      savedName.charAt(0).toUpperCase() + savedName.slice(1);
    greetingElement.innerHTML = "Welcome, " + capitalizedName;
  }
}

displayName();

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
// Current date
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth(); // 0-based, no +1
console.log(currentYear);
console.log(currentMonth);

function createCalender(year, month) {
  const date = new Date(year, month);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Set month/year text
  let year_month = `${monthNames[date.getMonth()]} ${year}`;
  document.getElementById("calender_info").innerHTML = year_month;

  // Render days header
  let tableDays = document.getElementById("days");
  tableDays.innerHTML = ""; // Clear previous content
  for (let i = 0; i < days.length; i++) {
    let td = document.createElement("td");
    td.innerHTML = days[i];
    tableDays.appendChild(td);
  }

  // Calculate first day of month and number of days
  let firstDay = new Date(year, month, 1).getDay();
  let numberOfDays = new Date(year, month + 1, 0).getDate();

  // Render dates
  let tableDates = document.getElementById("dates");
  tableDates.innerHTML = ""; // Clear previous content

  let tr = document.createElement("tr");
  const today = new Date();

  // Empty cells for first day
  for (let i = 0; i < firstDay; i++) {
    let td = document.createElement("td");
    td.innerHTML = "";
    tr.appendChild(td);
  }

  // Actual dates
  for (let i = 1; i <= numberOfDays; i++) {
    let td = document.createElement("td");
    td.innerHTML = i;

    // 🔥 Highlight today's date
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      td.classList.add("today");
    }

    tr.appendChild(td);

    // If end of week, append row and start new one
    if ((i + firstDay) % 7 === 0) {
      tableDates.appendChild(tr);
      tr = document.createElement("tr");
    }
  }

  // Append any remaining row
  if (tr.children.length > 0) {
    tableDates.appendChild(tr);
  }
}

createCalender(currentYear, currentMonth);

function check() {
  let value = localStorage.getItem("employeeName");

  if (value) {
    window.location.href = "payslip.html";
  } else {
    alert("First You Enter the Employee Payroll Details");
    window.location.href = "payroll.html";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".fa-less-than").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    createCalender(currentYear, currentMonth);
  });

  document.querySelector(".fa-greater-than").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    createCalender(currentYear, currentMonth);
  });
});


