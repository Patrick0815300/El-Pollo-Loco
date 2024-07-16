class Chicken extends MovableObject {
    height = 80;
    width = 80;
    y = 350;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    hitFromAbove;

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 600 + Math.random() * 2200;
        
        this.speed = 0.15 + Math.random() * 0.65; // Zufällige zahl zwischen 0.15 und 0.65
        this.animate();
    }

    animate() {
        this.moveLeftInterval = setInterval(() => {
            if (!this.hitFromAbove) {
                this.moveLeft();
            }
        }, 1000 / 60);
    
        this.animationInterval = setInterval(() => {
            if (!this.hitFromAbove) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
}