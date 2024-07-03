class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];

    clouds = [
        new Cloud()
    ];

    backgroundObject = [
        new BackgroundObject('../img/5_background/layers/air.png', -719),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/air.png', 719),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('../img/5_background/layers/air.png', 719*2),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObject('../img/5_background/layers/air.png', 719*3),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719*3),
    ];

    canvas;
    ctx;
    keyboard;
    otherDirection = false;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Kontext wird zurückgesetzt, da sonst die geladenen Bilder bei jeder Wiederholung neu erscheinen und nicht verschwinden

        this.ctx.translate(this.camera_x, 0); // Kontext = Bildauschnitt/Hintergrund wird verschoben um camera_x

        this.addObjectstoMap(this.backgroundObject);
        this.addObjectstoMap(this.clouds);
        this.addObjectstoMap(this.enemies);
        this.addToMap(this.character);
        
        this.ctx.translate(-this.camera_x, 0); // Zurück schieben vom Kontext

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectstoMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) { // hinzufügen des Image / Zeichnen
        if (mo.otherDirection) { // prüfen ob ohterDirection gesetzt ist oder nicht beim drücken der Pfeiltaste
            this.flipImage(mo);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
        if (mo.otherDirection) { // Prüfen ob etwas verändert wurde, wenn ja dann 'restore'
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save(); // Speichern des aktuellen Kontext "ctx" mit allen Eigenschaften
        this.ctx.translate(mo.width, 0); // Verschieben vom Objekt aufgrund der Spiegelung, da sonst das Img verschoben angezeigt werden würde
        this.ctx.scale(-1, 1); // Spiegeln des Img um 180 grad
        mo.x = mo.x * -1;
    }
    
    flipImageBack(mo) {
        this.ctx.restore(); // Rückängig machen der Spiegelung und des Verschieben bie flipImage
        mo.x = mo.x * -1;
    }
}