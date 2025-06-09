import { GAME_DATA} from './data.js';
import { HandleLose, endReached } from './endGame.js';
import { bombedArea } from './bomb.js';
import { updateEnemies } from './enemies.js';

export function update() {
  if (bombedArea(GAME_DATA.playerPos.x, GAME_DATA.playerPos.y)) {
    let player = document.getElementById("player");
    if (player) player.remove();
    createPlayer(); // Respawn player
    GAME_DATA.score -= 100; // Deduct score for collision
    if (GAME_DATA.score < 0) GAME_DATA.score = 0; // Prevent negative score
    document.getElementById("score").textContent = `${GAME_DATA.score}`;
    GAME_DATA.lives--;
    if (GAME_DATA.lives < 0) GAME_DATA.lives = 0; // Prevent negative lives
    document.getElementById("lives").textContent = `${GAME_DATA.lives}`;
    if (GAME_DATA.lives == 0) {
      GAME_DATA.isDead = true;
      document.getElementById("score").textContent = "0";
      document.getElementById("lives").textContent = "0";
    }
    HandleLose();
    return;
  }
  updateEnemies();
  // Remove bombed temporary cells
  GAME_DATA.temporaryCells = GAME_DATA.temporaryCells.filter(cell => {
    if (bombedArea(cell.x, cell.y)) {
      GAME_DATA.score += 100;
      decoloreCell(cell.x, cell.y);
      return false;
    }
    return true;
  });
  // End reached
  if (GAME_DATA.playerPos.x === GAME_DATA.endPose.x && GAME_DATA.playerPos.y === GAME_DATA.endPose.y) {
    let player = document.getElementById("player");
    setTimeout(() => {
      if (player) player.remove();
    }, 1000);
    endReached();
    return;
  }
  requestAnimationFrame(update);
}

export function decoloreCell(x, y) {
  const cell = document.getElementById(`cell-${x}-${y}`);
  if (cell) {
    cell.classList.remove("wood");
    cell.classList.add("ground");
  }
}