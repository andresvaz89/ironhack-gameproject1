const enemyImage = new Image();
enemyImage.src = './images/Enemy1.png';

const explosionAnimation = new Image();
explosionAnimation.src = './images/explosion.png';

class Enemy {
  constructor(game, x, y, speed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 75;
    this.height = 75;
    //explosionAnimation.src = 'explosion.png';
    //this.explosion = explosionAnimation;
  }

  checkIntersection(player) {
    return (
      player.x - 20 + player.width > this.x + 20 && //fixed
      player.x + 20 < this.x + this.width - 20 &&
      player.y + player.height - 20 > this.y + 20 && //fixed?
      player.y + 20 < this.y + this.height - 20
    );
  }
  checkIntersectionBullets(player) {
    return (
      player.x + player.width > this.x && //fixed
      player.x < this.x + this.width &&
      player.y + player.height > this.y + 20 && //fixed?
      player.y < this.y + this.height
    );
  }

  runLogic() {
    this.x -= this.speed;
    this.y += this.speed;
    if (this.y > (Math.random() / 2) * 900) {
      this.y -= this.speed;
    }
    //this.game.enemyShoot(this.x, this.y);
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
