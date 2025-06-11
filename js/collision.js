import { createPlayer } from "./player.js";
import { GAME_DATA } from "./data.js";
import { HandleLose } from "./endGame.js";
import { spawnEnmies } from "./init.js";
import { stopAnimation } from "./animation.js";

export async function detectCollision() {
  const player = document.getElementById("player");
  if (!player) return;

  const playerRect = player.getBoundingClientRect();
  const enemies = document.querySelectorAll(".enemy");

  for (const enemy of enemies) {
    const enemyRect = enemy.getBoundingClientRect();
    if (
      playerRect.x < enemyRect.x + enemyRect.width &&
      playerRect.x + playerRect.width > enemyRect.x &&
      playerRect.y < enemyRect.y + enemyRect.height &&
      playerRect.y + playerRect.height > enemyRect.y
    ) {
      // Collision detected
      const player = document.getElementById("player");
      if (player) player.remove();
      for (const enemy of enemies) {
        if (enemy) enemy.remove(); 
      }
      createPlayer(); // Respawn player
      spawnEnmies(); // Respawn enemies
      GAME_DATA.score -= 100; // Deduct score for collision
      if (GAME_DATA.score < 0) GAME_DATA.score = 0; // Prevent negative score

      document.getElementById("score").textContent = `${GAME_DATA.score}`;

      GAME_DATA.lives--;
      if (GAME_DATA.lives < 0) GAME_DATA.lives = 0; // Prevent negative lives
      document.getElementById("lives").textContent = `${GAME_DATA.lives}`;

      if (GAME_DATA.lives == 0) {
        
        stopAnimation();
        HandleLose();
        GAME_DATA.isDead = true;
        
      }
      return;
    }
  }
}

