/* ======================= Constants ======================= */
const colors = ["yellow", "orange", "red", "purple", "blue", "green"];
const resultColors = {
  fullyCorrect: "lightseagreen",
  halfCorrect: "pink",
  wrong: "slategrey",
};
const backgroundMusic = new Audio(
  "./assets/sneaky-spy-quirky-and-fun-music-248801.mp3"
);
const submitSound = new Audio("./assets/notification-ping-372479.mp3");
const loseSound = new Audio(
  "./assets/8-bit-video-game-fail-version-3-145479.mp3"
);
const winSound = new Audio("./assets/winsquare-6993.mp3");
const buttonSound = new Audio("./assets/mech-keyboard-02-102918.mp3");

/* ======================= Query Selectors ======================= */
const controlBtns = document.querySelector("#game-controls");
const guessRows = document.querySelectorAll(".guess-container");
const resultRows = document.querySelectorAll(".result-container");
const gameBoard = document.querySelector("#game-board");
const gameDisplay = document.querySelector("#game-display");
const gameInstructions = document.querySelector("#game-instructions");
const playBtn = document.querySelector(".play-btn");
const gameOver = document.querySelector("#game-over");
const playAgainBtn = gameOver.querySelector(".play-btn");
const winMsg = gameOver.querySelector(".win-msg");
const answerBoxes = gameOver.querySelectorAll(".guess-box");
const muteButton = document.querySelector("#mute-button");
const soundButton = document.querySelector("#sound-button");

/* ======================= Variables ======================= */
let currentRow;
let secretCode;
let currentGuess;
let currentGuessBoxes;
let currentResultPegs;
let currentResults;
let win;
let previousGuesses;
/* ======================= Functions ======================= */
function init() {
  clearBoard();
  currentRow = 0;
  getSecretCode();
  currentGuess = [];
  currentResults = [];
  previousGuesses = [];
  win = false;
}
function handleClick(event) {
  if (
    event.target.classList.contains("color") &&
    currentGuess.length < 4 &&
    !win
  ) {
    buttonSound.volume = 1;
    buttonSound.play();
    currentGuess.push(event.target.id);
  }
  if (
    event.target.id === "submit" &&
    currentGuess.length === 4 &&
    !previousGuesses.includes(currentGuess.join(" "))
  ) {
    submitSound.volume = 0.5;
    submitSound.play();
    checkWin();
    previousGuesses.push(currentGuess.join(" "));
    currentGuess = [];
    if (currentRow < 9) {
      currentRow++;
    }
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
    secretCode.push(randomColor);
  }
  console.log(secretCode);
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
  for (i = 0; i < currentResultPegs.length; i++) {
    if (currentResults[i]) {
      currentResultPegs[i].style.backgroundColor = currentResults[i];
    } else {
      currentResultPegs[i].style.backgroundColor = "white";
    }
  }
}

function checkWin() {
  for (let i = 0; i < currentGuess.length; i++) {
    if (currentGuess[i] === secretCode[i]) {
      currentResults.push(resultColors.fullyCorrect);
    } else if (secretCode.includes(currentGuess[i])) {
      currentResults.push(resultColors.halfCorrect);
    } else {
      currentResults.push(resultColors.wrong);
    }
  }
  currentResults.sort();

  if (
    currentResults.length === 4 &&
    currentResults.every((peg) => peg === resultColors.fullyCorrect)
  ) {
    win = true;
  }
  if (win || currentRow === 9) {
    updateGameOver();
    backgroundMusic.pause();

    gameOver.showModal();
    if (win) {
      winSound.volume = 1;
      winSound.play();
    } else {
      loseSound.volume = 1;
      loseSound.play();
    }
  }
  updateBoard();
  currentResults = [];
}

function updateGameOver() {
  let i = 0;
  answerBoxes.forEach((box) => {
    box.style.backgroundColor = secretCode[i];
    i++;
  });
  if (win) {
    winMsg.textContent = "You're a WINNER!";
  } else {
    winMsg.textContent = "You're a LOSER!";
  }
}
function clearBoard() {
  guessRows.forEach((row) => {
    boxes = row.querySelectorAll(".guess-box");
    boxes.forEach((box) => {
      box.style.backgroundColor = "white";
    });
  });
  resultRows.forEach((row) => {
    pegs = row.querySelectorAll(".peg");
    pegs.forEach((peg) => {
      peg.style.backgroundColor = "white";
    });
  });
}
/* ======================= Init & Event Listenters ======================= */
document.addEventListener("DOMContentLoaded", () => {
  gameInstructions.showModal();
});
controlBtns.addEventListener("click", handleClick);

playBtn.addEventListener("click", () => {
  gameInstructions.close();
  init();
  backgroundMusic.volume = 0.5;
  backgroundMusic.play();
  backgroundMusic.loop = true;
});

muteButton.addEventListener("click", () => {
  backgroundMusic.volume = 0.0;
  muteButton.classList.toggle("hidden");
  soundButton.classList.toggle("hidden");
});

soundButton.addEventListener("click", () => {
  backgroundMusic.volume = 0.5;
  muteButton.classList.toggle("hidden");
  soundButton.classList.toggle("hidden");
});

playAgainBtn.addEventListener("click", () => {
  gameOver.close();
  backgroundMusic.play();

  init();
});
