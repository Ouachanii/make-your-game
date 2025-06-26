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
  document.getElementById("timer").textContent = "3:00"


  makeGrid();
  posCells();
  setUnbreakableCells();
  setTemporaryCells();
  createPlayer();
  spawnEnmies();
}


export function spawnEnmies() {

  

  for (let i = 0; i <= GAME_DATA.level; i++) {

    GAME_DATA.enmSpawnCell = level[GAME_DATA.level - 1].enmSpawnPos[i];
    
    createEnemy();

    GAME_DATA.enemiesCount++;
  }

}