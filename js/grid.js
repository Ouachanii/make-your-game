import { GAME_DATA, level } from "./data.js";

const gameScreen = document.getElementById("game-area");


function makeGrid() {
  // Clear previous grid
  gameScreen.innerHTML = "";
  GAME_DATA.colsLen = 15;
  GAME_DATA.rowsLen = 13;
  // CSS Grid
  gameScreen.style.display = "grid";
  gameScreen.style.gridTemplateColumns = `repeat(15, var(--cell-size))`;
  gameScreen.style.gridTemplateRows = `repeat(13, var(--cell-size))`;
  for (let x = 0; x < GAME_DATA.rowsLen; x++) {
    for (let y = 0; y < GAME_DATA.colsLen; y++) {
      let cell = document.createElement("div");
      cell.classList = "cell ground";
      cell.style.width = `${GAME_DATA.cellSize}px`;
      cell.style.height = `${GAME_DATA.cellSize}px`;
      cell.dataset.coordinates = `${x},${y}`;
      cell.dataset.x = x;
      cell.dataset.y = y;
      gameScreen.appendChild(cell);
    }
  }
  updateAllCellSizes();
}

function posCells() {


  for (let i = 0; i < gameScreen.children.length; i++) {

    let divCell = gameScreen.children[i]

    let coordinates = gameScreen.children[i].dataset.coordinates

    let parts = coordinates.split(",")

    GAME_DATA.cells.push({
      div: divCell,
      index: i,
      x: parseInt(parts[0]),
      y: parseInt(parts[1]),
      isWall: false
    })

    if ((GAME_DATA.cells[i].x === 0) || (GAME_DATA.cells[i].y === 0) || (GAME_DATA.cells[i].y === GAME_DATA.colsLen - 1) || (GAME_DATA.cells[i].x === GAME_DATA.rowsLen - 1)) {

      GAME_DATA.cells[i].isWall = true; // outline game screen
      GAME_DATA.cells[i].div.classList = "wall"

    }
  }
}

function setUnbreakableCells() {

  GAME_DATA.wallCells = new Set()

  GAME_DATA.cells.forEach(cell => {

    if ((cell.isWall) || (level[GAME_DATA.level - 1].unwalkableCellsPos.some(cordinate => (cordinate.x === cell.x && cordinate.y === cell.y)))) {
      GAME_DATA.wallCells.add(`${cell.x},${cell.y}`)
    }

  });

  const endPos = GAME_DATA.endPose;

  for (let i = 0; i < GAME_DATA.cells.length; i++) {
    if (GAME_DATA.cells[i].x === endPos.x && GAME_DATA.cells[i].y === endPos.y) {
      GAME_DATA.cells[i].isEnd = true;
    }

    GAME_DATA.wallCells.forEach(cor => {

      if ((GAME_DATA.cells[i].x === parseInt(cor.split(",")[0])) && (GAME_DATA.cells[i].y === parseInt(cor.split(",")[1]))) {

        GAME_DATA.cells[i].div.classList = "wall"
      }
    })
  };
}

function setTemporaryCells() {
  GAME_DATA.temporaryCells = [];
  const currentLevel = level[GAME_DATA.level - 1] || level[0];

  currentLevel.temporaryCells.forEach(coordinate => {
    GAME_DATA.temporaryCells.push({ x: coordinate.x, y: coordinate.y });
  });

  if (GAME_DATA.temporaryCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * GAME_DATA.temporaryCells.length);
    GAME_DATA.endPose = { ...GAME_DATA.temporaryCells[randomIndex] };
  }

  GAME_DATA.cells.forEach(cell => {
    if (GAME_DATA.temporaryCells.some(temp => temp.x === cell.x && temp.y === cell.y)) {
      cell.div.classList = "wood";
    }
  });
}

function updateAllCellSizes() {
  // Update all grid cells
  document.querySelectorAll('.cell, .ground, .wall, .wood, .endCell').forEach(cell => {
    cell.style.width = `${GAME_DATA.cellSize}px`;
    cell.style.height = `${GAME_DATA.cellSize}px`;
  });
  // Update player, enemies, bombs, explosions
  document.querySelectorAll('.player, .enemy, .bomb, .explosion').forEach(el => {
    el.style.width = `${GAME_DATA.cellSize}px`;
    el.style.height = `${GAME_DATA.cellSize}px`;
  });
}

export { makeGrid, posCells, setUnbreakableCells, setTemporaryCells, updateAllCellSizes };