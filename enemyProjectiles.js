const enemyProjectileImage = new Image();
enemyProjectileImage.src = '/images/enemyProjectile.png';

class EnemyProjectile {
  constructor(game, x, y, speed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 10;
    this.speed = speed;
  }

  checkProjectileIntersection(player) {
    return (
      player.x - 10 + player.width > this.x + 10 && //fixed
      player.x + 10 < this.x + this.width - 10 &&
      player.y + player.height - 10 > this.y + 10 && //fixed?
      player.y + 10 < this.y + this.height - 10
    );
  }

  runLogic() {
    this.x -= this.speed; //enemyProjectile speed
  }

  draw() {
    this.game.context.save();
    //this.game.context.fillStyle = 'red';
    this.game.context.translate(this.x, this.y);
    if (this.speed > 0) {
      this.game.context.scale(-1, 1);
    }
    this.game.context.drawImage(
      enemyProjectileImage,
      0,
      0,
      this.width,
      this.height
    );
    this.game.context.restore();
  }
}
