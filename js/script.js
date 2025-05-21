const gameScreen = document.getElementById("game-area")

const cells = [];

const wallCells = new Set();

const groundCells = [];

const screenWidth = gameScreen.offsetWidth;

const screenHeight = gameScreen.offsetHeight;
  
const cellSize = 60;

let rowsLen = screenWidth / cellSize;

let colsLen = screenHeight / cellSize;

let playerPos = {
  x: 0,
  y: 0,
  row: 0,
  col: 0
}

function makeGrid() {

  //gameScreen.style.gridTemplateColumns = `repeat(${screenWidth}, ${cellSize}px)`;

  //gameScreen.style.gridTemplateRows = `repeat(${screenHeight}, ${cellSize}px)`;

  for (let row = 0; row < rowsLen; row++) {

    for (let col = 0; col < colsLen; col++) {

      let cell = document.createElement("div")

      cell.classList = "cell";

      cell.style.width = `${cellSize}px`;

      cell.style.height = `${cellSize}px`;

      cell.dataset.coordinates = `${row},${col}`; //,${index}`;

      cell.dataset.x = col;
      cell.dataset.y = row;
      // console.log(`${row},${col}`)

      cell.style.border = '1px solid #444';

      gameScreen.appendChild(cell)
    }
  }
}
makeGrid()

function posCells() {

  for (i = 0; i < gameScreen.children.length; i++) {

    let divCell = gameScreen.children[i]
    let coordinates = gameScreen.children[i].dataset.coordinates
    let parts = coordinates.split(",")

    divCell.textContent = `${parts[0]},  ${parts[1]}`

    cells.push({

      div: divCell,
      index: i,
      row: parseInt(parts[0]),
      col: parseInt(parts[1]),

      isWall: false
    })

    if ((cells[i].row == 0) || (cells[i].col == 0) || (cells[i].col == colsLen - 1) || (cells[i].row == rowsLen - 1)) {

      cells[i].isWall = true;
    }
    // console.log(cells[i])
  }

  // cells[0].div.style.backgroundColor = "red"
}
// get positions of cells
posCells()

function setWalls() {

  cells.forEach(cell => {



    if (cell.isWall) {
      cell.div.style.backgroundColor = "red"

      wallCells.add(`${cell.row},${cell.col}`)

    }

  });


  for (i = 0; i <= 30; i++) {

    let randomRow = Math.floor(Math.random() * 10)

    let randomCol = Math.floor(Math.random() * 10)

    wallCells.add(`${randomRow},${randomCol}`)

  }


  //cells.forEach(cell => {

  for (i = 0; i < cells.length; i++) {

    wallCells.forEach(cor => {

      if ((cells[i].col == parseInt(cor.split(",")[0])) && (cells[i].row == parseInt(cor.split(",")[1]))) {

        cells[i].div.style.backgroundColor = "red"
      }


    })

  };

}
setWalls()

function createPlayer() {

  let player = document.createElement("img");

  player.src = "assets/player.png"

  player.className = "player"

  player.id = "player"


  gameScreen.appendChild(player);



  cells.forEach(cell => {
    if (canMoveTo(cell.row, cell.col)) {
      groundCells.push(cell)
    }
  })


  const spawnCell = groundCells[6]; // Or randomize


  player.style.transform = `translate(${(spawnCell.col * cellSize)}px, ${spawnCell.row * cellSize}px)`




  playerPos = { x: spawnCell.col * cellSize, y: spawnCell.row * cellSize, row: spawnCell.row, col: spawnCell.col }

  // console.log(cells[15])
  // console.log(playerPos)
}
createPlayer()

function canMoveTo(y, x) {
  return !wallCells.has(`${x},${y}`);
}

function movePlayer(dx, dy) {



  let player = document.getElementById("player")

  if (canMoveTo(playerPos.row + dy, playerPos.col + dx)) {

    const newRow = playerPos.row + dy;
    const newCol = playerPos.col + dx;




    const newX = newRow * cellSize;
    const newY = newCol * cellSize;




    player.style.transform = `translate(${newY}px, ${newX}px)`;

    playerPos.row = newRow;

    playerPos.col = newCol;

    playerPos.x = newX;

    playerPos.y = newY;


    console.log(playerPos)
  }
}

