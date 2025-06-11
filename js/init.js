import { makeGrid, posCells, setUnbreakableCells, setTemporaryCells } from './grid.js';
import { createPlayer } from './player.js';
import { startTimer } from './timer.js';
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
  GAME_DATA.level = 1;
  GAME_DATA.lives = 3;
  GAME_DATA.score = 0;

  makeGrid();
  posCells();
  setUnbreakableCells();
  setTemporaryCells();
  createPlayer();
  spawnEnmies();
  startTimer();
}


export function spawnEnmies() {
    for (let i = 0; i <= GAME_DATA.level; i++) {
      console.log(`Spawning enemy at position: ${level[GAME_DATA.level - 1].enmSpawnPos[i].x}, ${level[GAME_DATA.level - 1].enmSpawnPos[i].y}`);
      GAME_DATA.enmSpawnCell = level[GAME_DATA.level - 1].enmSpawnPos[i];
      console.log(GAME_DATA.enmSpawnCell);
      createEnemy();
      GAME_DATA.enemiesCount++;
    }
  }