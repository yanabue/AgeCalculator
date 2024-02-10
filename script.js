const dayBox = document.getElementById("dayinput");
const monthBox = document.getElementById("monthinput");
const yearBox = document.getElementById("yearinput");
const button = document.getElementById("calculatebtn");

const daysError = document.getElementById("dayserror");
const daysSpan = document.getElementById("daysspan");

const monthsError = document.getElementById("monthserror");
const monthsSpan = document.getElementById("monthsspan");

const yearsError = document.getElementById("yearserror");
const yearsSpan = document.getElementById("yearsspan");

const yearsResultSpan = document.getElementById("yearsresult");
const monthsResultSpan = document.getElementById("monthsresult");
const daysResultSpan = document.getElementById("daysresult");


button.onclick = proccessDate;

let errorState = false;
let secondErrorState = false;

function proccessDate() {
  const dayValue = dayBox.value;
  const monthValue = monthBox.value;
  const yearValue = yearBox.value;

  checkErrors(dayValue, monthValue, yearValue);
}

function checkErrors(day, month, year) {
  resetErrors();
  

  if (
    !(day >= 1 && day <= 31 && parseFloat(day) === Math.floor(parseFloat(day)))
  ) {
    secondErrorState = true;
    if (
      day <= 0 ||
      day > 31 ||
      parseFloat(day) !== Math.floor(parseFloat(day))
    ) {
      handleError(dayBox, daysSpan, daysError, "Must be a valid day");
    }
    if (day === "") {
      handleError(dayBox, daysSpan, daysError, "This field is required");
    }
  }

  if (
    !(
      month >= 1 &&
      month <= 12 &&
      parseFloat(month) === Math.floor(parseFloat(month))
    ) 
  ) {
    secondErrorState = true;
    if (
      month < 1 ||
      month > 12 ||
      parseFloat(month) !== Math.floor(parseFloat(month))
    ) {
      handleError(monthBox, monthsSpan, monthsError, "Must be a valid month");
    }
    if (month === "") {
      handleError(monthBox, monthsSpan, monthsError, "This field is required");
    }
  }

  if (year === "" || parseFloat(year) !== Math.floor(parseFloat(year)) || year < 0) {
    secondErrorState = true;
    if (year === "") {
      handleError(yearBox, yearsSpan, yearsError, "This field is required");
    }
    if (year !== "" && parseFloat(year) !== Math.floor(parseFloat(year)) || year < 0) {
      handleError(yearBox, yearsSpan, yearsError, "Must be a valid year");
    }
  }

  let currentDate = new Date();
  let inputDateString = `${year}-${month}-${day}`;
  let inputDate = new Date(inputDateString);

  if (inputDate > currentDate) {
    secondErrorState = true;
    handleError(yearBox, yearsSpan, yearsError, "Must be in the past");
    handleError(monthBox, monthsSpan, monthsError, "");
    handleError(dayBox, daysSpan, daysError, "");
  }

  isDateValid(year,month,day,currentDate,inputDate);
}

function isDateValid(year,month,day,currentDate,inputDate){
  if (
    inputDate.getFullYear() !== year &&
    inputDate.getMonth() !== month - 1 &&
    inputDate.getDate() !== day && !secondErrorState 
  ) {
    handleError(dayBox, daysSpan, daysError, "Enter a valid date");
    handleError(monthBox, monthsSpan,monthsError, "");
    handleError(yearBox, yearsSpan,yearsError, "");
  }

  calculateAge(currentDate, inputDate);
}


function handleError(inputBox, span, errorP, errorMessage) {
  inputBox.style.borderColor = "hsl(0, 100%, 67%)";
  span.style.color = "hsl(0, 100%, 67%)";
  errorP.innerText = errorMessage;
  errorState = true;
}

function resetErrors() {
  dayBox.style.borderColor = "";
  daysSpan.style.color = "";
  daysError.innerText = "";

  monthBox.style.borderColor = "";
  monthsSpan.style.color = "";
  monthsError.innerText = "";

  yearBox.style.borderColor = "";
  yearsSpan.style.color = "";
  yearsError.innerText = "";
  
  errorState = false;
  secondErrorState = false;
}

function calculateAge(today, input) {
  if (!errorState) {

    let yearDifference = today.getFullYear() - input.getFullYear();
    let monthDifference = today.getMonth() - input.getMonth();
    let dayDifference = today.getDate()- input.getDate();

if (monthDifference < 0){
    yearDifference--;
    monthDifference = 12 + monthDifference;
}
if (dayDifference < 0){
    monthDifference--;
    dayDifference = 30 + dayDifference;
}

yearsResultSpan.innerText = yearDifference;
monthsResultSpan.innerText = monthDifference;
daysResultSpan.innerText = dayDifference;

  }
}
