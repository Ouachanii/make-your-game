




document.addEventListener('keydown', (e) => {
  // Check if arrow key is pressed

  e.preventDefault(); // Stops page from scrolling


  // Your movement logic
  if (e.key === 'ArrowRight') movePlayer(1, 0);
  if (e.key === 'ArrowLeft') movePlayer(-1, 0);
  if (e.key === 'ArrowDown') movePlayer(0, 1);
  if (e.key === 'ArrowUp') movePlayer(0, -1);
  if (e.code === "Space") bomb();
  if (e.key === "a"){
   moveEnemies()
    };
  if (e.key === "s") GAME_DATA.isPaused = false;
  });





init();