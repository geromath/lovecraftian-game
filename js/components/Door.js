import rectangularCollision from "../utils/collisionDetection.js";
import { player } from "../main.js";
import gameArea from "../main.js";
import level from "../controllers/LevelController.js";

class Door {
  constructor({ position, width, height, goToRoom }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.goToRoom = goToRoom;
  }

  // Detection done, now change map
  update() {
    for (let j = 0; j < level.exits.length; j++) {
      if (rectangularCollision(level.exits[j], player)) {
        // Update what level I am in
        console.log("I hit the door!");
      }
    }
  }

  // TODO
  /* The door should detect when the player hits it, 
  to not have to do that in the player
  */
}

export default Door;
