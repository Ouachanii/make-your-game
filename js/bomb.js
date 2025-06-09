import { GAME_DATA } from './data.js'; 
import { decoloreCell } from './animation.js';

export function bomb() {
  if (GAME_DATA.lastBomb + 1000 > Date.now()) return; // Prevent spamming bombs
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
  GAME_DATA.bombedCells.push({ x, y });
  // Explosion after short delay
  setTimeout(() => {
    decoloreCell(x, y);
    // Remove bomb visual
    const bombVisual = document.getElementById(`bomb-${x}-${y}`);
    if (bombVisual) bombVisual.remove();
  }, 500); // 0.5s explosion delay for feedback
}

export function bombedArea(x, y) {
  return GAME_DATA.bombedCells.some(elem => (elem.x == x && elem.y == y));
}