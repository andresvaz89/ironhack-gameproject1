const bulletImage = new Image();
bulletImage.src = './images/bullet2.png';

class Bullet {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y; //change for shooting from the middle of the player's sprite
    this.width = 20;
    this.height = 10;
  }
  runLogic() {
    this.x += 8; //bullet speed
  }
  draw() {
    this.game.context.save();
    this.game.context.fillStyle = 'yellow';
    this.game.context.drawImage(
      bulletImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}
