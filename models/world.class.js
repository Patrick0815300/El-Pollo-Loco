class World {
  character = new Character();
  level = level1; // Deklariert das Level mit backgroundObject, clouds, enemies, ...

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
    this.character.hit_chicken_sound
  ];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.soundMuted = false; // Initialer Zustand des Tons
  }

  /**
   * function to pass or transfer the variable from the class world to all other extends
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * to collect all functions
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
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottles > 0) {
      // throw bottles until 0
      let bottle = new ThrowableObject(
        this.character.x + this.character.width,
        this.character.y
      );
      this.throwableObjects.push(bottle);
      this.character.decreaseObject("bottles");
      this.statusbarBottle.setPercentage(this.character.bottles * 10);
      this.character.throw_sound.play();
    }
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        console.log('Colliding Allgemein');
        if (enemy instanceof Endboss) {
          // Seitliche Kollision für den Endboss
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy); // übergibt die Energie zum Setzen der Statusbar
        } else if (this.character.y < 180 && !enemy.hitFromAbove) {
          // Kollision von oben für alle anderen Feinde
          enemy.height = 20;
          enemy.y += 80;
          enemy.hitFromAbove = true; // Markiere den Feind als von oben getroffen
          this.character.hit_chicken_sound.play();
        } else if (this.character.y == 180 && !enemy.hitFromAbove) {
          // Seitliche Kollision für alle anderen Feinde
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy); // übergibt die Energie zum Setzen der Statusbar
        }
      }
    });
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
        this.level.collectableObjects.splice(index, 1); // delete the collectet bottle by the array in level1
        this.character.collect_coin_sound.play();
      }
    });
  }

  throwEnemy() {
    this.throwableObjects.forEach((object) => {
      if (!this.hitObjects.has(object)) {
        // Überprüfen, ob das Objekt bereits getroffen wurde
        this.level.enemies.forEach((enemy) => {
          if (enemy.isColliding(object)) {
            if (enemy instanceof Endboss) {
              console.log("Treffer Endboss");
              this.hitObjects.add(object); // Objekt als getroffen markieren
              this.statusbarEndboss.setPercentage(enemy.energy);
              enemy.decreaseEnergy();
              this.character.hit_endboss_sound.play();
            } else {
              console.log("Treffer Chicken");
              this.hitObjects.add(object); // Objekt als getroffen markieren, wenn es kein Endboss ist
              enemy.height = 20;
              enemy.y += 80;
              enemy.hitFromAbove = true;
              this.character.hit_chicken_sound.play();
            }
          }
        });
      }
    });
  }

  /**
   * function to draw all to the canvas - background and objects
   * they will be called minimal 24 per second by the graphical card
   */
  draw() {
    // Malt oder Zeichnet alle Sachen in das Canvas(Leinwand)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Kontext wird zurückgesetzt, da sonst die geladenen Bilder bei jeder Wiederholung neu erscheinen und nicht verschwinden

    this.ctx.translate(this.camera_x, 0); // Kontext = Bildauschnitt/Hintergrund wird verschoben um camera_x
    this.addObjectstoMap(this.level.backgroundObject);

    this.addObjectstoMap(this.level.clouds);
    this.addObjectstoMap(this.level.enemies);
    this.addObjectstoMap(this.level.collectableObjects);

    this.addToMap(this.statusbarEndboss);

    this.addObjectstoMap(this.throwableObjects);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    // -------- Space for fixed objects on canvas --------
    this.addToMap(this.statusbar);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarCoin);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0); // Zurück schieben vom Kontext

    // draw() wird immer wieder aufgerufen
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
    // hinzufügen des Image / Zeichnen
    if (mo.otherDirection) {
      // prüfen ob otherDirection gesetzt ist oder nicht beim drücken der Pfeiltaste
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      // Prüfen ob etwas verändert wurde, wenn ja dann 'restore'
      this.flipImageBack(mo);
    }
  }

  /**
   * function to flip the Img for moving left
   * @param {Object} mo - moveableObject Class
   */
  flipImage(mo) {
    this.ctx.save(); // Speichern des aktuellen Kontext "ctx" mit allen Eigenschaften
    this.ctx.translate(mo.width, 0); // Verschieben vom Objekt aufgrund der Spiegelung, da sonst das Img verschoben angezeigt werden würde
    this.ctx.scale(-1, 1); // Spiegeln des Img um 180 grad
    mo.x = mo.x * -1;
  }

  /**
   * function to resset the flip for moving right
   * @param {Object} mo - moveableObject Class
   */
  flipImageBack(mo) {
    this.ctx.restore(); // Rückängig machen der Spiegelung und des Verschieben bie flipImage
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
   * function to check the energy of the Endboss and the Character
   * if Endboss y > 500 by the dead anmimation the game play a winning animation and stop
   * if the Characters energy = 0 the game play a lose animation and stop
   */
  checkEnergy() {
    setInterval(() => {
      if (this.getEndboss(this.level.enemies).y > 500) {
        document.getElementById("youwon").classList.remove("d-none");
        document.getElementById("play_again").classList.remove("d-none");
        document.getElementById("mobile-btns").classList.add("d-none");
        this.win_sound.play();
        this.clearAllIntervals();
      }

      if (this.character.energy == 0) {
        document.getElementById("youlose").classList.remove("d-none");
        document.getElementById("play_again").classList.remove("d-none");
        document.getElementById("mobile_btns").classList.add("d-none");
        this.lose_sound.play();
        setTimeout(() => {
          this.clearAllIntervals();
        }, 3000);
      }
    }, 1000);
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
}
