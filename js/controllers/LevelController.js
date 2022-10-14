import Sprite from "../components/Sprite.js";

let levelReady = false;

const levelSources = [
  'room0.png',
  'room1.png'
]

const level = {
  load: function (width, height, src) {
    levelReady = false;

    this.image = new Image();
    this.image.src = src;
    this.background = new Sprite(width, height, this.image, 0, 0,)

    this.image.onload = function () {
      levelReady = true;
    }
    return this.background;
  }
}

export default level;
export {levelReady}