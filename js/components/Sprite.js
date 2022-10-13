import events from "../utils/events.js";
import gameArea from "../main.js";

class Sprite {
  constructor (width, height, image, x, y, moveable) {
    this.width = width;
    this.height = height;
    this.image = image;
    this.position = {x: x, y: y}
    this.speed = 5;
    this.moveable = moveable;
  }

  draw() {
    gameArea.context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  movement() {
    if(events.a) {
      
      if(this.position.x - this.speed < 0) {
        this.position.x = 0
      } else {
        this.position.x -= this.speed;
      }
    }
    if (events.d){
      if(this.position.x + this.speed + this.width > gameArea.width) {
        this.position.x =gameArea.width - this.width;
      } else {
        this.position.x += this.speed;
      }
    }
    if(events.s) {
      if(this.position.y + this.speed + this.height > gameArea.height) {
        this.position.y = gameArea.height - this.height;
      } else {
        this.position.y += this.speed;
      }
    }
    if (events.w){
      if(this.position.y - this.speed < 0) {
        this.position.y = 0;
      } else {
        this.position.y -= this.speed;
      }
    }
  }

  update() {
    this.moveable && this.movement();
    this.draw();
  }
}

export default Sprite;