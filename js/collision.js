import { createPlayer } from "./player.js";
import { GAME_DATA } from "./data.js";
import { HandleLose } from "./endGame.js";
import { spawnEnemies } from "./init.js";
import { startAnimation } from './animation.js';

export async function detectCollision() {

  if (GAME_DATA.lives == 0) {
    HandleLose();
    return
  }

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
      if (player) {

        player.remove();

        GAME_DATA.isPaused = true;

        //console.log("enemy collided")
      }

      for (const enemy of enemies) {
        if (enemy) enemy.remove();
      }

      GAME_DATA.score -= 100; // Deduct score for collision

      setTimeout(() => {

        createPlayer(); // Respawn player
        spawnEnemies(); // Respawn enemies
        GAME_DATA.isPaused = false;
        startAnimation()

      }, 1000)

      if (GAME_DATA.score < 0) GAME_DATA.score = 0; // Prevent negative score

      document.getElementById("score").textContent = `${GAME_DATA.score}`;


      GAME_DATA.lives--;

      if (GAME_DATA.lives < 0) GAME_DATA.lives = 0; // Prevent negative lives
      document.getElementById("lives").textContent = `${GAME_DATA.lives}`;
      return;
    }
  }


/*
  if (GAME_DATA.bombThrowed) {

    const bomb = document.querySelector(".bomb");

    console.log("bomb throwed !")

    const bombRect = bomb.getBoundingClientRect();

    const enemies = document.querySelectorAll(".enemy");


    for (const enemy of enemies) {

      const enemyRect = enemy.getBoundingClientRect();
      if (
        bombRect.x < enemyRect.x + enemyRect.width && bombRect.x + playerRect.width > enemyRect.x &&
        bombRect.y < enemyRect.y + enemyRect.height && bombRect.y + playerRect.height > enemyRect.y
      ) {
        console.log("enemy collided with bomb !!!")
        enemy.remove();
      }
    }
  }
*/
  
}
