class StatusbarBottle extends Statusbars {
    y= 40
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_BOTTLE);
        this.setPercentage(100); // set the 100 for having a value
     }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_BOTTLE[this.resolveImageIndex()];  
        this.img = this.imageCache[path];
    }
}