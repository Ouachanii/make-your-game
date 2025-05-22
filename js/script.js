const GAME_DATA = {

  lastTime: Date.now(),
  score: 0,
  lives: 3,
  level: 1,
  totalSeconds: 0,
  timerInterval: null,
  isPaused: false,
  startTime: null,

  cells: [],
  wallCells: new Set(),
  bombedCells: [],
  groundCells: [],

  enemies: [],

  rowsLen: 0,
  colsLen: 0,

  cellSize: 60,

  lastBomb: 0,

  isDead: false,

  playerPos: {
    x: 0,
    y: 0,
    row: 0,
    col: 0
  }


}

const level = [

  {

    name: "Level 1",

    unwalkableCellsPos: [
      { x: 5, y: 2 },
      { x: 6, y: 3 },
      { x: 7, y: 4 },
      { x: 8, y: 5 },
      { x: 8, y: 6 },
      
      { x: 3, y: 6 },
      { x: 3, y: 7 },
      { x: 3, y: 8 },
     
    ],

    groundCells: [],

    temporaryCells: [],

    playerPos: { x: 1, y: 1, row: 0, col: 0 },

    enemiesPos: [
      { x: 0, y: 0, row: 0, col: 0 },
      { x: 0, y: 0, row: 0, col: 0 },
      { x: 0, y: 0, row: 0, col: 0 },
    ]

  },

  {

    name: "Level 2",

    unwalkableCellsPos: [],

    groundCells: [],

    temporaryCells: [],

    playerPos: { x: 0, y: 0 },

    enemiesPos: []

  }


]

const gameScreen = document.getElementById("game-area")

function makeGrid() {

  const screenWidth = gameScreen.offsetWidth;

  const screenHeight = gameScreen.offsetHeight;


  gameScreen.style.gridTemplateColumns = `repeat(${screenWidth}, ${GAME_DATA.cellSize}px)`;

  gameScreen.style.gridTemplateRows = `repeat(${screenHeight}, ${GAME_DATA.cellSize}px)`;


  GAME_DATA.rowsLen += screenWidth / GAME_DATA.cellSize;
  GAME_DATA.colsLen += screenHeight / GAME_DATA.cellSize;


  for (let row = 0; row < screenWidth / GAME_DATA.cellSize; row++) {

    for (let col = 0; col < screenHeight / GAME_DATA.cellSize; col++) {


      let cell = document.createElement("div")

      cell.classList = "cell";

      cell.style.width = `${GAME_DATA.cellSize}px`;

      cell.style.height = `${GAME_DATA.cellSize}px`;

      cell.dataset.coordinates = `${row},${col}`; //,${index}`;

      cell.dataset.x = col;
      cell.dataset.y = row;
      // console.log(`${row},${col}`)

      cell.style.border = '1px solid #444';


      gameScreen.appendChild(cell)



    }

  }

}

function posCells() {


  for (i = 0; i < gameScreen.children.length; i++) {

    let divCell = gameScreen.children[i]
    let coordinates = gameScreen.children[i].dataset.coordinates
    let parts = coordinates.split(",")

    divCell.textContent = `${parts[0]},  ${parts[1]}`

    GAME_DATA.cells.push({

      div: divCell,
      index: i,
      row: parseInt(parts[0]),
      col: parseInt(parts[1]),
      isWall: false


    })

    if ((GAME_DATA.cells[i].row == 0) || (GAME_DATA.cells[i].col == 0) || (GAME_DATA.cells[i].col == GAME_DATA.colsLen - 1) || (GAME_DATA.cells[i].row == GAME_DATA.rowsLen - 1)) {


      GAME_DATA.cells[i].isWall = true; // outline cells

    }

  }


}

function setUnbreakableCells() {




  GAME_DATA.cells.forEach(cell => {

    if ((cell.isWall) || (level[GAME_DATA.level - 1].unwalkableCellsPos.some(cordinate => (cordinate.x == cell.row && cordinate.y == cell.col)))) {
      //cell.div.style.backgroundColor = "red"
      GAME_DATA.wallCells.add(`${cell.row},${cell.col}`)
    }

  });



  for (i = 0; i < GAME_DATA.cells.length; i++) {

    GAME_DATA.wallCells.forEach(cor => {

      if ((GAME_DATA.cells[i].col == parseInt(cor.split(",")[0])) && (GAME_DATA.cells[i].row == parseInt(cor.split(",")[1]))) {

        GAME_DATA.cells[i].div.style.backgroundColor = "red"
      }


    })

  };

}

