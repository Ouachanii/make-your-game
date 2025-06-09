const gameScreen = document.getElementById("game-area");
import { GAME_DATA } from './data.js';
import { detectCollision } from './collision.js';
import { bomb } from './bomb.js';

export function createPlayer() {
  let player = document.createElement("img");

  player.src = "assets/player.png"

  player.className = "player"

  player.id = "player"


  gameScreen.appendChild(player);

  // Reset groundCells before populating
  GAME_DATA.groundCells = [];
  GAME_DATA.cells.forEach(cell => {
    if (canMoveTo(cell.x, cell.y)) {
      GAME_DATA.groundCells.push(cell)
    }
  })

  const spawnCell = GAME_DATA.groundCells[0];

  player.style.transform = `translate(${(spawnCell.x * GAME_DATA.cellSize)}px, ${spawnCell.y * GAME_DATA.cellSize}px)`

  GAME_DATA.playerPos = { x: spawnCell.x, y: spawnCell.y }

  // console.log(cells[15])
  // console.log(playerPos)
}
////////////////////////////////////////
export function canMoveTo(x, y) {
  return !(GAME_DATA.wallCells.has(`${x},${y}`) ||
    (GAME_DATA.temporaryCells.some(cordinate => (cordinate.x === x && cordinate.y === y))));
}

export function movePlayer(dx, dy) {
  let player = document.getElementById("player");
  if (!player) return;
  const newX = GAME_DATA.playerPos.x + dy;
  const newY = GAME_DATA.playerPos.y + dx;
  if (canMoveTo(newX, newY)) {
    player.style.transform = `translate(${newY * GAME_DATA.cellSize}px, ${newX * GAME_DATA.cellSize}px)`;
    GAME_DATA.playerPos.x = newX;
    GAME_DATA.playerPos.y = newY;
  }
  detectCollision(); // Check for collisions after moving
}

export function handleKeyDown(event) {
  if (!GAME_DATA.isPaused || GAME_DATA.isDead || !GAME_DATA.isStarted) return;

  switch (event.key) {
    case "ArrowUp":
      movePlayer(0, -1);
      break;
    case "ArrowDown":
      movePlayer(0, 1);
      break;
    case "ArrowLeft":
      movePlayer(-1, 0);
      break;
    case "ArrowRight":
      movePlayer(1, 0);
      break;
    case " " || "Spacebar" || "Space":
      bomb();
      break;
    default:
      return;
  }
}