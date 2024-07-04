class StatusbarCoin extends Statusbars {
    y= 80
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_STATUS_COIN);
        this.setPercentage(100); // setzt am anfang die 100% health da sonst kein Wert zum abrufen ist
     }

     setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_COIN[this.resolveImageIndex()];  
        this.img = this.imageCache[path]; // Laden eines Img auf dem Cache
    }
}