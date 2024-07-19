class DrawableObject {
    img;
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    loadImage(path) {
    this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    /**
    * @param {Array} arr - ['img/image1.png','img/image2.png', ...]
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * function to draw a frame above the object 
     * to check the collision
     * @param {object} ctx - chosen object
     */
    drawFrame(ctx) {
        if (this instanceof Endboss || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + (this.offset?.left || 0),       // Adjust x position with left offset
                this.y + (this.offset?.top || 0),        // Adjust y position with top offset
                this.width - ((this.offset?.left || 0) + (this.offset?.right || 0)), // Adjust width with left and right offsets
                this.height - ((this.offset?.top || 0) + (this.offset?.bottom || 0)) // Adjust height with top and bottom offsets
            );
            ctx.stroke();
        }
    }
}