import { GAME_DATA } from "./data.js";
import { detectCollision } from "./collision.js";

const gameScreen = document.getElementById("game-area");

export function createEnemy() {
  if (!GAME_DATA.groundCells) return;
  const enemy = document.createElement("img");
  enemy.src = "assets/enm.png";
  enemy.className = "enemy";
  enemy.style.position = "absolute";
  enemy.style.width = `${GAME_DATA.cellSize}px`;
  enemy.style.height = `${GAME_DATA.cellSize}px`;
  enemy.style.transform = `translate(${GAME_DATA.enmSpawnCell.y * GAME_DATA.cellSize}px, ${GAME_DATA.enmSpawnCell.x * GAME_DATA.cellSize}px)`;
  enemy.dataset.x = GAME_DATA.enmSpawnCell.x;
  enemy.dataset.y = GAME_DATA.enmSpawnCell.y;
  //console.log(`Enemy spawned at***: ${GAME_DATA.enmSpawnCell.x}, ${GAME_DATA.enmSpawnCell.y}`);
  gameScreen.appendChild(enemy);
  GAME_DATA.enemies.push({ el: enemy, x: GAME_DATA.enmSpawnCell.x, y: GAME_DATA.enmSpawnCell.y });
}


let lastEnemyMoveTime = 0;
const ENEMY_MOVE_INTERVAL = 500; 

function moveEnemies() {
  GAME_DATA.enemies.forEach(enemy => {
    const directions = [
      {dx: 0, dy: -1}, // up
      {dx: 0, dy: 1},  // down
      {dx: -1, dy: 0}, // left
      {dx: 1, dy: 0},  // right
    ];
    const shuffled = directions.sort(() => Math.random() - 0.5);
    for (let dir of shuffled) {
      const newX = enemy.x + dir.dy;
      const newY = enemy.y + dir.dx;
      if (
        newX >= 0 && newX < GAME_DATA.rowsLen &&
        newY >= 0 && newY < GAME_DATA.colsLen &&
        !GAME_DATA.wallCells.has(`${newX},${newY}`) &&
        !GAME_DATA.temporaryCells.some(cell => cell.x === newX && cell.y === newY) &&
        !GAME_DATA.bombedCells.some(cell => cell.x === newX && cell.y === newY)
      ) {
        enemy.x = newX;
        enemy.y = newY;
        enemy.el.style.transform = `translate(${enemy.y * GAME_DATA.cellSize}px, ${enemy.x * GAME_DATA.cellSize}px)`;
        break;
      }
    }
    // Check collision with player after moving
   detectCollision()
  });
}
export function updateEnemies() {
  const now = Date.now();
  if (now - lastEnemyMoveTime > ENEMY_MOVE_INTERVAL) {
    moveEnemies();
    lastEnemyMoveTime = now;
  }
}

