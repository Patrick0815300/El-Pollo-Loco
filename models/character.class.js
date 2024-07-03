class Character extends MovableObject {
    height = 250;
    width = 150;
    y = 180;
    speed = 6;

    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png',
    ];


    world;
    walking_sound = new Audio('../audio/step.mp3');





    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png',);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }



    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < level1.level_end_x) { // kann nur bis zu level_end_x Koordinate laufen
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play(); // spielt den Sound ab für das Laufen
            }

            if (this.world.keyboard.LEFT && this.x > 0) { // Cahrater kann nicht nach links aus dem Bild herrauslaufen mit > 0
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) { // Wenn der die Taste UP und der Charakter nicht auf dem Boden steht
                this.jump();
            }

            this.world.camera_x = -this.x + 100; // Verschieben der Welt um die gelaufen Wert x
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMPING);
                } else {
                    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                        this.playAnimation(this.IMAGES_WALKING);
                    }
                }
            }

        }, 40);
    }
}