function bomb() {

  let bomb = document.createElement("img")
  console.log("space clicked")
  bomb.src = "/assets/bomb.gif"
  bomb.style.width = "60px"
  bomb.style.height = "60px"
  bomb.style.paddingTop = "0px"
  bomb.style.position = "absolute"
  bomb.style.marginLeft = "-25px"

  bomb.dataset.x = playerPos.col;
  bomb.dataset.y = playerPos.row;


  // playerPos = { x: spawnCell.col * cellSize, y: spawnCell.row * cellSize, row: spawnCell.row, col: spawnCell.col }

  // No need for String() if playerPos uses numbers
  const cell = document.querySelector(`.cell[data-x="${playerPos.col}"][data-y="${playerPos.row}"]`);

  // const myCell = cells.find(c =>
  //   c.x === 0 &&
  //   c.y === 0
  // )

  console.log(cell)

  //bomb.style.transform = `translate(${0}px, ${0}px)`;
  // if(cell){
  // //console.log(cell)
  cell.appendChild(bomb)
  // }
  console.log(bomb)



}


document.addEventListener('keydown', (e) => {
  // Check if arrow key is pressed
  e.preventDefault(); // Stops page from scrolling
  // Your movement logic
  if (e.key === 'ArrowRight') movePlayer(1, 0);
  if (e.key === 'ArrowLeft') movePlayer(-1, 0);
  if (e.key === 'ArrowDown') movePlayer(0, 1);
  if (e.key === 'ArrowUp') movePlayer(0, -1);
  if (e.code === "Space") bomb();
});

const enemies = [];

function createEnemy() {
  // Pick a random ground cell that is not occupied by the player
  let spawnCell;
  do {
    spawnCell = groundCells[Math.floor(Math.random() * groundCells.length)];
  } while (spawnCell.row === playerPos.row && spawnCell.col === playerPos.col);

  // Create enemy element
  const enemy = document.createElement("img");
  enemy.src = "assets/enemy.png";
  enemy.className = "enemy";
  enemy.style.position = "absolute";
  enemy.style.width = `${cellSize}px`;
  enemy.style.height = `${cellSize}px`;
  enemy.style.transform = `translate(${spawnCell.col * cellSize}px, ${spawnCell.row * cellSize}px)`;

  // Track enemy position
  enemy.dataset.row = spawnCell.row;
  enemy.dataset.col = spawnCell.col;

  gameScreen.appendChild(enemy);

  enemies.push({
    el: enemy,
    row: spawnCell.row,
    col: spawnCell.col
  });
}

for (let i = 0; i < 3; i++) {
  createEnemy();
}

let lastEnemyMoveTime = 0;
const ENEMY_MOVE_INTERVAL = 300; 

function moveEnemies() {
  enemies.forEach(enemy => {
    const directions = [
      {dx: 0, dy: -1}, // up
      {dx: 0, dy: 1},  // down
      {dx: -1, dy: 0}, // left
      {dx: 1, dy: 0},  // right
      {dx: 0, dy: 0}   // stay
    ];
    const shuffled = directions.sort(() => Math.random() - 0.5);
    for (let dir of shuffled) {
      const newRow = enemy.row + dir.dy;
      const newCol = enemy.col + dir.dx;
      if (
        newRow >= 0 && newRow < rowsLen &&
        newCol >= 0 && newCol < colsLen &&
        !wallCells.has(`${newRow},${newCol}`)
      ) {
        enemy.row = newRow;
        enemy.col = newCol;
        enemy.el.style.transform = `translate(${enemy.col * cellSize}px, ${enemy.row * cellSize}px)`;
        break;
      }
    }
  });
}

// Animation loop
function gameLoop(timestamp) {
  if (!lastEnemyMoveTime) lastEnemyMoveTime = timestamp;
  if (timestamp - lastEnemyMoveTime > ENEMY_MOVE_INTERVAL) {
    moveEnemies();
    lastEnemyMoveTime = timestamp;
  }
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

