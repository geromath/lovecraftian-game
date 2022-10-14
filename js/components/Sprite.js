import gameArea from "../main.js";

class Sprite {
  constructor(width, height, image, x, y) {
    this.width = width;
    this.height = height;
    this.image = image;
    this.position = { x: x, y: y };
    this.speed = 5;
  }

  draw() {
    gameArea.context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
  }
}

export default Sprite;
