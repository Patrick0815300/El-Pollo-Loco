class Statusbars extends DrawableObject{
    IMAGES_STATUS_HEALTH = [
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png', // 0
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png', 
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', // 5
    ];
    IMAGES_STATUS_COIN = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png', // 0
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png', // 5
    ];
    IMAGES_STATUS_BOTTLE = [
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png', // 0
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png', // 5
    ];
    IMAGES_STATUS_ENDBOSS = [
        '../img/7_statusbars/2_statusbar_endboss/green/green100.png', // 0
        '../img/7_statusbars/2_statusbar_endboss/green/green80.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green60.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green40.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green20.png',
        '../img/7_statusbars/2_statusbar_endboss/green/green0.png', // 5
    ];


    height = 50;
    width = 250;
    y = 0;
    x = 30;
    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_HEALTH);
        this.setPercentage(100); // setzt am anfang die 100% health da sonst kein Wert zum abrufen ist
     }


    // setPercentage(50)
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_HEALTH[this.resolveImageIndex()];  
        this.img = this.imageCache[path]; // Laden eines Img auf dem Cache
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 0;
        } else if (this.percentage > 80) {
            return 1;
        } else if (this.percentage > 60) {
            return 2;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 4;
        } else {
            return 5;
        }
    }
}