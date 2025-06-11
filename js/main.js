import { GAME_DATA } from './data.js';
import { handleKeyDown } from './player.js';
import { init } from './init.js';

const pauseButton = document.getElementById("pause-btn");
const pauseMenu = document.getElementById("pause-menu");
const continueButton = document.getElementById("continue-button");
const restartButton = document.getElementById("restart-btn");
const menu_box = document.getElementsByClassName("menu-box");


pauseButton.addEventListener("click", () => {
  pauseMenu.classList.remove("hidden");
  GAME_DATA.isPaused = true;
});

continueButton.addEventListener("click", () => {
  pauseMenu.classList.add("hidden");
  GAME_DATA.isPaused = false
});

restartButton.addEventListener("click", () => {
  pauseMenu.classList.add("hidden");
  menu_box.classList.add("hidden");
  GAME_DATA.isPaused = false;
  GAME_DATA.isDead = false;
  GAME_DATA.isStarted = true;
  init()

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

});


if (GAME_DATA.isPaused = true) {

  const pauseMenu = document.getElementById("game-over-menu");
  const restartButton = document.getElementById("restart-button");
  const menu_box = document.getElementsByClassName("menu-box");
  restartButton.addEventListener("click", () => {

    menu_box.classList.add("hidden")

    init();

  });

}


document.addEventListener('DOMContentLoaded', init())
