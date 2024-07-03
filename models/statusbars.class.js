class Statusbars extends MovableObject{
    IMAGES_STATUS_HEALTH = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    ];
    IMAGES_STATUS_COIN = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
    ];
    IMAGES_STATUS_BOTTLE = [
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    ];

    height = 50;
    width = 250;
    y = 0;
    x = 30;

    constructor() {
        super().loadImage(this.IMAGES_STATUS_HEALTH[0])
    }
}