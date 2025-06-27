import { GAME_DATA } from './data.js';
import { endReached, HandleLose } from './endGame.js';
import { bombedArea, decoloreCell } from './bomb.js';
import { updateEnemies } from './enemies.js';
import { spawnEnmies } from './init.js';
import { createPlayer } from './player.js';
import { startTimer, stopTimer } from './timer.js';

// FPS diagnostics state
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

export function update(now = performance.now()) {
  updateFPS(now);

  const playerEl = document.getElementById("player");
  const livesEl = document.getElementById("lives");
  const scoreEl = document.getElementById("score");

  updateEnemies();

  // Player hit by bomb
  if (bombedArea(GAME_DATA.playerPos.x, GAME_DATA.playerPos.y) && !GAME_DATA.isPaused) {

    if (playerEl) playerEl.remove();

    document.querySelectorAll(".enemy").forEach(enemy => enemy.remove());
    GAME_DATA.lives--;
    if (GAME_DATA.lives < 0) GAME_DATA.lives = 0;
    if (livesEl && livesEl.textContent !== `${GAME_DATA.lives}`) livesEl.textContent = `${GAME_DATA.lives}`;
    if (GAME_DATA.lives === 0 || GAME_DATA.totalSeconds <= 0) {
      HandleLose();
      return;
    } else {
      GAME_DATA.score = Math.max(0, GAME_DATA.score - 100);
      if (scoreEl && scoreEl.textContent !== `${GAME_DATA.score}`) scoreEl.textContent = `${GAME_DATA.score}`;
      GAME_DATA.isPaused = true;
      setTimeout(() => {
        createPlayer();
        spawnEnmies();
        GAME_DATA.isPaused = false;
        GAME_DATA.animationId = requestAnimationFrame(update);
      }, 1500);
      return;
    }
  }

  for (let i = GAME_DATA.enemies.length - 1; i >= 0; i--) {
    const enemy = GAME_DATA.enemies[i];
    if (bombedArea(enemy.x, enemy.y)) {
      if (enemy.el) enemy.el.remove();
      GAME_DATA.enemies.splice(i, 1);
      GAME_DATA.score += 100;
    }
  }
  if (scoreEl && scoreEl.textContent !== `${GAME_DATA.score}`) scoreEl.textContent = `${GAME_DATA.score}`;

  // Remove bombed temporary cells
  GAME_DATA.temporaryCells = GAME_DATA.temporaryCells.filter(cell => {
    if (bombedArea(cell.x, cell.y)) {
      GAME_DATA.score += 100;
      if (scoreEl && scoreEl.textContent !== `${GAME_DATA.score}`) scoreEl.textContent = `${GAME_DATA.score}`;
      decoloreCell(cell.x, cell.y);
      return false;
    }
    return true;
  });

  // End reached
  if (GAME_DATA.playerPos.x === GAME_DATA.endPose.x && GAME_DATA.playerPos.y === GAME_DATA.endPose.y) {
    setTimeout(() => {
      const player = document.getElementById("player");
      if (player) player.remove();
    }, 1000);
    endReached();
    return;
  }

  // Animation frame control
  if (!GAME_DATA.isPaused) {
    GAME_DATA.animationId = requestAnimationFrame(update);
  } else if (GAME_DATA.animationId) {
    cancelAnimationFrame(GAME_DATA.animationId);
    GAME_DATA.animationId = null;
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
    update();
  }
}