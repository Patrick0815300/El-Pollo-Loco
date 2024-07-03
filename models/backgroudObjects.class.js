class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    y = 0;

    constructor(imgPath, x) {
        super();
        this.loadImage(imgPath)
        this.x = x;
    }
}