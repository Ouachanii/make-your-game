import { GAME_DATA } from "./data.js";
import { HandleLose } from "./endGame.js";

export function startTimer() {
  const timer = document.getElementById("timer");

  if (GAME_DATA.timerInterval) {
    clearInterval(GAME_DATA.timerInterval);
    GAME_DATA.timerInterval = null;
  }

  function updateTimer() {

    if (GAME_DATA.isStarted && !GAME_DATA.isPaused) {
      GAME_DATA.totalSeconds--;
      if (GAME_DATA.totalSeconds < 0) {
        HandleLose();
        clearInterval(GAME_DATA.timerInterval);
        GAME_DATA.timerInterval = null;
        return;
      }
      const minutes = Math.floor(GAME_DATA.totalSeconds / 60);
      const seconds = GAME_DATA.totalSeconds % 60;
      timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    } else {

      const minutes = Math.floor(GAME_DATA.totalSeconds / 60);
      const seconds = GAME_DATA.totalSeconds % 60;
      timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  }

  timer.textContent = `${Math.floor(GAME_DATA.totalSeconds / 60)}:${(GAME_DATA.totalSeconds % 60).toString().padStart(2, "0")}`;

  if (GAME_DATA.isStarted && !GAME_DATA.isPaused && GAME_DATA.totalSeconds > 0) {
    GAME_DATA.timerInterval = setInterval(updateTimer, 1000);
  }
}

export function stopTimer() {
  if (GAME_DATA.timerInterval) {
    clearInterval(GAME_DATA.timerInterval);
    GAME_DATA.timerInterval = null;
  }
}