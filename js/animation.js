import { GAME_DATA } from './data.js';
import { endReached, HandleLose } from './endGame.js';
import { bombedArea, decoloreCell } from './bomb.js';
import { updateEnemies } from './enemies.js';
import { spawnEnemies } from './init.js';
import { createPlayer, updatePlayerSprite } from './player.js';
import { startTimer, stopTimer } from './timer.js';


// Game state flags
let scoreUpdateNeeded = false;

function gameUpdate() {
  updatePlayerSprite(performance.now());
  updateEnemies();

  // Check player collision with bomb
  if (bombedArea(GAME_DATA.playerPos.x, GAME_DATA.playerPos.y) && !GAME_DATA.isPaused) {
    const player = document.getElementById("player");
    if (player) player.remove();
    const enemies = document.getElementsByClassName("enemy");
    while (enemies.length > 0) {
      enemies[0].remove();
    }

    GAME_DATA.lives--;
    if (GAME_DATA.lives < 0) GAME_DATA.lives = 0;

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
    }, 1000);
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
  if (scoreUpdateNeeded) {
    const scoreEl = document.getElementById("score");
    if (scoreEl) scoreEl.textContent = `${GAME_DATA.score}`;
    scoreUpdateNeeded = false;
  }
  // Check if end is reached
  if (GAME_DATA.endPose && GAME_DATA.playerPos &&
    GAME_DATA.playerPos.x === GAME_DATA.endPose.x &&
    GAME_DATA.playerPos.y === GAME_DATA.endPose.y) {
    endReached();
    return;
  }
}

export function gameLoop() {

  gameUpdate();

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