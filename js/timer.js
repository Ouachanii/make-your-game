import { GAME_DATA } from "./data.js";


export function startTimer() {

  const timer = document.getElementById("timer");

  GAME_DATA.startTime = Date.now();

  GAME_DATA.timerInterval = setInterval(() => {

    const elapsed = Math.floor((Date.now() - GAME_DATA.startTime) / 1000);

    GAME_DATA.totalSeconds = elapsed;

    const minutes = Math.floor(elapsed / 60);

    const seconds = elapsed % 60;
    
    timer.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  }
  , 1000);

}