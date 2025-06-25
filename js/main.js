import { GAME_DATA } from './data.js';
import { handleKeyDown, handleKeyUp } from './player.js';
import { init } from './init.js';
import { startAnimation } from './animation.js';
import { startTimer } from './timer.js';
import { updateAllCellSizes } from './grid.js';


document.addEventListener('DOMContentLoaded', init())

const pauseButton = document.getElementById("pause-btn");
const pauseMenu = document.getElementById("pause-menu");
const continueButton = document.getElementById("continue-button");
const startMenu = document.getElementById("start-menu");
const gameOverMenu = document.getElementById("game-over-menu")
const startButton = document.getElementById("start-button");
const winMenu = document.getElementById("win-menu");

winMenu.querySelector("#next-level-btn").addEventListener("click", () => {
  winMenu.classList.add("hidden");
  GAME_DATA.isPaused = false;
  init();
  //console.log("level initialized")
  startAnimation();
  //console.log("animation started")
}
);

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
  //console.log(GAME_DATA.isStarted)
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
    winMenu.classList.add("hidden")
    //console.log("restart clicked")
    GAME_DATA.isPaused = false;
    GAME_DATA.isDead = false;
    GAME_DATA.isStarted = true;
    GAME_DATA.level = 1;
    GAME_DATA.score = 0;
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


document.addEventListener('keyup', (e) => {
  if (isArrowOrSpace(e.key) || e.code === "Space") {
    e.preventDefault();
  }
  handleKeyUp(e);
});

function updateAllPositions() {
  // Update player position
  const player = document.getElementById('player');
  if (player && GAME_DATA.playerPos) {
    player.style.transform = `translate(${GAME_DATA.playerPos.y * GAME_DATA.cellSize}px, ${GAME_DATA.playerPos.x * GAME_DATA.cellSize}px)`;
  }
  // Update enemies
  if (GAME_DATA.enemies) {
    GAME_DATA.enemies.forEach(enemy => {
      if (enemy.el) {
        enemy.el.style.transform = `translate(${enemy.y * GAME_DATA.cellSize}px, ${enemy.x * GAME_DATA.cellSize}px)`;
      }
    });
  }
  // Update bombs/explosions if you use similar positioning
  document.querySelectorAll('.bomb, .explosion').forEach(el => {
    if (el.dataset.x && el.dataset.y) {
      el.style.transform = `translate(${el.dataset.y * GAME_DATA.cellSize}px, ${el.dataset.x * GAME_DATA.cellSize}px)`;
    }
  });
}

function updateCellSize() {
  const gameArea = document.querySelector('.game-area');
  if (!gameArea) return;
  const width = gameArea.offsetWidth;
  const height = gameArea.offsetHeight;
  GAME_DATA.cellSize = Math.min(Math.floor(width / 15), Math.floor(height / 13));
  document.documentElement.style.setProperty('--cell-size', `${GAME_DATA.cellSize}px`);
  updateAllCellSizes();
  updateAllPositions();
}

window.addEventListener('resize', updateCellSize);
document.addEventListener('DOMContentLoaded', () => {
  updateCellSize();
  init();
});