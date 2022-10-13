import gameArea from "../main.js";

class Boundary {
  constructor ({position, width, height}) {
    this.position = position;
    this.width = width;
    this.height = height;
  }
}

export default Boundary;