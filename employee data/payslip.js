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
let currentMonth = new Date().getMonth(); // 0-based, no +1
let currentMonthName = monthNames[currentMonth];
const name = localStorage.getItem("employeeName");
const employeeRole = localStorage.getItem("employeeRole");
const employeeId = localStorage.getItem("employeeId");
const date = localStorage.getItem("date");
const basicSalary = localStorage.getItem("basicSalary");
const totalSalary = localStorage.getItem("totalSalary");
const workingDays = localStorage.getItem("workingDays");
const presentDays = localStorage.getItem("presentDays");
const leaveDays = localStorage.getItem("leaveDays");
const additions = localStorage.getItem("additions");
const deductions = localStorage.getItem("deductions");

let dateParts = date.split("-");
let formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

document.getElementById("name").innerHTML = ` : ${name}`;
document.getElementById("id").innerHTML = `: ${employeeId}`;
document.getElementById("role").innerHTML = ` : ${employeeRole}`;
document.getElementById("date").innerHTML = `  : ${formattedDate}`;
document.getElementById("month").innerHTML = `: ${currentMonthName}`;

document.getElementById("emp_id").innerHTML = employeeId;
document.getElementById("emp_name").innerHTML = name;
document.getElementById("basic_salary").innerHTML = "₹" + basicSalary;
document.getElementById("per_day").innerHTML = "₹" + basicSalary / workingDays;
document.getElementById("present").innerHTML = presentDays;
document.getElementById("leave").innerHTML = leaveDays;
document.getElementById("additions").innerHTML = "₹" + additions;
document.getElementById("deductions").innerHTML = "₹" + deductions;
document.getElementById(
  "total_earnings"
).innerHTML = `<strong> Total Earnings: </strong> ₹${Number(
  basicSalary
).toLocaleString()}`;

document.querySelector("#download_btn2").addEventListener("click", () => {
  const payslip = document.getElementById("payslip_content");
  let downloadSection = document.getElementById("download_btn");
  downloadSection.style.display = "none";

  html2canvas(payslip, {
    scale: 2, // Higher quality
    useCORS: true, // In case you have images
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate image size to fit page
    const imgWidth = pdfWidth - 20; // 10mm padding left and right
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 10;

    // If the image is taller than one page:
    if (imgHeight < pdfHeight) {
      // Single page
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    } else {
      // Multi-page logic:
      let remainingHeight = imgHeight;
      let pageHeight = pdfHeight - 20;

      while (remainingHeight > 0) {
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        remainingHeight -= pageHeight;

        if (remainingHeight > 0) {
          pdf.addPage();
          position = 0;
        }
      }
    }

    pdf.save(`Payslip_${document.getElementById("emp_name").innerText}.pdf`);
  });
});
