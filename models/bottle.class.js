class Bottle extends DrawableObject {
    height = 100;
    width = 90;
    y = 330;
    offset = {
        top: 10,
        left: 30,
        right: 30,
        bottom: 5
    }

    IMAGE_BOTTLE = ['../img/6_salsa_bottle/salsa_bottle.png',];

    constructor() {
        super();
        this.loadImage(this.IMAGE_BOTTLE);
        this.x = 300 + Math.random() * 2200;
    }
}