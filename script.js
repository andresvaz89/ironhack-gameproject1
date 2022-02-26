const canvasElement = document.querySelector('canvas');

const enemy = new Enemy();

const boss = new Boss();

const startScreenElement = document.getElementById('start-screen');
const playingScreenElement = document.getElementById('playing-screen');
const endScreenElement = document.getElementById('game-over-screen');

const screenElements = {
  start: startScreenElement,
  playing: playingScreenElement,
  end: endScreenElement
};
const game = new Game(canvasElement, screenElements);

const startButton = startScreenElement.querySelector('button');
const tryAgainButton = endScreenElement.querySelector('button');

startButton.addEventListener('click', () => {
  game.displayScreen('playing');
  game.start();
});

endScreenElement.addEventListener('click', () => {
  game.displayScreen('playing');
  game.start();
});

//01:30:00 del video del martes 15
