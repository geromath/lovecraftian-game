import Boundary from "./components/Boundary.js";
import Sprite from "./components/Sprite.js";
import events from "./utils/events.js";
import collisions from "../assets/collisions.js";
import grad from "./extra/gradient.js";
import doors from "../assets/doors.js";
import Door from "./components/Door.js";
import Player from "./components/Player.js";
import level from "./controllers/LevelController.js";

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
  levelNumber: 0,
  start: function () {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.interval = setInterval(update, 1000 / 50);
    this.context.imageSmoothingEnabled = false;

    this.background = level.load(this.levelNumber);
  },
  update: function () {
    this.context.clearRect(0, 0, this.width, this.height);
    this.background.update();
  },
};

/* Set up the player sprite/character */
// TODO: refactor to use a Player class that inherits from Sprite
const playerImage = new Image();
playerImage.src = "../assets/char.png";
const player = new Player(
  playerImage,
  16 * gameArea.scale,
  24 * gameArea.scale,
  16 * gameArea.scale,
  16 * gameArea.scale
);

// Should be moved later

const update = () => {
  gameArea.update();
  player.update();
  grad.update();

  // Updating door for now
  for (let j = 0; j < level.exits.length; j++) {
    level.exits[j].update();
  }
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
export { player };
