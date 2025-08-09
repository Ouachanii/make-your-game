import { GAME_DATA } from './data.js';
import { handleKeyDown, handleKeyUp } from './player.js';
import { init } from './init.js';
import { startAnimation } from './animation.js';
import { updateAllCellSizes } from './grid.js';

const pauseButton = document.getElementById("pause-btn");
const pauseMenu = document.getElementById("pause-menu");
const continueButton = document.getElementById("continue-button");
const startMenu = document.getElementById("start-menu");
const gameOverMenu = document.getElementById("game-over-menu");
const startButton = document.getElementById("start-button");
const winMenu = document.getElementById("win-menu");

document.addEventListener("DOMContentLoaded", () => {
  updateCellSize();
  init();
})

if (startButton) {
  startButton.addEventListener("click", () => {
    GAME_DATA.isStarted = true;
    GAME_DATA.isPaused = false;
    GAME_DATA.isDead = false;
    startMenu.classList.add("hidden");
    startAnimation();
  });
}

if (pauseButton) {
  pauseButton.addEventListener("click", () => {
    pauseMenu.classList.remove("hidden");
    GAME_DATA.isPaused = true;
  });
}

if (continueButton) {
  continueButton.addEventListener("click", () => {
    pauseMenu.classList.add("hidden");
    GAME_DATA.isPaused = false;
    startAnimation();
  });
}

const restartButtons = [
  document.getElementById("restart-button"),
  document.getElementById("restart-btn"),
  document.getElementById("restart-game-over"),
  document.getElementById("restart-win"),
].filter(Boolean);

restartButtons.forEach(restartButton => {
  restartButton.addEventListener("click", () => {
    if (GAME_DATA.isStarted) {
      if (pauseMenu) pauseMenu.classList.add("hidden")
      if (gameOverMenu) gameOverMenu.classList.add("hidden")
      if (winMenu) winMenu.classList.add("hidden")

      GAME_DATA.isPaused = false;
      GAME_DATA.isDead = false;
      GAME_DATA.isStarted = true;
      GAME_DATA.totalSeconds = 180;
      GAME_DATA.level = 1;
      GAME_DATA.lives = 3;
      GAME_DATA.score = 0;
      GAME_DATA.animationId = null;
      init()

      document.getElementById("lives").textContent = `${GAME_DATA.lives}`;
      document.getElementById("level").textContent = `${GAME_DATA.level}`;
      document.getElementById("score").textContent = `${GAME_DATA.score}`;

      startAnimation()
    }
  });
});

if (winMenu) {
  const nextLevelBtn = winMenu.querySelector("#next-level-btn");
  if (nextLevelBtn) {
    nextLevelBtn.addEventListener("click", () => {
      winMenu.classList.add("hidden");
      GAME_DATA.isPaused = false;
      GAME_DATA.isStarted = true;
      GAME_DATA.level++;
      if (GAME_DATA.level > 5) {
        GAME_DATA.level = 1;
      }
      GAME_DATA.bombThrowed = false;
      GAME_DATA.bombedCells = [];
      GAME_DATA.bombPos = {};

      init();

      const livesEl = document.getElementById("lives");
      const levelEl = document.getElementById("level");
      const scoreEl = document.getElementById("score");

      if (livesEl) livesEl.textContent = `${GAME_DATA.lives}`;
      if (levelEl) levelEl.textContent = `${GAME_DATA.level}`;
      if (scoreEl) scoreEl.textContent = `${GAME_DATA.score}`;

      startAnimation();
    });
  }
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

window.addEventListener('resize', updateCellSize);


function isArrowOrSpace(key) {
  return ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", " ", "Spacebar", "Space"].includes(key) || key === " ";
}

function updateAllPositions() {
  // updat player position
  const player = document.getElementById('player');
  if (player && GAME_DATA.playerPos) {
    player.style.transform = `translate(${GAME_DATA.playerPos.y * GAME_DATA.cellSize}px, ${GAME_DATA.playerPos.x * GAME_DATA.cellSize}px)`;
  }
  // updte enmies
  if (GAME_DATA.enemies) {
    GAME_DATA.enemies.forEach(enemy => {
      if (enemy.el) {
        enemy.el.style.transform = `translate(${enemy.y * GAME_DATA.cellSize}px, ${enemy.x * GAME_DATA.cellSize}px)`;
      }
    });
  }
  // bmb + explosion
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