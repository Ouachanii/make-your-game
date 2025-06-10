import { GAME_DATA } from "./data.js";
import { detectCollision } from "./collision.js";

const gameScreen = document.getElementById("game-area");

const ENEMY_DIRECTIONS = [
  {dx: 0, dy: -1}, // up
  {dx: 0, dy: 1},  // down
  {dx: -1, dy: 0}, // left
  {dx: 1, dy: 0},  // right
];

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

  gameScreen.appendChild(enemy);

  // Assign a random initial direction
  const initialDir = ENEMY_DIRECTIONS[Math.floor(Math.random() * ENEMY_DIRECTIONS.length)];
  GAME_DATA.enemies.push({ el: enemy, x: GAME_DATA.enmSpawnCell.x, y: GAME_DATA.enmSpawnCell.y, dir: initialDir });
}


let lastEnemyMoveTime = 0;
const ENEMY_MOVE_INTERVAL = 400; 

function moveEnemies() {
  GAME_DATA.enemies.forEach(enemy => {

    let { dx, dy } = enemy.dir;
    let newX = enemy.x + dy;
    let newY = enemy.y + dx;

    // Check if next cell is valid ground
    const isValid =
      newX >= 0 && newX < GAME_DATA.rowsLen &&
      newY >= 0 && newY < GAME_DATA.colsLen &&
      !GAME_DATA.wallCells.has(`${newX},${newY}`) &&
      !GAME_DATA.temporaryCells.some(cell => cell.x === newX && cell.y === newY) &&
      !GAME_DATA.bombedCells.some(cell => cell.x === newX && cell.y === newY);
    if (isValid) {
      enemy.x = newX;
      enemy.y = newY;
      enemy.el.style.transform = `translate(${enemy.y * GAME_DATA.cellSize}px, ${enemy.x * GAME_DATA.cellSize}px)`;
    } else {

      // If not valid, change direction

      const shuffled = ENEMY_DIRECTIONS.sort(() => Math.random() - 0.5);
      
      for (let dir of shuffled) {
        const tryX = enemy.x + dir.dy;
        const tryY = enemy.y + dir.dx;
        const canMove =
          tryX >= 0 && tryX < GAME_DATA.rowsLen &&
          tryY >= 0 && tryY < GAME_DATA.colsLen &&
          !GAME_DATA.wallCells.has(`${tryX},${tryY}`) &&
          !GAME_DATA.temporaryCells.some(cell => cell.x === tryX && cell.y === tryY) &&
          !GAME_DATA.bombedCells.some(cell => cell.x === tryX && cell.y === tryY);
        if (canMove) {
          enemy.dir = dir;
          enemy.x = tryX;
          enemy.y = tryY;
          enemy.el.style.transform = `translate(${enemy.y * GAME_DATA.cellSize}px, ${enemy.x * GAME_DATA.cellSize}px)`;
          break;
        }
      }
    }
  });
}
export async function updateEnemies() {
  const now = Date.now();
  if (now - lastEnemyMoveTime > ENEMY_MOVE_INTERVAL) {
    await detectCollision();
    moveEnemies();
    lastEnemyMoveTime = now;
  }
}

