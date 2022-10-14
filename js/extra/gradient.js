import gameArea from "../main.js";
import {player} from "../main.js";

const grad = {
  update: function () {
    let grd = gameArea.context.createRadialGradient(
      player.position.x + player.width / 2,
      player.position.y + player.height / 2,
      1,
      player.position.x + player.width / 2,
      player.position.y + player.height / 2,
      600
    );
    grd.addColorStop(0, "rgba(0, 0, 0, .1)");
    grd.addColorStop(1, "rgba(0, 0, 0, 1)");
    gameArea.context.fillStyle = grd;
    gameArea.context.fillRect(0, 0, gameArea.width, gameArea.height);
  },
};

export default grad;