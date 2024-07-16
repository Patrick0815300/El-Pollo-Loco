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

    IMAGES_IDLE = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png',


    ];


    world;
    walking_sound = new Audio('../audio/step.mp3');
    jump_sound = new Audio('../audio/jump.mp3');
    throw_sound = new Audio('../audio/throw.mp3');
    collect_coin_sound = new Audio('../audio/collectCoin.mp3');
    hurt_sound = new Audio('../audio/hurtCharatcter.mp3');
    collect_bottle_sound = new Audio('../audio/collectBottle.mp3');
    hit_endboss_sound = new Audio('../audio/hitEndboss.mp3');

    audio_sounds =[this.walking_sound, this.jump_sound,this.throw_sound, this.collect_coin_sound, this.hurt_sound,this.collect_bottle_sound, this.hit_endboss_sound];
    
    bottles = 10;
    coins = 1;

    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png',);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();

        this.lastActionTime = Date.now(); // Zeitpunkt der letzten Aktion speichern
        this.inactivityInterval = 10000; // 10 Sekunden Inaktivität
        this.currentAnimation = null;
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < level1.level_end_x) { // kann nur bis zu level_end_x Koordinate laufen
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play(); // spielt den Sound ab für das Laufen
            }

            if (this.world.keyboard.LEFT && this.x > 0) { // Character kann nicht nach links aus dem Bild herrauslaufen mit > 0
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) { // Wenn der die Taste Space und der Charakter nicht auf dem Boden steht
                this.jump();
                this.jump_sound.play();
            }

            this.world.camera_x = -this.x + 100; // Verschieben der Welt um die gelaufen Wert x
        }, 1000 / 60);


        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.lastActionTime = Date.now(); // Aktion registrieren
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.hurt_sound.play();
                this.lastActionTime = Date.now(); // Aktion registrieren
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.lastActionTime = Date.now(); // Aktion registrieren
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.lastActionTime = Date.now(); // Aktion registrieren
                } else {
                    let currentTime = Date.now();
                    if (currentTime - this.lastActionTime > this.inactivityInterval) {
                        this.playAnimation(this.IMAGES_LONG_IDLE);
                    } else {
                        this.playAnimation(this.IMAGES_IDLE);
                    }
                }
            }
        }, 40);
    }

    decreaseObject(item) {
        this[item] -= 1;
        console.log(this[item] + ' ' + item + ' sind vorhanden')
    }

    collectObject(item) {
        if (this[item] < 10) {
            this[item] += 1;
        } 
        console.log(this[item] + ' ' + item + ' sind vorhanden')
    }
}