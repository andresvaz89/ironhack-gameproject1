class Game {
  constructor(canvasElement, screens) {
    this.canvas = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.screens = screens;
    this.canvas.width = 2000;
    this.canvas.height = 1000;
    this.running = false;
  }

  start() {
    this.canvas.style.backgroundImage = 'url(./images/Wallpaper1a.jpg)';
    this.running = true;
    this.score = 0;
    this.player = new Player(this);
    this.enemies = [];
    this.bullets = [];
    this.bosses = [];
    this.enemyProjectiles = [];

    this.enableControls();
    //playerImage
    this.loop();
  }

  displayScreen(name) {
    for (let screenName in this.screens) {
      this.screens[screenName].style.display = 'none';
    }
    this.screens[name].style.display = 'block';
  }

  lose() {
    this.displayScreen('end');
    this.running = false;
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const code = event.code;
      console.log(code);
      switch (code) {
        case 'ArrowUp':
          this.player.y -= 10;
          break;
        case 'ArrowDown':
          this.player.y += 10;
          break;
        case 'ArrowRight':
          this.player.x += 10;
          break;
        case 'ArrowLeft':
          this.player.x -= 10;
          break;
        case 'Space':
          this.fireWeapon();
          break;
      }
    });
  }

  fireWeapon() {
    const bullet = new Bullet(
      this,
      this.player.x + this.player.width / 2.4,
      this.player.y + this.player.height / 2.4
    );
    this.bullets.push(bullet);
  }

  generateEnemy() {
    const enemySpeed = Math.random() + 0.3;
    const enemyY = Math.random() * this.canvas.height - 75; //height of canvas - enemy size (change later)
    const enemy = new Enemy(this, 2000, enemyY, enemySpeed);
    this.enemies.push(enemy);
    const enemy2 = new Enemy(this, 20, enemyY, -enemySpeed);
    this.enemies.push(enemy2);
  }
  //BOSS
  generateBoss() {
    const bossSpeed = 1;
    const boss = new Boss(this, 1500, 500, bossSpeed);
    this.bosses.push(boss);
    this.canvas.style.backgroundImage = 'url(./images/Wallpaper1b.jpg)';
    boss.runLogic();
  }

  generateEnemyFromBehind() {
    const enemySpeedFromBehind = Math.random() - 0.5;

    const enemy = new Enemy(this, 100, 500, enemySpeedFromBehind);
    this.enemies.push(enemy);
  }

  loop() {
    window.requestAnimationFrame(() => {
      this.runLogic();
      this.draw();
      if (this.running) {
        this.loop();
      }
    });
  }

  runLogic() {
    if (Math.random() < 0.01) {
      this.generateEnemy();
    }

    /*
      enemyShoot(x, y) {
        const enemyProjectile = new EnemyProjectile(this, x, y);
        this.enemyProjectiles.push(enemyProjectile);
      }
      */
    //just spawn 1 boss
    if (this.score == 200 && this.bosses.length == 0 && this.score < 500) {
      //before >=
      this.generateBoss();
      //boss.runLogic(); //boss.runLogic2?

      //console.log('Boss Spawned');
    }

    if (this.score == 2000 && this.bosses.length == 0 && this.score < 2200) {
      //before >=
      this.generateBoss();
      //boss.runLogic(); //boss.runLogic3?

      //console.log('Boss Spawned');
    }

    this.player.runLogic();
    boss.runLogic();

    if (this.player.lives <= 0) {
      this.lose();
    }

    for (const enemy of this.enemies) {
      enemy.runLogic();

      if (Math.random() < 0.005) {
        const enemyProjectile = new EnemyProjectile(
          this,
          enemy.x + enemy.width,
          enemy.y + enemy.height / 2,
          enemy.speed * 2
        );
        this.enemyProjectiles.push(enemyProjectile);
      }

      const areIntersecting = enemy.checkIntersection(this.player);
      if (areIntersecting) {
        const indexOfEnemy = this.enemies.indexOf(enemy);
        this.enemies.splice(indexOfEnemy, 1);
        this.player.lives -= 1;
        if (this.player.lives == 2) {
          this.player.image = playerImageWithTwoLives;
        } else if (this.player.lives == 1) {
          this.player.image = playerImageWithOneLive;
        }
        //cambiar color de la nave
      }
      const enemyIsOutOfBounds = this.x + enemy.width < 0;

      if (enemyIsOutOfBounds) {
        this.enemies.splice(indexOfEnemy, 1);
        generateEnemyFromBehind();
        console.log('out of bounds');
      }
    }

    for (const bullet of this.bullets) {
      bullet.runLogic();
      for (const enemy of this.enemies) {
        //if bullet touches enemy, both dissappear
        const bulletandEnemyareIntersecting =
          enemy.checkIntersectionBullets(bullet);
        const indexOfEnemy = this.enemies.indexOf(enemy);

        if (bulletandEnemyareIntersecting) {
          this.enemies.splice(indexOfEnemy, 1);
          const indexOfBullet = this.bullets.indexOf(bullet);
          this.bullets.splice(indexOfBullet, 1);
          this.score += 100;
        }
        /* const enemyIsOutOfBounds = this.x + enemy.width < 0;

        if (enemyIsOutOfBounds) {
          this.enemies.splice(indexOfEnemy, 1);
          generateEnemyFromBehind();
          console.log('out of bounds');
        }*/

        if (bullet.x - bullet.width > this.canvas.width) {
          const indexOfBullet = this.bullets.indexOf(bullet);
          this.bullets.splice(indexOfBullet, 1);
          // console.log('bullet out');
        }
      }
      for (const boss of this.bosses) {
        const bulletandBossareIntersecting = boss.checkIntersection(bullet);
        const indexOfBoss = this.bosses.indexOf(boss);

        if (bulletandBossareIntersecting) {
          //this.bosses.splice(indexOfBoss, 1);
          const indexOfBullet = this.bullets.indexOf(bullet);
          this.bullets.splice(indexOfBullet, 1);
          boss.lives -= 1;
          if (boss.lives <= 0) {
            this.bosses.splice(indexOfBoss, 1);
            this.score += 1000;
          }
        }
        /* const bossIsOutOfBounds = this.x + boss.width < 0;
        if (bossIsOutOfBounds) {
            
          this.bosses.splice(indexOfBoss, 1);
          generateBossFromBehind();
          console.log('out of bounds');
        }*/

        if (bullet.x - bullet.width > this.canvas.width) {
          const indexOfBullet = this.bullets.indexOf(bullet);
          this.bullets.splice(indexOfBullet, 1);
          // console.log('bullet out');
        }
      }
    }

    for (const enemyProjectile of this.enemyProjectiles) {
      enemyProjectile.runLogic();

      const areIntersecting = enemyProjectile.checkProjectileIntersection(
        this.player
      );
      if (areIntersecting) {
        const indexOfEnemyProjectile =
          this.enemyProjectiles.indexOf(enemyProjectile);
        this.enemyProjectiles.splice(indexOfEnemyProjectile, 1);
        this.player.lives -= 1;
        if (this.player.lives == 2) {
          this.player.image = playerImageWithTwoLives;
        } else if (this.player.lives == 1) {
          this.player.image = playerImageWithOneLive;
        }
        //cambiar color de la nave
      }
    }
  }

  drawScore() {
    this.context.font = '48px monospace';
    this.context.fillText(this.score, 400, 400);
  }

  draw() {
    this.context.clearRect(0, 0, 2000, 1000);
    for (const enemy of this.enemies) {
      enemy.draw();
      //this.enemyProjectile.draw();
    }
    for (const boss of this.bosses) {
      boss.draw();
    }
    for (const bullet of this.bullets) {
      bullet.draw();
    }
    for (const enemyProjectile of this.enemyProjectiles) {
      this.context.clearRect(
        enemyProjectile.x,
        enemyProjectile.y,
        enemyProjectile.width,
        enemyProjectile.height
      );
      enemyProjectile.draw();
      console.log('being drawn');
    }
    this.player.draw();
    this.drawScore();
  }
}
