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
    const loseMenu = document.getElementById("game-over-menu");
    if (!loseMenu) return;
    loseMenu.classList.remove("hidden");
    const scoreElem = loseMenu.querySelector("#final-score");
    const timeElem = loseMenu.querySelector("#final-time");
    if (scoreElem) scoreElem.textContent = `Final Score: ${GAME_DATA.score}`;
    if (timeElem) timeElem.textContent = `Time Taken: ${GAME_DATA.totalSeconds} seconds`;
    const restartBtn = loseMenu.querySelector("#restart-button");
    if (restartBtn) {
        // Remove previous listeners by cloning
        const newBtn = restartBtn.cloneNode(true);
        restartBtn.parentNode.replaceChild(newBtn, restartBtn);
        newBtn.addEventListener("click", () => {
            init();
        });
    }
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
