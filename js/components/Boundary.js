import gameArea from "../main.js";

class Boundary {
  constructor ({position, width, height}) {
    this.position = position;
    this.width = width;
    this.height = height;
  }

  draw() {
    gameArea.context.fillStyle = 'red';
    gameArea.context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
  }
}

export default Boundary;