/* ======================= Constants ======================= */
const colors = ["yellow", "orange", "red", "purple", "blue", "green"];
const resultColors = { fullyCorrect: "lightblue", halfCorrect: "pink" };

/* ======================= Query Selectors ======================= */
const controlBtns = document.querySelector(".controls");
const guessRows = document.querySelectorAll(".guess-container");
const resultRows = document.querySelectorAll(".result-container");
const gameBoard = document.querySelector("#game-board");
const gameDisplay = document.querySelector("#game-display");
const gameControls = document.querySelector("#game-controls");
const gameInstructions = document.querySelector("game-instructions");

/* ======================= Variables ======================= */
let currentRow;
let secretCode;
let currentGuess;
let currentGuessBoxes;
let currentResultPegs;
let currentResults;
let win;
/* ======================= Functions ======================= */
function init() {
  currentRow = 0;
  toggleActive();
  getSecretCode();
  currentGuess = [];
  currentResults = [];
  win = false;
}
function handleClick(event) {
  if (
    event.target.classList.contains("color") &&
    currentGuess.length < 4 &&
    !currentGuess.includes(event.target.id) &&
    !win
  ) {
    currentGuess.push(event.target.id);
  }
  if (event.target.id === "submit" && currentGuess.length === 4) {
    checkWin();
    currentGuess = [];
    toggleActive();
    currentRow++;
    toggleActive();
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
  currentGuessBoxes = guessRows[currentRow].querySelectorAll(".guess-box");
  for (let i = 0; i < currentGuessBoxes.length; i++) {
    if (currentGuess[i]) {
      currentGuessBoxes[i].style.backgroundColor = currentGuess[i];
    } else {
      currentGuessBoxes[i].style.backgroundColor = "white";
    }
  }
  currentResultPegs = resultRows[currentRow].querySelectorAll(".peg");
  for (i = 0; i < currentResults.length; i++) {
    if (currentResults[i]) {
      currentResultPegs[i].style.backgroundColor = currentResults[i];
    }
  }
}

function checkWin() {
  for (let i = 0; i < currentGuess.length; i++) {
    if (currentGuess[i] === secretCode[i]) {
      currentResults.push(resultColors.fullyCorrect);
    } else if (secretCode.includes(currentGuess[i])) {
      currentResults.push(resultColors.halfCorrect);
    }
  }
  currentResults.sort();

  updateBoard();
  if (
    currentResults.length === 4 &&
    currentResults.every((peg) => peg === "lightblue")
  ) {
    win = true;
    alert("Winner"); // This is temporary
  } else if (currentRow === 9) {
    alert("Loser!");
  }
  currentResults = [];
}

function toggleActive() {
  guessRows[currentRow].classList.toggle("active");
  resultRows[currentRow].classList.toggle("active");
}
/* ======================= Init & Event Listenters ======================= */
init();
controlBtns.addEventListener("click", handleClick);
