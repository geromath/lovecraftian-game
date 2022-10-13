import Boundary from "./components/Boundary.js";
import Sprite from "./components/Sprite.js";
import events from "./utils/events.js"
import collisions from "../assets/collisions.js"
import rectangularCollision from "./utils/collisionDetection.js";

let gameArea = {
  canvas: document.getElementById('canvas'),
  context: canvas.getContext('2d'),
  width: 640,
  height: 512,
  x: 0,
  y: 0,
  tileSize: 16,
  scale: 2,
  start: function () {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.interval = setInterval(update, 1000/50);
    this.context.imageSmoothingEnabled = false;
  },
  update: function () {
    this.context.clearRect(0, 0, this.width, this.height);
    background.update();
  }
}

const bg = new Image();
bg.src = '../assets/map.png';
const background = new Sprite(640*gameArea.scale, gameArea.scale*512, bg, 0, 0, false)
const playerImage = new Image();
playerImage.src = '../assets/char.png';

bg.onload = () => {
  gameArea.context.drawImage(playerImage, 0, 0);
}

const update = () => {
  gameArea.update();
  boundaries.forEach((b) => {
    if (rectangularCollision(player, b)) {
      console.log('col');
    }
  })
  player.update();
}

const collisionsMap = [];
for(let i = 0; i < collisions.length; i += 40) {
  collisionsMap.push(collisions.slice(i, i + 40));
}

const boundaries = [];
collisionsMap.forEach((row, i) => {
  row.forEach((tile, j) => {
    tile !== 0 && boundaries.push(new Boundary({position: {x: j * gameArea.tileSize * gameArea.scale, y: i * gameArea.tileSize * gameArea.scale}, width: 16 * gameArea.scale, height: 16 * gameArea.scale}))
  })
})

const start = () => {
  console.log('Starting');
  events.start();
  gameArea.start();
  boundaries.push(new Boundary({position: {x: 4* gameArea.tileSize * gameArea.scale, y: 4* gameArea.tileSize * gameArea.scale}, width: 16 * gameArea.scale, height: 16 * gameArea.scale}))
}

let player = new Sprite(16*gameArea.scale, 32*gameArea.scale, playerImage, 200, 200, true);
start();

export default gameArea;