function createPlayer() {

  let player = document.createElement("img");

  player.src = "assets/player.png"

  player.className = "player"

  player.id = "player"


  gameScreen.appendChild(player);



  GAME_DATA.cells.forEach(cell => {
    if (canMoveTo(cell.row, cell.col)) {
      GAME_DATA.groundCells.push(cell)
    }
  })


  const spawnCell = GAME_DATA.groundCells[0];


  player.style.transform = `translate(${(spawnCell.col * GAME_DATA.cellSize)}px, ${spawnCell.row * GAME_DATA.cellSize}px)`




  GAME_DATA.playerPos = { x: spawnCell.col * GAME_DATA.cellSize, y: spawnCell.row * GAME_DATA.cellSize, row: spawnCell.row, col: spawnCell.col }

  // console.log(cells[15])
  // console.log(playerPos)
}
////////////////////////////////////////
function canMoveTo(y, x) {
  return !GAME_DATA.wallCells.has(`${x},${y}`);
}

function bombedArea(y, x) {
  return bombedCells.has(`${x},${y}`);
}

function movePlayer(dx, dy) {



  let player = document.getElementById("player")

  if (canMoveTo(GAME_DATA.playerPos.row + dy, GAME_DATA.playerPos.col + dx)) {

    const newRow = GAME_DATA.playerPos.row + dy;
    const newCol = GAME_DATA.playerPos.col + dx;


    const newX = newRow * GAME_DATA.cellSize;
    const newY = newCol * GAME_DATA.cellSize;


    player.style.transform = `translate(${newY}px, ${newX}px)`;

    GAME_DATA.playerPos.row = newRow;

    GAME_DATA.playerPos.col = newCol;

    GAME_DATA.playerPos.x = newX;

    GAME_DATA.playerPos.y = newY;


    console.log(GAME_DATA.playerPos)
  }
}

function bomb() {


  const now = Date.now();

  if (now - lastBomb < 2000) return;

  let bomb = document.createElement("img")
  console.log("space clicked")
  bomb.src = "/assets/bomb.gif"

  bomb.style.position = "absolute"
  bomb.style.marginTop = "20px"
  bomb.classList = "bomb"

  bomb.dataset.x = playerPos.col;

  bomb.dataset.y = playerPos.row;

  const cell = document.querySelector(`.cell[data-x="${playerPos.col}"][data-y="${playerPos.row}"]`);

  console.log(cell)





  cell.appendChild(bomb)

  console.log("bomb appended ")

  lastBomb = now;


  setTimeout(() => {

    bomb.style.width = "180px"
    bomb.style.height = "180px"
    bomb.style.marginTop = "0px"
    bomb.src = "/assets/dFOsRT.gif"

    bombedCells.add(`${bomb.dataset.x},${bomb.dataset.y}`);
    bombedCells.add(`${bomb.dataset.x - 1},${bomb.dataset.y}`); //top
    bombedCells.add(`${parseInt(bomb.dataset.x) + 1},${bomb.dataset.y}`); //bottom
    bombedCells.add(`${bomb.dataset.x},${parseInt(bomb.dataset.y) + 1}`); //right
    bombedCells.add(`${bomb.dataset.x},${bomb.dataset.y - 1}`); //left
    console.log(bombedCells)

    if (bombedArea(playerPos.row, playerPos.col)) {

      console.log("player dead")

      player.remove();


    }

    setTimeout(() => {

      bomb.remove();

      bombedCells.clear();


    }, 1000)

  }, 2000)



}

function getLevel() {

  const existingCells = gameScreen.querySelectorAll(".cell"); // Assuming cells have class "cell"

  existingCells.forEach(cell => cell.remove());

  makeGrid()
  posCells()
  setUnbreakableCells()
  createPlayer()
  for (let i = 0; i < GAME_DATA.level + 1; i++) {
    createEnemy()
  }
  // set temporary cells
  // set enemies pos
  // set player start/end pos
}

