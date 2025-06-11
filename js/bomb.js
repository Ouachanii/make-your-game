import { GAME_DATA } from './data.js';

export function bomb() {

  if ((GAME_DATA.isDead) || (GAME_DATA.lives <= 0) || (GAME_DATA.isPaused)
    || (!GAME_DATA.isStarted) || (GAME_DATA.lastBomb + 1000 > Date.now())) return;

  const x = GAME_DATA.playerPos.x;
  const y = GAME_DATA.playerPos.y;

  // Prevent multiple bombs on the same cell
  if (GAME_DATA.bombedCells.some(cell => cell.x === x && cell.y === y)) return;

  GAME_DATA.lastBomb = Date.now();
  const player = document.getElementById("player");

  if (!player) return;

  // Visual bomb placement
  const bombImg = document.createElement("img");
  bombImg.src = "assets/bomb.gif";
  bombImg.className = "bomb";
  bombImg.style.position = "absolute";
  bombImg.style.width = `${GAME_DATA.cellSize}px`;
  bombImg.style.height = `${GAME_DATA.cellSize}px`;
  bombImg.style.left = `${y * GAME_DATA.cellSize}px`;
  bombImg.style.top = `${x * GAME_DATA.cellSize}px`;
  bombImg.style.zIndex = 2;
  bombImg.id = `bomb-${x}-${y}`;

  const gameArea = document.getElementById("game-area");
  if (gameArea) gameArea.appendChild(bombImg);

  // Add bomb to data

  setTimeout(() => {

    GAME_DATA.bombedCells.push({ x, y });
    console.log(`Bombed cell at (${x}, ${y})`, GAME_DATA.bombedCells);


    decoloreCell(x, y);
    // Remove bomb
    const bombVisual = document.getElementById(`bomb-${x}-${y}`);
    if (bombVisual) bombVisual.remove();
  }, 2000);




  setTimeout(() => {

    const Bombed_cell = document.querySelector(`div[data-x="${x}"][data-y="${y}"]`);
    const im = document.createElement('img');
    if (Bombed_cell) {

      im.src = "./assets/dFOsRT.gif";
      im.style.position = "absolute";
      im.style.width = `${4 * GAME_DATA.cellSize}px`;
      im.style.height = `${4 * GAME_DATA.cellSize}px`;
      im.style.left = `${y * GAME_DATA.cellSize}px`;
      im.style.top = `${x * GAME_DATA.cellSize}px`;
      Bombed_cell.appendChild(im);
      im.remove()
    }
    
  }, 1000);
}

export function bombedArea(x, y) {
  return GAME_DATA.bombedCells.some(elem => (elem.x == x && elem.y == y));
}

export function decoloreCell(x, y) {
  const cell = document.getElementById(`cell-${x}-${y}`);
  if (cell) {
    cell.classList.remove("wood");
    cell.classList.add("ground");
  }
}