import gameArea from "../main.js";
import events from "../utils/events.js";
import { boundaries } from "../main.js";
import rectangularCollision from "../utils/collisionDetection.js";

class Player {
  constructor(image, width, height, x, y) {
    this.width = width;
    this.height = height;
    this.image = image;
    this.position = { x: x, y: y };
    this.speed = 5;
  }

  draw() {
    gameArea.context.drawImage(
      this.image,
      0,
      9,
      this.image.width,
      this.image.height-9,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
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
    this.movement();
    this.draw();
  }
}

export default Player;