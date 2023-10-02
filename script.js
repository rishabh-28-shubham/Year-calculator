// Elements
const dayIn = document.getElementById('dayIn');
const monthIn = document.getElementById('monthIn');
const yearIn = document.getElementById('yearIn');
const dayOut = document.getElementById('dayOut');
const monthOut = document.getElementById('monthOut');
const yearOut = document.getElementById('yearOut');
const calculateBtn = document.getElementById('calculateBtn');
const errorStyle = '0.5px solid var(--Light-red)';

// Calculate Button
calculateBtn.addEventListener('click', () => {
  const day = dayIn.value;
  const month = monthIn.value;
  const year = yearIn.value;
  const birthday = `${year}-${month}-${day}`;

  if (validateDay(day, month, year) && validateMonth(month) && validateYear(year, month, day)) {
    console.log('Done');
  } else {
    return;
  }

  const birthDate = new Date(birthday);
  const currentDate = new Date();
  console.log(birthDate.getTime());
  const timeDiff = currentDate.getTime() - birthDate.getTime();

  // Age Calculation
  let years = new Date().getFullYear() - new Date(birthday).getFullYear();
  let months = new Date().getMonth() - new Date(birthday).getMonth();
  let days = new Date().getDate() - Number(day);
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  // Handle negative months and days
  if (months < 0) {
    years = years - 1;
    months = months + 12;
  }
  if (days < 0) {
    days += getNoOfDays(year, month - 1);
  }

  // Display Values
  dayOut.innerText = days;
  monthOut.innerText = months;
  yearOut.innerText = years;
  document.getElementById('hourOut').innerText = hours;
  document.getElementById('minuteOut').innerText = minutes;
});

// Get Number of Days in a particular month
function getNoOfDays(year, month) {
  return new Date(year, month, 0).getDate();
}

/*================ on Blur Validation =========================*/

// On Blur day validation
dayIn.addEventListener('blur', () => {
  validateDay(dayIn.value, monthIn.value, yearIn.value);
});

// On Blur month validation
monthIn.addEventListener('blur', () => {
  validateMonth(monthIn.value);
});

// On Blur Year validate
yearIn.addEventListener('blur', () => {
  validateYear(yearIn.value, monthIn.value, dayIn.value);
});

// Validate Day
function validateDay(day, month, year) {
  if (day == '') {
    showMessage(dayIn, 'This field is required', errorStyle);
    return false;
  } else if (!validDay(year, month, day)) {
    showMessage(dayIn, 'Must be a valid day', errorStyle);
    return false;
  } else {
    showMessage(dayIn, '', '');
    return true;
  }
}

// Validate Month
function validateMonth(month) {
  if (month == '') {
    showMessage(monthIn, 'This field is required', errorStyle);
    return false;
  } else if (!validMonth(month)) {
    showMessage(monthIn, 'Must be a valid month', errorStyle);
    return false;
  } else {
    showMessage(monthIn, '', '');
    return true;
  }
}

// Validate Year
function validateYear(year, month, day) {
  if (year == '') {
    showMessage(yearIn, 'This field is required', errorStyle);
    return false;
  } else if (!validYear(year, month, day)) {
    showMessage(yearIn, 'Must be in the past', errorStyle);
    return false;
  } else {
    showMessage(yearIn, '', '');
    return true;
  }
}

// Display Message
function showMessage(elem, msg, border) {
  elem.style.border = border;
  elem.nextElementSibling.innerText = msg;
}