const startTimer = () => {

  if (GAME_DATA.isPaused) return;

  GAME_DATA.startTime = Date.now() - GAME_DATA.totalSeconds * 1000;

  GAME_DATA.timerInterval = setInterval(() => {



    GAME_DATA.totalSeconds = Math.floor((Date.now() - GAME_DATA.startTime) / 1000);

    updateTimerDisplay();

  }, 1000);
};




const updateTimerDisplay = () => {
  const minutes = String(Math.floor(GAME_DATA.totalSeconds / 60)).padStart(2, '0');
  const seconds = String(GAME_DATA.totalSeconds % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
};

const enemies = [];

function createEnemy() {
  // Pick a random ground cell that is not occupied by the player
  let spawnCell;
  do {
    spawnCell = GAME_DATA.groundCells[Math.floor(Math.random() * GAME_DATA.groundCells.length)];
  } while (spawnCell.row === GAME_DATA.playerPos.row && spawnCell.col === GAME_DATA.playerPos.col);

  // Create enemy element
  const enemy = document.createElement("img");
  enemy.src = "assets/enemy.png";
  enemy.className = "enemy";
  enemy.style.position = "absolute";
  enemy.style.width = `${GAME_DATA.cellSize}px`;
  enemy.style.height = `${GAME_DATA.cellSize}px`;

  enemy.style.transform = `translate(${spawnCell.col * GAME_DATA.cellSize}px, ${spawnCell.row * GAME_DATA.cellSize}px)`;

  // Track enemy position
  enemy.dataset.row = spawnCell.row;
  enemy.dataset.col = spawnCell.col;

  gameScreen.appendChild(enemy);

  GAME_DATA.enemies.push({
    el: enemy,
    row: spawnCell.row,
    col: spawnCell.col
  });
}

let lastEnemyMoveTime = 0;
const ENEMY_MOVE_INTERVAL = 300;



function moveEnemies() {

  //enemies.forEach(enemy => {
 

for ( i=0 ; i < GAME_DATA.enemies.length ; i++ ) {

    console.log(GAME_DATA.enemies[i])

    const directions = [
      { dx: 0, dy: -1 }, // up
      { dx: 0, dy: 1 },  // down
      { dx: -1, dy: 0 }, // left
      { dx: 1, dy: 0 },  // right
      { dx: 0, dy: 0 }   // stay
    ];


    const shuffled = directions[Math.floor(Math.random() * directions.length)];


    const newRow = GAME_DATA.enemies[i].row + shuffled.dy;
    const newCol = GAME_DATA.enemies[i].col + shuffled.dx;

    console.log(newRow)
 console.log(newCol)

    
    if (newRow >= 0 && newRow < GAME_DATA.rowsLen && newCol >= 0 && newCol < GAME_DATA.colsLen && canMoveTo(newRow, newCol) 

  

     // && (!GAME_DATA.enemies[i].row === newRow) && (!GAME_DATA.enemies[i].row === newCol) // Check if the cell is not occupied by another enemy
    
    ) 


    {
      GAME_DATA.enemies[i].row = newRow;
      GAME_DATA.enemies[i].col = newCol;
      GAME_DATA.enemies[i].el.style.transform = `translate(${GAME_DATA.enemies[i].col * GAME_DATA.cellSize}px, ${GAME_DATA.enemies[i].row * GAME_DATA.cellSize}px)`;
       console.log("enemy moved")
     
      
      // console.log("enemy moved")
     
    }

  }
 
}






let lv = document.getElementById("lives");// Lives management
function loseLife() {
  GAME_DATA.lives--;
  if (GAME_DATA.lives < 0) GAME_DATA.lives = 0;
  console.log("Lives left: " + GAME_DATA.lives);
  lv.innerHTML = `${GAME_DATA.lives}`;
  if (lives <= 0) {
    alert("Game Over");
    resetGame();
    // Reset game or redirect to another page
  }
}
function checkEnemyCollision() {
  GAME_DATA.enemies.forEach(enemy => {
    if (enemy.row === GAME_DATA.playerPos.row && enemy.col === GAME_DATA.playerPos.col) {
      console.log("Collision detected!");
      loseLife();
      return true; // Collision detected
    }
  });
}


function update() {



  checkEnemyCollision();
  moveEnemies();






  requestAnimationFrame(update)
}






const init = () => {


  getLevel();
  startTimer();

  requestAnimationFrame(update)
}



