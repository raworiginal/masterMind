/* Constants */
const colors = ["yellow", "orange", "red", "purple", "blue", "green"];

/* Query Selectors */
const controlBtns = document.querySelector(".controls");
const guessRows = document.querySelectorAll(".guess-container");

/* Variables */
let currentRow;
let secretCode;
let currentGuess;
let currentGuessBoxes;

/* Functions */
function init() {
  currentRow = 0;
  getSecretCode();
  currentGuess = [];
}
function handleClick(event) {
  if (
    event.target.classList.contains("color") &&
    currentGuess.length < 4 &&
    !currentGuess.includes(event.target.id)
  ) {
    currentGuess.push(event.target.id);
  }
  if (event.target.id === "submit" && currentGuess.length === 4) {
    currentGuess = [];
    currentRow++;
  }
  if (event.target.id === "delete" && currentGuess) {
    currentGuess.pop();
  }
  if (event.target.id === "clear") {
    currentGuess = [];
  }
  updateBoard();
}
function getSecretCode() {
  secretCode = [];
  while (secretCode.length < 4) {
    randomColor = colors[math.randomInt(colors.length)];
    if (!secretCode.includes(randomColor)) {
      secretCode.push(randomColor);
    }
  }
}
function updateBoard() {
  console.log(currentRow);
  currentGuessBoxes = guessRows[currentRow].querySelectorAll(".guess-box");
  for (let i = 0; i < currentGuessBoxes.length; i++) {
    if (currentGuess[i]) {
      currentGuessBoxes[i].style.backgroundColor = currentGuess[i];
    } else {
      currentGuessBoxes[i].style.backgroundColor = "white";
    }
  }
  console.log(currentGuessBoxes);
}
/* Init & Event Listenters */
init();
console.log(secretCode);
controlBtns.addEventListener("click", handleClick);
