import { GAME_DATA, level } from "./data.js";

const gameScreen = document.getElementById("game-area");


function makeGrid() {
  // Clear previous grid
  gameScreen.innerHTML = "";
  GAME_DATA.colsLen = 15;
  GAME_DATA.rowsLen = 13;
  // Set up CSS Grid
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

    //divCell.textContent = `${parts[0]},  ${parts[1]}`   // dells coordinates


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
      //cell.div.style.backgroundColor = "red"
      GAME_DATA.wallCells.add(`${cell.x},${cell.y}`)
    }

  });



  for (let i = 0; i < GAME_DATA.cells.length; i++) {

    if (GAME_DATA.cells[i].x === GAME_DATA.endPose.x && GAME_DATA.cells[i].y === GAME_DATA.endPose.y) {

      GAME_DATA.cells[i].div.classList = "endCell"
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

  GAME_DATA.cells.forEach(cell => {

    if ((level[GAME_DATA.level - 1].temporaryCells.some(cordinate => (cordinate.x === cell.x && cordinate.y === cell.y)))) {



      GAME_DATA.temporaryCells.push({ x: cell.x, y: cell.y })

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