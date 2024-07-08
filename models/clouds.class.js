class Cloud extends MovableObject {
    width = 500;
    height = 250;
    y = 0

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        this.x = -50 + Math.random() * 2200;
        this.moveLeft();
    }
}