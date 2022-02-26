const enemyImage = new Image();
enemyImage.src = './images/Enemy1.png';

class Enemy {
  constructor(game, x, y, speed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 75;
    this.height = 75;
  }

  checkIntersection(player) {
    return (
      player.x + player.width > this.x &&
      player.x < this.x + this.width &&
      player.y + player.height > this.y &&
      player.y < this.y + this.height
    );
  }

  runLogic() {
    this.x -= this.speed;
    this.y += this.speed;
    if (this.y > (Math.random() / 2) * 900) {
      this.y -= this.speed;
    }
  }
  draw() {
    this.game.context.save();

    this.game.context.fillStyle = 'red';

    //this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.drawImage(
      enemyImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}
