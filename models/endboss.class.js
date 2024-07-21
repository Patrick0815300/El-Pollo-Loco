class Endboss extends MovableObject {
    character;
    height = 400;
    width = 300;
    y = 50;
    energy;
    lastHit = 0;
    offset = {
        top: 50,
        bottom: 100,
        left: 90,
        right: 0
    };

    IMAGES_ALERT = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png', 
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png', 
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    imageArray = [
        this.IMAGES_ALERT,
        this.IMAGES_ATTACK,
        this.IMAGES_DEAD,
        this.IMAGES_HURT,
        this.IMAGES_DEAD
    ];

    constructor() {
        super();
        super.loadImage(this.IMAGES_ALERT[0]);
        this.imageArray.forEach(images => this.loadImages(images));
        this.energy = 100;
        this.x = 2000;
        this.animate();
    }

    setCharacter(character) {
        this.character = character;
    }

    animate() {
        setInterval(() => this.playAnimation(this.IMAGES_ALERT), 600);
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.y += 50;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.characterIsComing()) {
                this.playAnimation(this.IMAGES_ATTACK)
                this.x -= 30;
            };
        }, 200);
    }

    /**
     * function to decrease the energy of the endboss
     * set the time of the last hit
     */
    decreaseEnergy() {
        this.energy -= 20;
        if (this.energy < 0) this.energy = 0;
         else this.lastHit = new Date().getTime();
    }

    /**
     * function to play the attack animation
     * @returns - true or false
     */
    characterIsComing() {
        return Math.abs((this.character.x + this.character.width) - this.x ) < 250;
    }
}