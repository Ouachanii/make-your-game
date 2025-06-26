const gameScreen = document.getElementById("game-area");
import { GAME_DATA } from './data.js';
import { detectCollision } from './collision.js';
import { bomb } from './bomb.js';
import { startAnimation } from './animation.js';
import { init } from './init.js';

export function createPlayer() {
  let player = document.createElement("img");
  player.src = "assets/player.png"
  player.className = "player"
  player.id = "player"

  // Responsive size
  player.style.width = `${GAME_DATA.cellSize}px`;
  player.style.height = `${GAME_DATA.cellSize}px`;

  gameScreen.appendChild(player);

  // Reset groundCells before populating
  GAME_DATA.groundCells = [];
  GAME_DATA.cells.forEach(cell => {
    if (canMoveTo(cell.x, cell.y)) {
      GAME_DATA.groundCells.push(cell)
    }
  })

  const spawnCell = GAME_DATA.groundCells[0];

  player.style.transform = `translate(${spawnCell.y * GAME_DATA.cellSize}px, ${spawnCell.x * GAME_DATA.cellSize}px)`

  GAME_DATA.playerPos = { x: spawnCell.x, y: spawnCell.y }

  // console.log(cells[15])
  // console.log(playerPos)
}
////////////////////////////////////////
export function canMoveTo(x, y) {
  return !(GAME_DATA.wallCells.has(`${x},${y}`) ||
    (GAME_DATA.temporaryCells.some(cordinate => (cordinate.x === x && cordinate.y === y))));
}

const playerMoveInt = 250;
let lastMove = 0

export async function movePlayer(dx, dy) {

  const now = Date.now()

  if (now - lastMove < playerMoveInt || GAME_DATA.isPaused || !GAME_DATA.isStarted) return;

  await detectCollision();
  let player = document.getElementById("player");
  if (!player) return;
  const newX = GAME_DATA.playerPos.x + dy;
  const newY = GAME_DATA.playerPos.y + dx;
  if (canMoveTo(newX, newY) && (newX !== GAME_DATA.bombPos.x || newY !== GAME_DATA.bombPos.y)) {
    player.style.transform = `translate(${newY * GAME_DATA.cellSize}px, ${newX * GAME_DATA.cellSize}px)`;
    GAME_DATA.playerPos.x = newX;
    GAME_DATA.playerPos.y = newY;
  }

  lastMove = now

}


export function handleKeyDown(event) {
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

const pauseMenu = document.getElementById("pause-menu");
const gameOverMenu = document.getElementById("game-over-menu");
const winMenu = document.getElementById("win-menu")
let clicked = false;

export function handleKeyUp(event) {
  switch (event.key) {
    case "p":
      if (!clicked && GAME_DATA.isStarted) {
        GAME_DATA.isPaused = true;
        clicked = true
        document.getElementById("pause-menu").classList.remove("hidden")


      } else if (clicked && GAME_DATA.isStarted) {
        GAME_DATA.isPaused = false
        clicked = false
        startAnimation();
        document.getElementById("pause-menu").classList.add("hidden")
      }
      break
    case "r":

      if (GAME_DATA.isStarted) {
        if (pauseMenu) pauseMenu.classList.add("hidden")
        if (gameOverMenu) gameOverMenu.classList.add("hidden")
        if (winMenu) winMenu.classList.add("hidden")

        GAME_DATA.isPaused = false;
        GAME_DATA.isDead = false;
        GAME_DATA.isStarted = true;
        GAME_DATA.totalSeconds = 180;
        GAME_DATA.level = 1;
        GAME_DATA.lives = 3;
        GAME_DATA.score = 0;
        GAME_DATA.animationId = null;
        init()

        document.getElementById("lives").textContent = `${GAME_DATA.lives}`;
        document.getElementById("level").textContent = `${GAME_DATA.level}`;
        document.getElementById("score").textContent = `${GAME_DATA.score}`;


        startAnimation()
        break
      }
  }
}