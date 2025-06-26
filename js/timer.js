import { GAME_DATA } from "./data.js";

export function startTimer(onTimerEnd) {
  const timer = document.getElementById("timer");

  if (GAME_DATA.timerInterval) {
    clearInterval(GAME_DATA.timerInterval);
    GAME_DATA.timerInterval = null;
  }

  function updateTimer() {

    if (GAME_DATA.isStarted && !GAME_DATA.isPaused && GAME_DATA.totalSeconds > 0) {
      GAME_DATA.totalSeconds--;
      const minutes = Math.floor(GAME_DATA.totalSeconds / 60);
      const seconds = GAME_DATA.totalSeconds % 60;
      timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      
      if (GAME_DATA.totalSeconds === 0) {
        clearInterval(GAME_DATA.timerInterval);
        GAME_DATA.timerInterval = null;
        if (typeof onTimerEnd === 'function') onTimerEnd();
      }

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