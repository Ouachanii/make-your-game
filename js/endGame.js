import { GAME_DATA } from './data.js';
import { init } from './init.js';


export function HandleWin() {
    GAME_DATA.isPaused = true
    GAME_DATA.level += 1;
    const winMenu = document.getElementById("win-menu");
    if (!winMenu) return;
    winMenu.classList.remove("hidden");
    winMenu.querySelector("#final-score").textContent = `${GAME_DATA.score}`;
    winMenu.querySelector("#final-level").textContent = GAME_DATA.level
    winMenu.querySelector("#final-time").textContent = `${180 - GAME_DATA.totalSeconds} s`;
}

export function HandleLose() {
        
   // GAME_DATA.isStarted = false;
    GAME_DATA.isPaused = true;

    const loseMenu = document.getElementById("game-over-menu");
    if (!loseMenu) return;

    loseMenu.classList.remove("hidden");
    loseMenu.querySelector("#final-score").textContent = `${GAME_DATA.score}`;
    loseMenu.querySelector("#final-time").textContent = `${180 - GAME_DATA.totalSeconds} seconds`;
    loseMenu.querySelector("#final-level").textContent = `${GAME_DATA.level}`;
    
}

export function endReached() {
    const timer = document.getElementById("timer");

    clearInterval(GAME_DATA.timerInterval);

    HandleWin();
}
