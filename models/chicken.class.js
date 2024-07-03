class Chicken extends MovableObject {
    height = 80;
    width = 80;
    y = 350;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);


        this.x = 200 + Math.random() * 500;
        this.moveLeft();
        this.speed = 0.15 + Math.random() * 0.6; // Zufällige zahl zwischen 0.15 und 0.25
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; Modulo ist der mathematische Rest -> 
            // i = 0, 1, 2, 3, 4, 5, 6, 0, 1, 2, ...
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;   
        }, 100);
    }
}