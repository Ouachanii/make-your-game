import { GAME_DATA } from "./data.js";

export function startTimer() {

  const timer = document.getElementById("timer");
  
  
  function updateTimer() {


    if (GAME_DATA.isStarted && !GAME_DATA.isPaused && GAME_DATA.totalSeconds > 0) {
      GAME_DATA.totalSeconds--;
      const minutes = Math.floor(GAME_DATA.totalSeconds / 60);
      const seconds = GAME_DATA.totalSeconds % 60;
      timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      if (GAME_DATA.totalSeconds === 0) {
        clearInterval(GAME_DATA.timerInterval);
        // Handle timer end (game over, etc.)
      }
    }

  }

  timer.textContent = `${Math.floor(GAME_DATA.totalSeconds / 60)}:${(GAME_DATA.totalSeconds % 60).toString().padStart(2, "0")}`;

  if (GAME_DATA.isStarted && !GAME_DATA.isPaused && GAME_DATA.totalSeconds > 0) {
    GAME_DATA.timerInterval = setInterval(updateTimer, 1000);
  }
  
}