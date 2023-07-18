var today = dayjs();

console.log(today);

// make a variable for the date

// format the date (July 18, 2023)

console.log(dayjs().format("MMMM/DD/YYYY"));

// "Most popular games as of" + dayjs().format("MMMM/DD/YYYY")

// make a variable for the DOM title
var gameMessage = document.getElementById("most-popular-titles");

console.log(gameMessage);

// set textContent to "...."
gameMessage.textContent =
  "Most popular games as of: " + today.format("MMMM-DD-YYYY");
