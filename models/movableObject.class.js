class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    offsetY = 2;
        
    

    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; Modulo ist der mathematische Rest -> 
        // i = 0, 1, 2, 3, 4, 5, 6, 0, 1, 2, ...
        let path = images[i];
        this.img = this.imageCache[path]; // Laden eines Img auf dem Cache
        this.currentImage++;   
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { // Throwable objects should always fall
            return true;
        } else {
            return this.y < 180;
        }
    }


    jump() {
        this.speedY = 30;
    }


    isColliding (mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + this.width + mo.offset.right &&
                this.y + this.offset.top < mo.y + this.height + mo.offset.bottom;
    }
    

    hit() {
        this.energy -= 0.5; 
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // Speichern der Zeit in Millisekunden seit dem 01.01.1970
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; // Speichern in Sekunden und nicht Millisekunden
        return timepassed < 0.8; // Zeit wie lange die Animation hurt angezeigt werden soll nach dem hit
    }

    isDead() {
        return this.energy == 0;
    }
}