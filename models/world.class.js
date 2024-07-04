class World {

    character = new Character();
    level = level1; // Deklariert das Level mit backgroundObject, clouds, enemies

    canvas;
    ctx;
    keyboard;
    otherDirection = false;
    camera_x = 0;

    statusbar = new Statusbars();
    statusbarBottle = new StatusbarBottle();
    statusbarCoin = new StatusbarCoin();

    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * function to pass or transfer the variable from the class world to all other extends
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * check Character colllison with chicken
     * reduce the energy level by collision
     */
    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + this.character.width, this.character.y);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy); // übergibt die Energie zum setzten der Statusbar
            }
        });
    }

    /**
     * function to draw all to the canvas - background and objects
     * they will be called minimal 24 per second by the graphical card 
     */
    draw() { // Malt oder Zeichnet alle Sachen in das Canvas(Leinwand)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Kontext wird zurückgesetzt, da sonst die geladenen Bilder bei jeder Wiederholung neu erscheinen und nicht verschwinden

        this.ctx.translate(this.camera_x, 0); // Kontext = Bildauschnitt/Hintergrund wird verschoben um camera_x
        this.addObjectstoMap(this.level.backgroundObject);


        this.ctx.translate(-this.camera_x, 0); 
        // -------- Space for fixed objects on canvas --------
        this.addToMap(this.statusbar);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoin);
        this.ctx.translate(this.camera_x, 0);


        this.addObjectstoMap(this.level.clouds);
        this.addObjectstoMap(this.level.enemies);
        
        this.addObjectstoMap(this.throwableObjects)
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0); // Zurück schieben vom Kontext

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * function to add the MULTIPLE Objects to the Map 
     * @param {Object} objects 
     */
    addObjectstoMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * function to add the SINGLE character
     * @param {Object} mo - moveableObject Class
     */
    addToMap(mo) { // hinzufügen des Image / Zeichnen
        if (mo.otherDirection) { // prüfen ob otherDirection gesetzt ist oder nicht beim drücken der Pfeiltaste
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) { // Prüfen ob etwas verändert wurde, wenn ja dann 'restore'
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

    
}