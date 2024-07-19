class StatusbarCoin extends Statusbars {    
    y= 80
    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_COIN);
        this.setPercentage(0);
     }

     setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_COIN[this.resolveImageIndex()];  
        this.img = this.imageCache[path];
    }
}