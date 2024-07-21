class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  otherDirection = false;
  camera_x = 0;
  statusbar = new Statusbars();
  statusbarBottle = new StatusbarBottle();
  statusbarCoin = new StatusbarCoin();
  statusbarEndboss = new StatusbarEndboss();
  throwableObjects = [];
  hitObjects = new Set(); // Set, um getroffene Objekte zu verfolgen
  volumen = new ControllObjects();
  soundMuted;
  win_sound = new Audio("../audio/win.mp3");
  lose_sound = new Audio("../audio/lose.mp3");
  background_sound = new Audio("../audio/background.mp3");
  audio_sounds = [
    this.win_sound,
    this.lose_sound,
    this.character.walking_sound,
    this.character.collect_coin_sound,
    this.character.hurt_sound,
    this.character.collect_bottle_sound,
    this.character.snoring_sound,
    this.character.jump_sound,
    this.character.hit_chicken_sound,
    this.character.hit_endboss_sound,
    this.background_sound
  ];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.soundMuted = false;
    this.setCharacterForEnemies();
    this.backgroundMusic();
  }

  /**
   * function to pass or transfer the variable from the class world to all other extends
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * to collect all functions and start them
   */
  run() {
    setInterval(() => {
      this.checkCollision();
      
    }, 20);
    setInterval(() => {
      this.checkThrowObjects();
      this.checkCollectBottles();
      this.checkCollectCoins();
      this.throwEnemy();
      this.checkEnergy();
      this.characterIsComing();
    }, 200);
  }

  backgroundMusic() {
    setInterval(() => this.background_sound.play(), 1000);
  }

  checkThrowObjects() {
    if (this.canThrowBottles()) { // throw bottles until 0
      let bottle = new ThrowableObject(
        this.character.x + this.character.width,
        this.character.y
      );
      this.throwBottle(bottle);
    }
  }

  canThrowBottles() {
    return this.keyboard.D && this.character.bottles > 0;
  }

  throwBottle(bottle) {
    this.throwableObjects.push(bottle);
    this.character.decreaseObject("bottles");
    this.statusbarBottle.setPercentage(this.character.bottles * 10);
    this.character.throw_sound.play();
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.collidingWithEnemy(enemy)) {
        if (enemy instanceof Endboss) this.collidingWithEndboss();
        else if (this.colldingAbove()) this.crushChicken(enemy);
        else if (this.noJumpColliding(enemy)) {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
        }
      }
    });
  }

  collidingWithEnemy(enemy) {
    return this.character.isColliding(enemy);
  }

  collidingWithEndboss() {
    this.character.hit();
    this.statusbar.setPercentage(this.character.energy); 
  }

  colldingAbove() {
    return this.character.isAboveGround() && this.character.isSpeedYDecreasing();
  }

  crushChicken(enemy) {
    enemy.height = 20;
    enemy.y += 80;
    enemy.hitFromAbove = true; 
    this.character.hit_chicken_sound.play();
  }

  noJumpColliding(enemy) {
    return this.character.y == 180 && !enemy.hitFromAbove;
  }

  checkCollectBottles() {
    this.level.collectableObjects.forEach((object, index) => {
      if (this.character.isColliding(object) && object instanceof Bottle) {
        this.character.collectObject("bottles");
        this.statusbarBottle.setPercentage(this.character.bottles * 10);
        this.level.collectableObjects.splice(index, 1); // delete the collectet bottle by the array in level1
        this.character.collect_bottle_sound.play();
      }
    });
  }

  checkCollectCoins() {
    this.level.collectableObjects.forEach((object, index) => {
      if (this.character.isColliding(object) && object instanceof Coin) {
        this.character.collectObject("coins");
        this.statusbarCoin.setPercentage(this.character.coins * 10);
        this.level.collectableObjects.splice(index, 1); // delete the collectet coin by the array in level1
        this.character.collect_coin_sound.play();
      }
    });
  }

  throwEnemy() {
    this.throwableObjects.forEach((object) => {
        if (this.hitObjects.has(object)) return;
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isColliding(object)) return;
            this.hitObjects.add(object);
            this.handleCollision(enemy);
        });
    });
  }

  handleCollision(enemy) {
      if (enemy instanceof Endboss) {
          this.statusbarEndboss.setPercentage(enemy.energy);
          enemy.decreaseEnergy();
          this.character.hit_endboss_sound.play();
      } else {
          this.crushChicken(enemy);
      }
  }

  /**
   * Draws all objects on the canvas.
   */
  draw() {
    this.clearCanvas();
    this.ctx.translate(this.camera_x, 0);
    this.drawMovableObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawFixedObjects();
    this.requestNextFrame();
  }

  /**
  * Clears the entire canvas.
  */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
  * Draws all movable objects on the canvas.
  */
  drawMovableObjects() {
    this.addObjectstoMap(this.level.backgroundObject);
    this.addObjectstoMap(this.level.clouds);
    this.addObjectstoMap(this.level.enemies);
    this.addObjectstoMap(this.level.collectableObjects);
    this.addToMap(this.statusbarEndboss);
    this.addObjectstoMap(this.throwableObjects);
    this.addToMap(this.character);
  }

  /**
  * Draws all fixed objects on the canvas.
  */
  drawFixedObjects() {
    this.addToMap(this.statusbar);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarCoin);
  }

  /**
  * Requests the next animation frame to keep drawing.
  */
  requestNextFrame() {
    let self = this;
    requestAnimationFrame(function () {
        self.draw();
    });
  }


  /**
   * function to add the MULTIPLE Objects to the Map
   * @param {Object} objects
   */
  addObjectstoMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * function to add the SINGLE character
   * @param {Object} mo - moveableObject Class
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * function to flip the Img for moving left
   * @param {Object} mo - moveableObject Class
   */
  flipImage(mo) {
    this.ctx.save(); 
    this.ctx.translate(mo.width, 0); 
    this.ctx.scale(-1, 1); 
    mo.x = mo.x * -1;
  }

  /**
   * function to resset the flip for moving right
   * @param {Object} mo - moveableObject Class
   */
  flipImageBack(mo) {
    this.ctx.restore(); 
    mo.x = mo.x * -1;
  }

  /**
   * function to get and select only the Endboss
   * @param {Class} enemies - different classes defined in Array enemies
   * @returns - true if Endboss
   */
  getEndboss(enemies) {
    return enemies.find((enemy) => enemy instanceof Endboss);
  }

  getEnemies(enemies) {
    return enemies.filter((enemy) => !(enemy instanceof Endboss));
  }

  toggleSound() {
    this.soundMuted = !this.soundMuted; // Zustand umschalten
    this.audio_sounds.forEach((audio) => (audio.muted = this.soundMuted));
  }

  /**
   * Checks the energy of the character and endboss at regular intervals.
   */
  checkEnergy() {
    setInterval(() => {
        this.checkEndbossEnergy();
        this.checkCharacterEnergy();
    }, 1000);
  }

  /**
  * Checks the energy level of the endboss.
  */
  checkEndbossEnergy() {
    if (this.getEndboss(this.level.enemies).y > 500) {
        this.showWinningScreen();
        this.win_sound.play();
        this.clearAllIntervals();
    }
  }

  /**
  * Checks the energy level of the character.
  */
  checkCharacterEnergy() {
    if (this.character.energy == 0) {
        this.showLosingScreen();
        this.lose_sound.play();
        setTimeout(() => {
            this.clearAllIntervals();
        }, 3000);
    }
  }

  /**
  * Displays the winning screen.
  */
  showWinningScreen() {
    this.exitFullScreen();
    try {
      document.getElementById("youwon").classList.remove("d-none");
      document.getElementById("play_again").classList.remove("d-none");
      document.getElementById("mobile-btns").classList.add("d-none");
    } catch(e){}
  }

  /**
  * Displays the losing screen.
  */
  showLosingScreen() {
    this.exitFullScreen();
    document.getElementById("youlose").classList.remove("d-none");
    document.getElementById("play_again").classList.remove("d-none");
    document.getElementById("mobile_btns").classList.add("d-none");
  }

  /**
   * function to stop the sound and disable the keyboard
   */
  stopGame() {
    this.soundMuted = true;
    this.audio_sounds.forEach((audio) => (audio.muted = this.soundMuted));
    disableKeyboard();
    clearAllIntervals();
  }

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  exitFullScreen() {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen();
       else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
       else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
       else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  }

  /**
   * function to transfer the instance character to the endboss
   */
  setCharacterForEnemies() {
    this.level.enemies.forEach(enemy => {
      if (enemy instanceof Endboss) enemy.setCharacter(this.character)
    });
  }

  characterIsComing() {
    if (Math.abs((this.character.x + this.character.width) - this.getEndboss(this.level.enemies).x) < 250) {
      this.statusbarEndboss.x = this.getEndboss(this.level.enemies).x;
    }
  }
}