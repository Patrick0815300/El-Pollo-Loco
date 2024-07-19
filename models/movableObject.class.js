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
        
    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; 
        let path = images[i];
        this.img = this.imageCache[path];
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

    /**
     * function to jump and increase the speed of the Y
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * function to check if object colliding
     * @param {object} mo - all objects
     * @returns - true by collision
     */
    isColliding (mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left && 
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
                this.x + this.offset.left < mo.x + mo.width + mo.offset.right &&
                this.y + this.offset.top < mo.y + mo.height + mo.offset.bottom;
    }
    
    /**
     * function to reduce the characters energy and set the lastHit
     */
    hit() {
        this.energy -= 0.5; 
        if (this.energy < 0) this.energy = 0;
        else this.lastHit = new Date().getTime();
    }

    /**
     * function to get the last hit
     * @returns - the time how long the animation is after hurt
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; 
        return timepassed < 0.8;
    }

    isDead() {
        return this.energy == 0;
    }
}