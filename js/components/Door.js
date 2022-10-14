import rectangularCollision from "../utils/collisionDetection.js";
import { player, exits } from "../main.js";
import gameArea from "../main.js";

class Door {
  constructor({position, width, height, goToRoom}) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.goToRoom = goToRoom;
  }

  // Detection done, now change map
  update() {
    for(let j = 0; j < exits.length; j++) {
      if (rectangularCollision(exits[j], player)) {
        gameArea.room = this.goToRoom;
      }
    }
  }

  // TODO
  /* The door should detect when the player hits it, 
  to not have to do that in the player
  */
}

export default Door;