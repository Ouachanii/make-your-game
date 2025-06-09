import { GAME_DATA } from "./data.js";
export function startTimer() {
  const timer = document.getElementById("timer");
  GAME_DATA.startTime = Date.now();
  GAME_DATA.timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - GAME_DATA.startTime) / 1000);
    GAME_DATA.totalSeconds = elapsed;
    timer.textContent = `${elapsed}s`;
  }
  , 1000);
}