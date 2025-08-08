import { makeGrid, posCells, setUnbreakableCells, setTemporaryCells } from './grid.js';
import { createPlayer } from './player.js';
import { GAME_DATA, level } from './data.js';
import { createEnemy } from './enemies.js';

const gameScreen = document.getElementById("game-area");

export function init() {
  gameScreen.innerHTML = '';
  GAME_DATA.cells = [];
  GAME_DATA.wallCells = new Set();
  GAME_DATA.bombedCells = [];
  GAME_DATA.groundCells = [];
  GAME_DATA.enemies = [];
  GAME_DATA.temporaryCells = [];
  GAME_DATA.isDead = false;

  const currentLevel = level[GAME_DATA.level - 1] || level[0];

  GAME_DATA.totalSeconds = currentLevel.timeLimit || 180;
  const minutes = Math.floor(GAME_DATA.totalSeconds / 60);
  const seconds = GAME_DATA.totalSeconds % 60;
  document.getElementById("timer").textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  makeGrid();
  posCells();
  setUnbreakableCells();
  setTemporaryCells();

  const currentLevelData = level[GAME_DATA.level - 1] || level[0];
  if (currentLevelData.temporaryCells && currentLevelData.temporaryCells.length > 0) {
    const randomCell = currentLevelData.temporaryCells[Math.floor(Math.random() * currentLevelData.temporaryCells.length)];
    GAME_DATA.endPose = { x: randomCell.x, y: randomCell.y };
  }

  createPlayer();
  spawnEnemies();
}


export function spawnEnemies() {
  for (let i = 0; i <= GAME_DATA.level; i++) {

    GAME_DATA.enmSpawnCell = level[GAME_DATA.level - 1].enmSpawnPos[i];
    createEnemy();
    GAME_DATA.enemiesCount++;
  }

}