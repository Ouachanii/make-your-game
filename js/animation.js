import { GAME_DATA } from './data.js';
import { endReached, HandleLose } from './endGame.js';
import { bombedArea, decoloreCell } from './bomb.js';
import { updateEnemies } from './enemies.js';
import { spawnEnemies } from './init.js';
import { createPlayer, updatePlayerSprite } from './player.js';
import { startTimer, stopTimer } from './timer.js';

// Constants for the game loop
const FRAME_RATE = 60;
const FRAME_TIME = 1000 / FRAME_RATE;
const MAX_FRAME_TIME = 5 * FRAME_TIME; // Prevent spiral of death

// Game state flags
let scoreUpdateNeeded = false;
let cachedPlayerEl = null;
let cachedLivesEl = null;
let cachedScoreEl = null;

// Animation state
let previousTime = 0;
let lag = 0;

// Initialize cached elements
function initCachedElements() {
  cachedPlayerEl = document.getElementById("player");
  cachedLivesEl = document.getElementById("lives");
  cachedScoreEl = document.getElementById("score");
}

let lastFrameTime = performance.now();
let frameCount = 0;
let fps = 0;
let avgFrameTime = 0;
let minFrameTime = Infinity;
let maxFrameTime = 0;
let droppedFrames = 0;
let fpsLastUpdate = performance.now();
const fpsCounter = typeof window !== 'undefined' ? document.getElementById('fps-counter') : null;

function updateFPS(now) {
  frameCount++;
  const delta = now - lastFrameTime;
  lastFrameTime = now;
  avgFrameTime += delta;
  if (delta < minFrameTime) minFrameTime = delta;
  if (delta > maxFrameTime) maxFrameTime = delta;
  if (delta > 20) droppedFrames++;
  if (now - fpsLastUpdate > 1000) {
    fps = frameCount;
    const avg = avgFrameTime / frameCount;
    let warning = droppedFrames > 0 ? `<span style='color:#ff0'>Dropped: ${droppedFrames}</span>` : '';
    if (fpsCounter) {
      fpsCounter.innerHTML = `FPS: ${fps}<br>Frame: ${avg.toFixed(1)} ms` +
        `<br>Min: ${minFrameTime.toFixed(1)} ms` +
        `<br>Max: ${maxFrameTime.toFixed(1)} ms` +
        (warning ? `<br>${warning}` : '');
    }
    frameCount = 0;
    avgFrameTime = 0;
    minFrameTime = Infinity;
    maxFrameTime = 0;
    droppedFrames = 0;
    fpsLastUpdate = now;
  }
}
function gameUpdate() {
  updatePlayerSprite(performance.now());
  updateEnemies();

  // Check player collision with bomb
  if (bombedArea(GAME_DATA.playerPos.x, GAME_DATA.playerPos.y) && !GAME_DATA.isPaused) {
    if (cachedPlayerEl) {
      cachedPlayerEl.remove();
      cachedPlayerEl = null;
    }

    // Remove enemies efficiently
    const enemies = document.getElementsByClassName("enemy");
    while (enemies.length > 0) {
      enemies[0].remove();
    }

    GAME_DATA.lives--;
    if (GAME_DATA.lives < 0) GAME_DATA.lives = 0;
    if (cachedLivesEl) cachedLivesEl.textContent = `${GAME_DATA.lives}`;

    if (GAME_DATA.lives === 0 || GAME_DATA.totalSeconds <= 0) {
      HandleLose();
      return;
    }

    GAME_DATA.score = Math.max(0, GAME_DATA.score - 100);
    scoreUpdateNeeded = true;
    GAME_DATA.isPaused = true;
    setTimeout(() => {
      createPlayer();
      spawnEnemies();
      GAME_DATA.isPaused = false;
      GAME_DATA.animationId = requestAnimationFrame(gameLoop);
    }, 1500);
    return;
  }

  // Process enemies
  for (let i = GAME_DATA.enemies.length - 1; i >= 0; i--) {
    const enemy = GAME_DATA.enemies[i];
    if (bombedArea(enemy.x, enemy.y)) {
      if (enemy.el) enemy.el.remove();
      GAME_DATA.enemies.splice(i, 1);
      GAME_DATA.score += 100;
    }
  }

  // Process temporary cells
  GAME_DATA.temporaryCells = GAME_DATA.temporaryCells.filter(cell => {
    if (bombedArea(cell.x, cell.y)) {
      GAME_DATA.score += 100;
      scoreUpdateNeeded = true;
      decoloreCell(cell.x, cell.y);
      return false;
    }
    return true;
  });

  // Update score if needed
  if (scoreUpdateNeeded && cachedScoreEl) {
    cachedScoreEl.textContent = `${GAME_DATA.score}`;
    scoreUpdateNeeded = false;
  }

  // Check if end is reached
  if (GAME_DATA.endPose && GAME_DATA.playerPos &&
    GAME_DATA.playerPos.x === GAME_DATA.endPose.x &&
    GAME_DATA.playerPos.y === GAME_DATA.endPose.y) {
    setTimeout(() => {
      if (cachedPlayerEl) cachedPlayerEl.remove();
    }, 1000);
    endReached();
    return;
  }
}

export function gameLoop(currentTime = performance.now()) {
  if (!previousTime) previousTime = currentTime;

  let elapsed = currentTime - previousTime;
  previousTime = currentTime;

  // Prevent spiral of death
  if (elapsed > MAX_FRAME_TIME) elapsed = FRAME_TIME;

  lag += elapsed;

  // Update game state at fixed time step
  while (lag >= FRAME_TIME) {
    gameUpdate();
    lag -= FRAME_TIME;
  }

  // Update FPS counter
  updateFPS(currentTime);

  // Schedule next frame if game is not paused
  if (!GAME_DATA.isPaused) {
    GAME_DATA.animationId = requestAnimationFrame(gameLoop);
  }
}


export function startAnimation() {
  if (GAME_DATA.animationId) {
    stopTimer();
    cancelAnimationFrame(GAME_DATA.animationId);
    GAME_DATA.animationId = null;
  }
  if (!GAME_DATA.isPaused) {
    startTimer();
    GAME_DATA.animationId = requestAnimationFrame(gameLoop);
  }
}