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

  if (basicSalary > 0 && totalSalaryInput.value === "") {
    totalSalaryInput.value = basicSalary.toFixed();
    return;
  }

  if (presentDays === 0 && totalSalaryInput.value > 0) {
    totalSalaryInput.value = additions;
    deductionsInput.value = basicSalary;
    leaveDaysInput.value=workingDays
    return;
  }

  // Calculate leave days if Present Days is entered and Working Days > 0
  let leaveDays = 0;
  if (workingDays > 0 && presentDays < workingDays) {
    leaveDays = workingDays - presentDays;
  }
  leaveDaysInput.value = leaveDays;

  //  Calculate deductions based on leave days
  let calculatedDeduction = 0;
  let netSalary = basicSalary;

  if (leaveDays > 0 && basicSalary > 0 && workingDays > 0) {
    const perDaySalary = basicSalary / workingDays;
    calculatedDeduction = perDaySalary * leaveDays;
    deductionsInput.value = calculatedDeduction.toFixed();

    // Subtract deduction from basic salary
    netSalary = basicSalary - calculatedDeduction;
  } else {
    deductionsInput.value = "0";
  }

  // Add any additions (bonuses, etc.)
  if (netSalary > 0) {
    netSalary += additions;
  } else {
    netSalary = "0";
  }

  //Update Total Salary (after deductions and additions)
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

var month;
function countWeekdaysInMonth(event) {
  const now = new Date();
  const year = now.getFullYear();
  month = Number(event);

  const totalDays = new Date(year, month + 1, 0).getDate();
  console.log("Total days:", totalDays);

  // let dayCount = 0;
  // for (let day = 1; day <= totalDays; day++) {
  //   const date = new Date(year, month, day);
  //   if (date.getDay() !== 0) {
  //     dayCount++;
  //   }
  // }

  if (event !== "") {
    document.getElementById("workingDays").value = totalDays;
    toggleFormFields(false);
    document.getElementById("month_alert_msg").style.display = "none";
    formaValidation(event);
  } else {
    document.getElementById("workingDays").value = "";
    toggleFormFields(true);
    document.getElementById("month_alert_msg").style.display = "display";
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
    window.location.href = "login.html";
  }
}
let alertShown = false;

function toggleFormFields(disabled) {
  const formElements = document.querySelectorAll(
    "#myForm input, #myForm select, #myForm button.submit"
  );

  formElements.forEach((element) => {
    if (
      element.id !== "current_month" &&
      !element.classList.contains("cancel")
    ) {
      element.disabled = disabled;
    }
  });
}

function clearMonth() {
  document.getElementById("current_month").value = "";
  document.getElementById("month_alert_msg").style.display = "display";
  month = "";
  toggleFormFields(true);
}
