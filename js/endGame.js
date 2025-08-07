import { GAME_DATA } from './data.js';
import { init } from './init.js';


export function HandleWin() {
    GAME_DATA.isPaused = true;
    const nextLevel = GAME_DATA.level + 1;
    const winMenu = document.getElementById("win-menu");
    if (!winMenu) return;

    // Show win menu
    winMenu.classList.remove("hidden");
    const finalScore = winMenu.querySelector("#final-score");
    const finalLevel = winMenu.querySelector("#final-level");
    const finalTime = winMenu.querySelector("#final-time");

    if (finalScore) finalScore.textContent = `${GAME_DATA.score}`;
    if (finalLevel) finalLevel.textContent = nextLevel;
    if (finalTime) finalTime.textContent = `${180 - GAME_DATA.totalSeconds} s`;
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

    if (timer && GAME_DATA.timerInterval) {
        clearInterval(GAME_DATA.timerInterval);
    }

    GAME_DATA.isStarted = false;
    GAME_DATA.animationId = null;
    HandleWin();
}
