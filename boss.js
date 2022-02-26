const bossImage = new Image();
bossImage.src = './images/EnemyBoss.png';

class Boss {
  constructor(game, x, y, speed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 200;
    this.height = 200;
    this.lives = 20;
    //console.log(this.x);
    //console.log(this.y);
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
    this.y += this.speed;
    if (this.y > 900) {
      this.y -= this.speed;
    } else if (this.y < 900) {
      this.y -= this.speed;
    }
  }
  draw() {
    this.game.context.save();

    this.game.context.fillStyle = 'red';

    //this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.drawImage(
      bossImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}
