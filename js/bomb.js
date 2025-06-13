import { GAME_DATA } from './data.js';

export function bomb() {

  if(GAME_DATA.isPaused || !GAME_DATA.isStarted || Date.now() - GAME_DATA.lastBomb < 2000) return;
  GAME_DATA.lastBomb = Date.now();


  // Visual bomb placement
  let bomb = document.createElement("img");
  bomb.src = "assets/bomb.gif";
  bomb.className = "bomb";
  bomb.style.position = "absolute";
  bomb.style.width = `${GAME_DATA.cellSize}px`;
  bomb.style.height = `${GAME_DATA.cellSize}px`;
  bomb.style.transform = `translate(${GAME_DATA.playerPos.y * GAME_DATA.cellSize}px, ${GAME_DATA.playerPos.x * GAME_DATA.cellSize}px)`


  bomb.dataset.x = GAME_DATA.playerPos.x;
  bomb.dataset.y = GAME_DATA.playerPos.y;


  let gameArea = document.getElementById("game-area");

  gameArea.appendChild(bomb);



  setTimeout(() => {


    bomb.src = "assets/dFOsRT.gif";
    bomb.style.width = `${3 * GAME_DATA.cellSize}px`;
    bomb.style.height = `${3 * GAME_DATA.cellSize}px`;

    bomb.style.marginTop = "-60px";
    bomb.style.marginLeft = "-60px";


    GAME_DATA.bombedCells.push({ x: parseInt(bomb.dataset.x), y: parseInt(bomb.dataset.y) });

    GAME_DATA.bombedCells.push({ x: parseInt(bomb.dataset.x) - 1, y: parseInt(bomb.dataset.y) }); // up

    GAME_DATA.bombedCells.push({ x: parseInt(bomb.dataset.x) + 1, y: parseInt(bomb.dataset.y) }); //down

    GAME_DATA.bombedCells.push({ x: parseInt(bomb.dataset.x), y: parseInt(bomb.dataset.y) - 1 }); //left

    GAME_DATA.bombedCells.push({ x: parseInt(bomb.dataset.x), y: parseInt(bomb.dataset.y) + 1 }); //right

     


    setTimeout(() => {

      bomb.remove();

      GAME_DATA.bombedCells.length = 0;


    }, 500)

  }, 1500);

}




export function bombedArea(x, y) {
  return GAME_DATA.bombedCells.some(elem => (elem.x == x && elem.y == y));
}



export function decoloreCell(x, y) {

  for (let i = 0; i < GAME_DATA.cells.length; i++) {

    if (GAME_DATA.cells[i].x == x && GAME_DATA.cells[i].y == y) {
      console.log(GAME_DATA.cells[i])
      GAME_DATA.cells[i].div.classList.remove("wood");
      GAME_DATA.cells[i].div.classList.add("ground");

    }

  }
}