import Sprite from "../components/Sprite.js";
import levels from "./levels.js";
import Boundary from "../components/Boundary.js";
import Door from "../components/Door.js";

let levelReady = false;

const level = {
  width: 640,
  height: 512,
  tileSize: 16,
  scale: 2,
  load: function (levelNumber) {
    const l = levels[levelNumber];
    levelReady = false;

    this.image = new Image();
    this.image.src = l.src;
    this.background = new Sprite(this.width, this.height, this.image, 0, 0);

    this.boundaries = loadCollisions(levelNumber);
    this.exits = loadDoors(levelNumber);

    this.image.onload = function () {
      levelReady = true;
    };
    return this.background;
  },
};

function loadCollisions(levelNumber) {
  const collisionsMap = [];
  for (let i = 0; i < levels[levelNumber].collisions.length; i += 20) {
    collisionsMap.push(levels[levelNumber].collisions.slice(i, i + 20));
  }

  // Spawn boundries using mapped collisions
  const boundaries = [];
  collisionsMap.forEach((row, i) => {
    row.forEach((tile, j) => {
      tile !== 0 &&
        boundaries.push(
          new Boundary({
            position: {
              x: j * level.tileSize * 2,
              y: i * level.tileSize * 2,
            },
            width: 16 * level.scale,
            height: 16 * level.scale,
          })
        );
    });
  });
  return boundaries;
}

function loadDoors(levelNumber) {
  const doorMap = [];
  for (let i = 0; i < levels[levelNumber].doors.length; i += 20) {
    doorMap.push(levels[levelNumber].doors.slice(i, i + 20));
  }

  const exits = [];
  doorMap.forEach((row, i) => {
    row.forEach((tile, j) => {
      tile !== 0 &&
        exits.push(
          new Door({
            position: {
              x: j * level.tileSize * 2,
              y: i * level.tileSize * 2,
            },
            width: 16 * level.scale,
            height: 16 * level.scale,
            goToRoom: tile,
          })
        );
    });
  });
  return exits;
}

// Map collisions json to a 2d map of arrays

export default level;
export { levelReady };
