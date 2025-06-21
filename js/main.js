import { GAME_DATA } from './data.js';
import { handleKeyDown } from './player.js';
import { init } from './init.js';
import { startAnimation} from './animation.js';
import { startTimer } from './timer.js';


document.addEventListener('DOMContentLoaded', init())

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
];



startButton.addEventListener("click", () => {

  GAME_DATA.isStarted = true;
  GAME_DATA.isPaused = false;
  GAME_DATA.isDead = false;

  startMenu.classList.add("hidden");
  console.log(GAME_DATA.isStarted)
  startTimer()
  startAnimation()

});

pauseButton.addEventListener("click", () => {
  pauseMenu.classList.remove("hidden");
  GAME_DATA.isPaused = true;
});

continueButton.addEventListener("click", () => {
  pauseMenu.classList.add("hidden");
  GAME_DATA.isPaused = false;
  startAnimation();
});

restartButtons.forEach(restartButton => {
  restartButton.addEventListener("click", () => {

    pauseMenu.classList.add("hidden")
    gameOverMenu.classList.add("hidden")
console.log("restart clicked")
    GAME_DATA.isPaused = false;
    GAME_DATA.isDead = false;
    GAME_DATA.isStarted = true;
    GAME_DATA.totalSeconds = 180;
    GAME_DATA.animationId = null;
    init()

    document.getElementById("lives").textContent = `${GAME_DATA.lives}`;
    document.getElementById("level").textContent = `${GAME_DATA.level}`;
    document.getElementById("score").textContent = `${GAME_DATA.score}`;
 

    startAnimation()

  });
});

function isArrowOrSpace(key) {
  return ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", " ", "Spacebar", "Space"].includes(key) || key === " ";
}



document.addEventListener('keydown', (e) => {
  if (isArrowOrSpace(e.key) || e.code === "Space") {
    e.preventDefault();
  }
  handleKeyDown(e);
});



let clicked = false;



document.addEventListener('keyup', (e) => {
  if (isArrowOrSpace(e.key) || e.code === "Space") {
    e.preventDefault();
  }
  switch (e.key) {
    case "p":
      if (!clicked && GAME_DATA.isStarted) {
        GAME_DATA.isPaused = true;
        clicked = true
        document.getElementById("pause-menu").classList.remove("hidden")
    
    
      } else if (clicked && GAME_DATA.isStarted) {
        GAME_DATA.isPaused = false
        clicked = false
        startAnimation();
        document.getElementById("pause-menu").classList.add("hidden")
      }
      break
    case "r":

     if (GAME_DATA.isStarted) {
      pauseMenu.classList.add("hidden")
    gameOverMenu.classList.add("hidden")
 
    GAME_DATA.isPaused = false;
    GAME_DATA.isDead = false;
    GAME_DATA.isStarted = true;
    GAME_DATA.totalSeconds = 180;
    GAME_DATA.animationId = null;
    init()

    document.getElementById("lives").textContent = `${GAME_DATA.lives}`;
    document.getElementById("level").textContent = `${GAME_DATA.level}`;
    document.getElementById("score").textContent = `${GAME_DATA.score}`;
 

    startAnimation()
      break
  }
  }
});