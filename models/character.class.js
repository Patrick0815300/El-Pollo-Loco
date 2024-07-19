class Character extends MovableObject {
    world;
    height = 250;
    width = 150;
    y = 180;
    speed = 6;
    offset = {
        top: 100,
        left: 20,
        right: 15,
        bottom: 10
    }
    bottles = 10;
    coins = 1;

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

    imageArray = [
        this.IMAGES_WALKING,
        this.IMAGES_JUMPING,
        this.IMAGES_DEAD,
        this.IMAGES_HURT,
        this.IMAGES_IDLE,
        this.IMAGES_LONG_IDLE
    ];

    walking_sound = new Audio('../audio/step.mp3');
    jump_sound = new Audio('../audio/jump.mp3');
    throw_sound = new Audio('../audio/throw.mp3');
    collect_coin_sound = new Audio('../audio/collectCoin.mp3');
    hurt_sound = new Audio('../audio/hurtCharatcter.mp3');
    collect_bottle_sound = new Audio('../audio/collectBottle.mp3');
    hit_endboss_sound = new Audio('../audio/hitEndboss.mp3');
    snoring_sound = new Audio('../audio/snoring.mp3');
    hit_chicken_sound = new Audio('../audio/hit-chicken.mp3');
    audio_sounds =[this.walking_sound, this.jump_sound,this.throw_sound, this.collect_coin_sound, this.hurt_sound,this.collect_bottle_sound, this.hit_endboss_sound, this.snoring_sound];

    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png',);
        this.imageArray.forEach(images => this.loadImages(images));
        this.applyGravity();
        this.lastActionTime = Date.now(); // save the date since the last action
        this.inactivityInterval = 10000; // 10 sec no activity
        this.currentAnimation = null;
        this.animate();
    }

    /**
     * function to animate the character
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacterAnimation(), 40);
    }

    /**
     * function to move the character right, left or jump
     */
    moveCharacter() {
        if (this.canMoveRight()) 
            this.moveRight();
         if (this.canMoveLeft()) 
            this.moveLeft();
         if (this.canJump()) 
            this.jump();
        this.world.camera_x = -this.x + 100; // move the world by the walking value x
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < level1.level_end_x;
    }

    moveRight(){
        super.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();  
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
    }

    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    jump() {
        super.jump();
        this.jump_sound.play();
    }

    /**
     * function to animate the character movements
     */
    playCharacterAnimation() {
        if (this.isDead()) this.deadAnimation();
         else if (this.isHurt()) this.hurtAnimation();
         else if (this.isAboveGround()) this.jumpAnimation();
         else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) this.walkingAnimation();
            else {
                let currentTime = Date.now();
                if (currentTime - this.lastActionTime > this.inactivityInterval) this.longIdelAnimation();
                else this.playAnimation(this.IMAGES_IDLE);
            }
    }
    
    deadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.lastActionTime = Date.now();
    }

    hurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
            this.hurt_sound.play();
            this.lastActionTime = Date.now();
    }

    jumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.lastActionTime = Date.now(); // Aktion registrieren
    }

    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.lastActionTime = Date.now(); // Aktion registrieren
    }

    longIdelAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        this.snoring_sound.play();
    }

    /**
     * function to decrease the collected object 
     * @param {object} item - coin or bottle 
     */
    decreaseObject(item) {
        this[item] -= 1;
    }

    /**
     * function to collect and increase the coins or bottles
     * @param {object} item - coin or bottle
     */
    collectObject(item) {
        if (this[item] < 10) {
            this[item] += 1;
        } 
    }
}