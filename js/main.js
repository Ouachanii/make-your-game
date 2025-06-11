import { GAME_DATA } from './data.js';
import { handleKeyDown } from './player.js';
import { init } from './init.js';
import { startAnimation, stopAnimation, update } from './animation.js';

const pauseButton = document.getElementById("pause-btn");
const pauseMenu = document.getElementById("pause-menu");
const continueButton = document.getElementById("continue-button");
const restartButtons = [
  document.getElementById("restart-button"),
  document.getElementById("restart-btn")
].filter(Boolean);

restartButtons.forEach(restartButton => {
  restartButton.addEventListener("click", () => {

    pauseMenu.classList.add("hidden")

    GAME_DATA.isPaused = false;
    GAME_DATA.isDead = false;
    GAME_DATA.isStarted = true;

    init()

    document.getElementById("lives").textContent = `${GAME_DATA.lives}`;
    document.getElementById("level").textContent = `${GAME_DATA.level}`;
    document.getElementById("score").textContent = `${GAME_DATA.score}`

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

const startMenu = document.getElementById("start-menu");
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {

  startMenu.classList.add("hidden");

  GAME_DATA.isStarted = true;
  GAME_DATA.isPaused = false;
  GAME_DATA.isDead = false;

  startAnimation()

});


document.addEventListener('DOMContentLoaded', init())
