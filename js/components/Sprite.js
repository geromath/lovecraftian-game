import events from "../utils/events.js";
import gameArea from "../main.js";
import { boundaries } from "../main.js";
import rectangularCollision from "../utils/collisionDetection.js";
class Sprite {
  constructor(width, height, image, x, y, moveable) {
    this.width = width;
    this.height = height;
    this.image = image;
    this.position = { x: x, y: y };
    this.speed = 5;
    this.moveable = moveable;
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

  checkForCollision(direction) {
    for (let i = 0; i < boundaries.length; i++) {
      if (
        rectangularCollision(
          {
            ...this,
            position: {
              x: this.position.x + this.speed * direction.x,
              y: this.position.y + this.speed * direction.y,
            },
          },
          boundaries[i]
        )
      ) {
        return true;
      }
    }
    return false;
  }

  movement() {
    if (events.a) {
      if (!this.checkForCollision({ x: -1, y: 0 })) {
        this.position.x -= this.speed;
      }
    }
    if (events.d) {
      if (!this.checkForCollision({ x: 1, y: 0 })) {
        this.position.x += this.speed;
      }
    }
    if (events.s) {
      if (!this.checkForCollision({ x: 0, y: 1 })) {
        this.position.y += this.speed;
      }
    }
    if (events.w) {
      if (!this.checkForCollision({ x: 0, y: -1 })) {
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
