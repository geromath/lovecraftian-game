import Boundary from "./components/Boundary.js";
import Sprite from "./components/Sprite.js";
import events from "./utils/events.js";
import collisions from "../assets/collisions.js";
import rectangularCollision from "./utils/collisionDetection.js";

// Game Area singleton
let gameArea = {
  canvas: document.getElementById("canvas"),
  context: canvas.getContext("2d"),
  width: 640,
  height: 512,
  x: 0,
  y: 0,
  tileSize: 16,
  scale: 2,
  start: function () {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.interval = setInterval(update, 1000 / 50);
    this.context.imageSmoothingEnabled = false;
  },
  update: function () {
    this.context.clearRect(0, 0, this.width, this.height);
    background.update();
  },
};

// Map collisions json to a 2d map of arrays
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 40) {
  collisionsMap.push(collisions.slice(i, i + 40));
}

// Spawn boundries using mapped collisions
const boundaries = [];
collisionsMap.forEach((row, i) => {
  row.forEach((tile, j) => {
    tile !== 0 &&
      boundaries.push(
        new Boundary({
          position: {
            x: j * gameArea.tileSize * gameArea.scale,
            y: i * gameArea.tileSize * gameArea.scale,
          },
          width: 16 * gameArea.scale,
          height: 16 * gameArea.scale,
        })
      );
  });
});

/*  
Set up the background
Should be done in a separate file maybe to handle level loading?
*/
const bg = new Image();
bg.src = "../assets/map.png";
const background = new Sprite(
  gameArea.width * gameArea.scale,
  gameArea.scale * gameArea.height,
  bg,
  0,
  0,
  false
);

/* Set up the player sprite/character */
// TODO: refactor to use a Player class that inherits from Sprite
const playerImage = new Image();
playerImage.src = "../assets/char.png";
const player = new Sprite(
  16 * gameArea.scale,
  32 * gameArea.scale,
  playerImage,
  100,
  100,
  true
);

// Should be moved later
const grad = {
  update: function () {
    let grd = gameArea.context.createRadialGradient(
      player.position.x + player.width / 2,
      player.position.y + player.height / 2,
      1,
      player.position.x + player.width / 2,
      player.position.y + player.height / 2,
      300
    );
    grd.addColorStop(0, "transparent");
    grd.addColorStop(0.8, "rgba(0, 0, 0, .4)");
    gameArea.context.fillStyle = grd;
    gameArea.context.fillRect(0, 0, gameArea.width, gameArea.height);
  },
};

const update = () => {
  gameArea.update();
  player.update();
  grad.update();
};

// Initiate the startup
const start = () => {
  console.log("Starting");
  events.start();
  gameArea.start();
};

// Start the game!
start();

export default gameArea;
export { boundaries };
