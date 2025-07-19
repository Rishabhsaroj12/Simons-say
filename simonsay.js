let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "purple", "green"];
let highscore = 0;
let start = false;
let level = 0;

const levelDisplay = document.querySelector("#level");
const highscoreDisplay = document.querySelector("#highscore");
const startBtn = document.querySelector("#start-btn");
const statusMsg = document.querySelector("#status-msg");
const body = document.querySelector("body");
const clickSound = new Audio("sounds/click.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");


startBtn.addEventListener("click", () => {
  if (!start) {
    start = true;
    level = 0;
    gameseq = [];
    userseq = [];
    levelDisplay.textContent = "1";
    statusMsg.textContent = "Watch and repeat!";
    levelup();
  }
});

function gameflash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 200);
}

function levelup() {
  userseq = [];
  level++;
  levelDisplay.textContent = level;
  statusMsg.textContent = `Level ${level}`;

  let randidx = Math.floor(Math.random() * 4);
  let randcolor = btns[randidx];
  let randbtn = document.querySelector(`.${randcolor}`);

  gameseq.push(randcolor);
  gameflash(randbtn);
}

function btnpress() {
  if (!start) return;
  


  let btn = this;
  let usercolor = btn.getAttribute("id");
  clickSound.currentTime = 0;
  clickSound.play();
  userflash(btn);
  userseq.push(usercolor);

  checkans(userseq.length - 1);
}

function checkans(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  wrongSound.play();
  if (level > highscore) {
    highscore = level;
    highscoreDisplay.textContent = `High Score: ${highscore}`;
  }

  statusMsg.textContent = `❌ Game Over at level ${level}. Click "Start Game" to try again.`;

  body.classList.add("game-over");
  setTimeout(() => body.classList.remove("game-over"), 300);

  reset();
}



function reset() {
  start = false;
  gameseq = [];
  userseq = [];
  level = 0;
  levelDisplay.textContent = "0";
}

const allbtns = document.querySelectorAll(".btn");
allbtns.forEach(btn => {
  btn.addEventListener("click", btnpress);
});

// rules
const rulesBtn = document.getElementById("rules-btn");
const rulesModal = document.getElementById("rules-modal");
const closeBtn = document.querySelector(".close");

rulesBtn.addEventListener("click", () => {
  rulesModal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  rulesModal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === rulesModal) {
    rulesModal.classList.add("hidden");
  }
});

