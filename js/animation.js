import { GAME_DATA} from './data.js';
import { endReached, HandleLose } from './endGame.js';
import { bombedArea, decoloreCell } from './bomb.js';
import { createEnemy, updateEnemies } from './enemies.js';
import { init, spawnEnmies } from './init.js';
import { createPlayer } from './player.js';
import { startTimer } from './timer.js';



export function update() {
  
  updateEnemies();

  if (bombedArea(GAME_DATA.playerPos.x, GAME_DATA.playerPos.y) && !GAME_DATA.isPaused ) {
   
    let player = document.getElementById("player");
   
    if (player) {

      console.log("bomb collided")
      player.remove();
    
    }
 
    let enemies = document.querySelectorAll(".enemy")

     enemies.forEach(enemy => enemy.remove());

    GAME_DATA.lives--;


    if (GAME_DATA.lives == 0){

      document.getElementById("lives").textContent = `${GAME_DATA.lives}`;
      HandleLose();

    console.log("lose handled");

      return
       
    }else {
    

    
    GAME_DATA.score -= 100; // Deduct score for collision
  
    if (GAME_DATA.score < 0) GAME_DATA.score = 0; // Prevent negative score
  
    document.getElementById("score").textContent = `${GAME_DATA.score}`;
  
GAME_DATA.isPaused = true
     
  setTimeout( () => {

        createPlayer(); // Respawn player

        spawnEnmies(); // Respawn enemies

        GAME_DATA.isPaused = false

        startTimer();

        GAME_DATA.animationId = requestAnimationFrame(update);


     },3000)
  

     
      

      if (GAME_DATA.score < 0) GAME_DATA.score = 0; // Prevent negative score

      document.getElementById("score").textContent = `${GAME_DATA.score}`;

   
      if (GAME_DATA.lives < 0) GAME_DATA.lives = 0; // Prevent negative lives
     
      document.getElementById("lives").textContent = `${GAME_DATA.lives}`;
     



     }
     
    
  }




  // Remove bombed temporary cells
  GAME_DATA.temporaryCells = GAME_DATA.temporaryCells.filter(cell => {
    if (bombedArea(cell.x, cell.y)) {

      GAME_DATA.score += 100;
      
      document.getElementById("score").textContent = GAME_DATA.score;
      
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



if(!GAME_DATA.isPaused) {

  GAME_DATA.animationId = requestAnimationFrame(update);

}



  if (GAME_DATA.animationId && GAME_DATA.isPaused) {
    cancelAnimationFrame(GAME_DATA.animationId);
    GAME_DATA.animationId = null;
  }

 // console.log(GAME_DATA.animationId)
}




export function startAnimation() {
  if (!GAME_DATA.animationId && !GAME_DATA.isPaused) {

    update();
  }
}