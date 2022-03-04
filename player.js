const playerImage = new Image();
playerImage.src = './images/CommandShip-1.png';

const playerImageWithTwoLives = new Image();
playerImageWithTwoLives.src = './images/CommandShip-2.png';

const playerImageWithOneLive = new Image();
playerImageWithOneLive.src = './images/CommandShip-3.png';

class Player {
  constructor(game) {
    this.game = game;
    this.x = 500;
    this.y = 500;
    this.width = 100;
    this.height = 100;
    this.lives = 3;
    this.image = playerImage;
  }

  runLogic() {
    // this. -= 1;      antiguo movimiento del player
  }

  draw() {
    this.game.context.save();
    this.game.context.fillStyle = 'blue';
    //player1 drew
    this.game.context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.game.context.restore();
  }
}
