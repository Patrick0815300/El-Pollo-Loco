class SmallChicken extends MovableObject {
    height = 60;
    width = 60;
    y = 360;
    hitFromAbove;

    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 600 + Math.random() * 2200;
        this.speed = 0.15 + Math.random() * 0.65;
        this.hitFromAbove = false;
        this.animate();
        this.offset;      
    }

    /**
     * function to animate the small chicken
     * let them move to the left side
     */
    animate() {
        this.moveLeftInterval = setInterval(() => {
            if (!this.hitFromAbove) this.moveLeft();
        }, 1000 / 60);
    
        this.animationInterval = setInterval(() => {
            if (!this.hitFromAbove) this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }
}