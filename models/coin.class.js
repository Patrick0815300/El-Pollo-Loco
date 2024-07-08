class Coin extends DrawableObject {
    IMAGE_COIN = ['../img/8_coin/coin_1.png',];

    height = 150;
    width = 150;
    y = 320;

    constructor() {
        super();
        this.loadImage(this.IMAGE_COIN);
        this.x = 300 + Math.random() * 2200;
    }
}