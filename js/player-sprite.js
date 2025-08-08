const player = document.getElementById("player-sprite");
const area = document.getElementById("sprite-container");

let x = area.clientWidth / 2;
let speed = 2;
let direction = 1;
let frame = 0;
let frameTimer = 0;
const frameSpeed = 6;

const frameWidth = 27; 
const frameHeight = 41;

// sprite row mapping
const rowRight = frameHeight*3;
const rowLeft = frameHeight * 1;
function animate() {
  x += speed * direction;

  if (x <= 0) {
    direction = 1;
    frame = 0;
  }
  if (x >= area.clientWidth - frameWidth) {
    direction = -1;
    frame = 0;
  }

  frameTimer++;
  if (frameTimer >= frameSpeed) {
    frame = (frame + 1) % 4; // 4 frames in total
    frameTimer = 0;
  }

    player.style.backgroundPosition = `-${frame * frameWidth}px -${(direction === 1 ? rowRight : rowLeft)}px`;
  player.style.transform = `translateX(${x}px)`;

  requestAnimationFrame(animate);
}

animate();
