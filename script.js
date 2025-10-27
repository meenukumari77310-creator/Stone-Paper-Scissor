const buttons = document.querySelectorAll(".choice");
const userScoreEle = document.getElementById("user-score");
const compScoreEle = document.getElementById("comp-score");
const userChoiceEle = document.getElementById("user-choice");
const compChoiceEle = document.getElementById("comp-choice");
const resultEle = document.getElementById("result");
const roundEle = document.getElementById("round");
const resetBtn = document.getElementById("reset");

let userScore = 0;
let compScore = 0;
let round = 1;

const choices = ["rock", "paper", "scissor"];
const emojis = { rock: "🧱", paper: "📄", scissor: "✂️" };

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const userChoice = btn.id;
    const compChoice = getComputerChoice();
    playRound(userChoice, compChoice);
  });
});

resetBtn.addEventListener("click", resetGame);

function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

function playRound(userChoice, compChoice) {
  userChoiceEle.textContent = emojis[userChoice];
  compChoiceEle.textContent = emojis[compChoice];
  let resultText = "";
  resultEle.classList.remove("win", "lose", "tie");

  if (userChoice === compChoice) {
    resultText = "It's a tie!";
    resultEle.classList.add("tie");
  } else if (
    (userChoice === "rock" && compChoice === "scissor") ||
    (userChoice === "paper" && compChoice === "rock") ||
    (userChoice === "scissor" && compChoice === "paper")
  ) {
    userScore++;
    userScoreEle.textContent = userScore;
    resultText = `You win! ${capitalize(userChoice)} beats ${capitalize(
      compChoice
    )}`;
    resultEle.classList.add("win");
  } else {
    compScore++;
    compScoreEle.textContent = compScore;
    resultText = `You lose! ${capitalize(compChoice)} beats ${capitalize(
      userChoice
    )}`;
    resultEle.classList.add("lose");
  }

  resultEle.textContent = resultText;
  round++;
  roundEle.textContent = round;
}

function resetGame() {
  userScore = 0;
  compScore = 0;
  round = 1;
  userScoreEle.textContent = userScore;
  compScoreEle.textContent = compScore;
  roundEle.textContent = round;
  userChoiceEle.textContent = "❔";
  compChoiceEle.textContent = "❔";
  resultEle.textContent = "Make your move!";
  resultEle.classList.remove("win", "lose", "tie");
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
