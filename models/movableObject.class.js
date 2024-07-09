class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
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


    isColliding (obj) {
        return  (this.x + this.width) >= obj.x + 90 && this.x <= (obj.x + obj.width) && 
                (this.y + this.offsetY + this.height) >= obj.y &&
                (this.y + this.offsetY) <= (obj.y + obj.height);
                // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    hit() {
        this.energy -= 5;
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