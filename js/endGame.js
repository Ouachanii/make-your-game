import { GAME_DATA } from './data.js';
import { init } from './init.js';


export function HandleWin() {
    const winMenu = document.getElementById("win-menu");
    winMenu.classList.remove("hidden");
    winMenu.querySelector("#final-score").textContent = `Final Score: ${GAME_DATA.score}`;
    winMenu.querySelector("#final-time").textContent = `Time Taken: ${GAME_DATA.totalSeconds} seconds`;
    winMenu.querySelector("#restart-button").addEventListener("click", () => {
        init();
    }
    );
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
    timer.textContent = `You reached the end in ${GAME_DATA.totalSeconds} seconds!`;
    GAME_DATA.isStarted = false;
    GAME_DATA.isPaused = true;

    document.getElementById("pause-menu").classList.remove("hidden");
    HandleWin();
}
