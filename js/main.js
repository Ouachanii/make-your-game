import { GAME_DATA } from './data.js';
import { handleKeyDown } from './player.js';
import { init } from './init.js';
import { startAnimation, stopAnimation, update } from './animation.js';
import { startTimer } from './timer.js';

const pauseButton = document.getElementById("pause-btn");
const pauseMenu = document.getElementById("pause-menu");
const continueButton = document.getElementById("continue-button");
const startMenu = document.getElementById("start-menu");
const gameOverMenu = document.getElementById("game-over-menu")
const startButton = document.getElementById("start-button");
const restartButtons = [
  document.getElementById("restart-button"),
  document.getElementById("restart-btn"),
  document.getElementById("restart-game-over"),
].filter(Boolean);

restartButtons.forEach(restartButton => {
  restartButton.addEventListener("click", () => {

    pauseMenu.classList.add("hidden")
    gameOverMenu.classList.add("hidden")

    GAME_DATA.isPaused = false;
    GAME_DATA.isDead = false;
    GAME_DATA.isStarted = true;
    GAME_DATA.totalSeconds = 180;

    init()

    document.getElementById("lives").textContent = `${GAME_DATA.lives}`;
    document.getElementById("level").textContent = `${GAME_DATA.level}`;
    document.getElementById("score").textContent = `${GAME_DATA.score}`;
    document.getElementById("timer").textContent = "3:00"

    startAnimation()

  });
});


pauseButton.addEventListener("click", () => {
  pauseMenu.classList.remove("hidden");
  GAME_DATA.isPaused = true;
  stopAnimation()
});

continueButton.addEventListener("click", () => {
  pauseMenu.classList.add("hidden");
  GAME_DATA.isPaused = false
  startAnimation()
});


function isArrowOrSpace(key) {
  return ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", " ", "Spacebar", "Space"].includes(key) || key === " ";
}

document.addEventListener('keydown', (e) => {
  if (isArrowOrSpace(e.key) || e.code === "Space") {
    e.preventDefault();
  }
  handleKeyDown(e);
  if (e.key === "p" && !GAME_DATA.isDead) { GAME_DATA.isPaused = true; }
  if (e.key === "r" && !GAME_DATA.isDead) { GAME_DATA.isPaused = false; }
});


////////////////////////////////////


startButton.addEventListener("click", () => { 
  
  GAME_DATA.isStarted = true;
  GAME_DATA.isPaused = false;
  GAME_DATA.isDead = false;

  startMenu.classList.add("hidden");
  console.log(GAME_DATA.isStarted)
  startTimer()
  startAnimation()

});


document.addEventListener('DOMContentLoaded', init())
