class ThrowableObject extends MovableObject {
    IMAGES_SALSABOTTLE_ROTATE = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    ];
    
    height = 90;
    width = 80;
    

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_SALSABOTTLE_ROTATE[0])
        this.loadImages(this.IMAGES_SALSABOTTLE_ROTATE);
        this.animate();
        this.throw(x, y); 
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SALSABOTTLE_ROTATE)
        }, 150);

        
    }


    throw(x, y) { 
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10; 
        }, 25);
    }
}