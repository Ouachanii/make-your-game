import { GAME_DATA, level } from "./data.js";

const gameScreen = document.getElementById("game-area");


function makeGrid() {



  //const gameScreen = document.getElementById("game-area")

  const screenWidth = gameScreen.offsetWidth;

  const screenHeight = gameScreen.offsetHeight;


  gameScreen.style.gridTemplateColumns = `repeat(${screenWidth}, ${GAME_DATA.cellSize}px)`;

  gameScreen.style.gridTemplateRows = `repeat(${screenHeight}, ${GAME_DATA.cellSize}px)`;


  GAME_DATA.colsLen = screenWidth / GAME_DATA.cellSize;
  GAME_DATA.rowsLen = screenHeight / GAME_DATA.cellSize;

  console.log("row col length is:", GAME_DATA.rowsLen, GAME_DATA.colsLen)


  for (let x = 0; x < GAME_DATA.rowsLen; x++) {
    for (let y = 0; y < GAME_DATA.colsLen; y++) {




      let cell = document.createElement("div")

      cell.classList = "cell";

      cell.style.width = `${GAME_DATA.cellSize}px`;

      cell.style.height = `${GAME_DATA.cellSize}px`;

      cell.dataset.coordinates = `${x},${y}`; //,${index}`;

      cell.dataset.x = x;
      cell.dataset.y = y;
     // console.log(cell)

      //cell.style.border = '1px solid #444';

      cell.classList = "ground"

      gameScreen.appendChild(cell)



    }

  }

}

function posCells() {


  for (let i = 0; i < gameScreen.children.length; i++) {

    let divCell = gameScreen.children[i]

    let coordinates = gameScreen.children[i].dataset.coordinates

    let parts = coordinates.split(",")

    divCell.textContent = `${parts[0]},  ${parts[1]}`   // dells coordinates


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

export { makeGrid, posCells, setUnbreakableCells, setTemporaryCells };