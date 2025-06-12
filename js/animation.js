import { GAME_DATA} from './data.js';
import { endReached } from './endGame.js';
import { bombedArea, decoloreCell } from './bomb.js';
import { updateEnemies } from './enemies.js';
import { createPlayer } from './player.js';



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

  GAME_DATA.animationId = requestAnimationFrame(update);

  if (GAME_DATA.animationId && GAME_DATA.isPaused) {
    cancelAnimationFrame(GAME_DATA.animationId);
    GAME_DATA.animationId = null;
  }

  console.log(GAME_DATA.animationId)
}

export function startAnimation() {
  if (!GAME_DATA.animationId && !GAME_DATA.isPaused) {
    update();
  }
}