const canvasElement = document.querySelector('canvas');

class Player {
  constructor(game) {
    this.game = game;
    this.x = 100;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    this.context.fillStyle = 'blue';

    //player1 drew
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }
}

const player = new Player();

class Game {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.message = 'Hello pilot';
    this.player = new Player(this);
  }
  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      this.loop();
    });
  }
  runLogic() {
    this.player.x += 10;
  }
  draw() {
    this.context.clearRect(0, 0, 500, 500);
    this.player.draw();
  }
}

const game = new Game(canvasElement);

game.loop();

//00:47:00 del video del martes 15
