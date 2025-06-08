function formaValidation(event) {
  event.preventDefault(); // Stops form submission
  const employeeName = document.getElementById("employeeName").value;
  const employeeRole = document.getElementById("employeeRole").value;
  const employeeId = document.getElementById("employeeId").value;
  const date = document.getElementById("date").value;
  const basicSalary = document.getElementById("basicSalary").value;
  const totalSalary = document.getElementById("totalSalary").value;
  const workingDays = document.getElementById("workingDays").value;
  const presentDays = document.getElementById("presentDays").value;
  const leaveDays = document.getElementById("leaveDays").value;
  const additions = document.getElementById("additions").value;
  const deductions = document.getElementById("deductions").value;

  if (
    employeeName &&
    employeeId &&
    employeeRole &&
    date &&
    basicSalary &&
    presentDays &&
    additions
  ) {
    localStorage.setItem("employeeName", employeeName);
    localStorage.setItem("employeeRole", employeeRole);
    localStorage.setItem("employeeId", employeeId);
    localStorage.setItem("date", date);
    localStorage.setItem("basicSalary", basicSalary);
    localStorage.setItem("totalSalary", totalSalary);
    localStorage.setItem("workingDays", workingDays);
    localStorage.setItem("presentDays", presentDays);
    localStorage.setItem("leaveDays", leaveDays);
    localStorage.setItem("additions", additions);
    localStorage.setItem("deductions", deductions);

    window.location.href = "payslip.html";
  } else {
    alert("Enter the Payroll Details ");
  }
}

function getInputValues() {
  const currentMonth = document.getElementById("current_month").value;
  const employeeName = document.getElementById("employeeName").value;
  const employeeRole = document.getElementById("employeeRole").value;
  const employeeId = document.getElementById("employeeId").value;
  const date = document.getElementById("date").value;
  const basicSalary = document.getElementById("basicSalary").value;
  const totalSalary = document.getElementById("totalSalary").value;
  const workingDays = document.getElementById("workingDays").value;
  const presentDays = document.getElementById("presentDays").value;
  const leaveDays = document.getElementById("leaveDays").value;
  const additions = document.getElementById("additions").value;
  const deductions = document.getElementById("deductions").value;

  if (currentMonth) {
    showWorkingDays();
  }
}

function getDeductionValues() {
  const basicSalary =
    parseFloat(document.getElementById("basicSalary").value) || 0;
  const workingDays =
    parseInt(document.getElementById("workingDays").value) || 0;
  const presentDays =
    parseInt(document.getElementById("presentDays").value) || 0;
  const additions = parseFloat(document.getElementById("additions").value) || 0;

  const leaveDaysInput = document.getElementById("leaveDays");
  const deductionsInput = document.getElementById("deductions");
  const totalSalaryInput = document.getElementById("totalSalary");

  // Auto-calculate leave days
  let leaveDays = 0;
  if (presentDays < workingDays) {
    leaveDays = workingDays - presentDays;
  }
  leaveDaysInput.value = leaveDays;

  // Calculate deduction
  let calculatedDeduction = 0;
  let netSalary = basicSalary; // start with base

  if (leaveDays > 0 && basicSalary > 0 && workingDays > 0) {
    const perDaySalary = basicSalary / workingDays;
    calculatedDeduction = perDaySalary * leaveDays;
    deductionsInput.value = calculatedDeduction.toFixed();

    // Subtract deduction from basic
    netSalary = basicSalary - calculatedDeduction;
  } else {
    deductionsInput.value = "0";
  }

  // Add any additions (bonuses, etc.)
  netSalary += additions;

  // Update total salary
  totalSalaryInput.value = netSalary.toFixed();
}

//  function pdfDownload
function pdfDownload() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Read form values

  const employeeName = document.getElementById("employeeName").value;
  const employeeRole = document.getElementById("employeeRole").value;
  const employeeId = document.getElementById("employeeId").value;
  const date = document.getElementById("date").value;
  const basicSalary = document.getElementById("basicSalary").value;
  const totalSalary = document.getElementById("totalSalary").value;
  const workingDays = document.getElementById("workingDays").value;
  const presentDays = document.getElementById("presentDays").value;
  const leaveDays = document.getElementById("leaveDays").value;
  const additions = document.getElementById("additions").value;
  const deductions = document.getElementById("deductions").value;
  if (
    (employeeName == "",
    employeeRole == "",
    employeeId == "",
    date == "",
    basicSalary == "",
    totalSalary == "",
    workingDays == "",
    presentDays == "",
    leaveDays == "",
    additions == "",
    deductions == "")
  ) {
    alert("Enter the Payroll Details before download");
  } else {
    // Build PDF content
    doc.setFontSize(16);
    doc.text("Payroll Details", 20, 20);

    doc.setFontSize(12);
    let y = 40;
    const lineHeight = 10;

    const data = [
      `Employee Name: ${employeeName}`,
      `Employee Role: ${employeeRole}`,
      `Employee Id: ${employeeId}`,
      `Date: ${date}`,
      `Basic Salary: ${basicSalary}`,
      `Total Salary: ${totalSalary}`,
      `No of Working Days: ${workingDays}`,
      `Total Present Days: ${presentDays}`,
      `Total Leave Days: ${leaveDays}`,
      `Additions: ${additions}`,
      `Deductions: ${deductions}`,
    ];

    data.forEach((line) => {
      doc.text(line, 20, y);
      y += lineHeight;
    });

    // Save PDF
    doc.save("Payroll_Details.pdf");
  }
}

function countWeekdaysInMonth(event) {
  const now = new Date();
  const year = now.getFullYear();
  const month = Number(event);

  const totalDays = new Date(year, month + 1, 0).getDate();
  console.log("Total days:", totalDays);

  let dayCount = 0;

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);

    // Exclude Sundays only
    if (date.getDay() !== 0) {
      // 0 = Sunday
      dayCount++;
    }
  }

  if (event != "") {
    document.getElementById("workingDays").value = dayCount;
  } else {
    document.getElementById("workingDays").value = "";
  }

  return dayCount;
}

function check() {
  let value = localStorage.getItem("employeeName");

  if (value) {
    window.location.href = "payslip.html";
  } else {
    alert(" Enter the Employee Payroll Details");
  }
}

function userLoginCheck() {
  let value = sessionStorage.getItem("username");
   
  if (!value) {
       
    window.location.href = "login.html";  } 
}
