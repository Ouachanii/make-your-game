import { GAME_DATA, level } from './data.js';
import { detectCollision } from './collision.js';
import { bomb } from './bomb.js';
import { startAnimation } from './animation.js';
import { init } from './init.js';
import { playerAnimation } from './playerAnimation.js';

let gameScreen;


// Global sprite animation instance
let playerSprite;


// Animation state
let lastFrameTime = 0;
const ANIMATION_FRAME_DURATION = 1000 / 60; // 60 FPS animation
let accumulatedTime = 0;

export function createPlayer() {
  // Initialize game screen reference
  gameScreen = document.getElementById("game-area");
  if (!gameScreen) {
    console.error("Game area element not found!");
    return;
  }

  let player = document.createElement("div");
  player.className = "player"
  player.id = "player"

  // Initialize sprite animation system with frame timing
  const cellSize = GAME_DATA.cellSize;
  playerSprite = new playerAnimation("assets/player.png", cellSize, cellSize, 16);
  lastFrameTime = performance.now();

  // Apply initial sprite
  playerSprite.applyToElement(player);

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

  // Get current level data for player start position
  const currentLevel = level[GAME_DATA.level - 1] || level[0];
  const startPos = currentLevel.playerStartPos || { x: 1, y: 1 };

  // Find the spawn cell or use default
  const spawnCell = GAME_DATA.groundCells.find(cell =>
    cell.x === startPos.x && cell.y === startPos.y
  ) || GAME_DATA.groundCells[0];

  player.style.transform = `translate(${spawnCell.y * GAME_DATA.cellSize}px, ${spawnCell.x * GAME_DATA.cellSize}px)`

  GAME_DATA.playerPos = { x: spawnCell.x, y: spawnCell.y }

  // Start sprite animation
  playerSprite.start();
}
////////////////////////////////////////
export function canMoveTo(x, y) {
  return !(GAME_DATA.wallCells.has(`${x},${y}`) ||
    (GAME_DATA.temporaryCells.some(cordinate => (cordinate.x === x && cordinate.y === y))));
}

const playerMoveInt = 250;
let lastMove = 0;

export async function movePlayer(dx, dy) {

  const now = Date.now()

  if (now - lastMove < playerMoveInt || GAME_DATA.isPaused || !GAME_DATA.isStarted) return;

  await detectCollision();
  let player = document.getElementById("player");
  if (!player) return;

  const newX = GAME_DATA.playerPos.x + dy;
  const newY = GAME_DATA.playerPos.y + dx;

  if (canMoveTo(newX, newY) && (newX !== GAME_DATA.bombPos.x || newY !== GAME_DATA.bombPos.y)) {
    // Update sprite direction and state based on movement
    if (dx !== 0 || dy !== 0) {
      playerSprite.setState('walking');
      GAME_DATA.lastMovementTime = now;

      if (dx > 0) playerSprite.setDirection('right');
      else if (dx < 0) playerSprite.setDirection('left');
      else if (dy > 0) playerSprite.setDirection('down');
      else if (dy < 0) playerSprite.setDirection('up');

      // Apply updated sprite
      playerSprite.applyToElement(player);
    }

    player.style.transform = `translate(${newY * GAME_DATA.cellSize}px, ${newX * GAME_DATA.cellSize}px)`;
    GAME_DATA.playerPos.x = newX;
    GAME_DATA.playerPos.y = newY;
  }
  // Note: We don't call setPlayerIdle() here anymore - let the updatePlayerSprite handle it

  lastMove = now
}

// Function to update sprite animation
export function updatePlayerSprite(currentTime) {
  if (playerSprite) {
    // Check if player should be set to idle after 0.5 seconds of no movement
    if (currentTime - GAME_DATA.lastMovementTime > GAME_DATA.idleDelay && playerSprite.currentState === 'walking') {
      setPlayerIdle();
    }

    playerSprite.update(currentTime);

    // Apply current sprite state to player element
    const player = document.getElementById("player");
    if (player) {
      playerSprite.applyToElement(player);
    }
  }
}

// Function to set player to idle state
export function setPlayerIdle() {
  if (playerSprite) {
    playerSprite.setState('idle');
    const player = document.getElementById("player");
    if (player) {
      playerSprite.applyToElement(player);
    }
  }
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