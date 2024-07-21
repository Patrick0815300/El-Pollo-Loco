class StatusbarEndboss extends Statusbars {
    percentage = 100;
    y = 30;
    width = 200;
    height = 40;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_ENDBOSS);
        this.setPercentage(100);
        this.x = 2000;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_ENDBOSS[this.resolveImageIndex()];  
        this.img = this.imageCache[path];
    }
}