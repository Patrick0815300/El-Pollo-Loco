class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isAnimationRunning = false;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    prevY = 0;
    prevSpeedY = 0;
    collidingAbove;
        
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

    playSingleRunAnimation(images, interval) {
        if (this.isAnimationRunning) return; // Prevent multiple invocations

        this.isAnimationRunning = true; // Set the flag to true to indicate the animation is running
        this.currentImage = 0; // Reset the image index for a new run
        this.intervalId = setInterval(() => {
            if (this.currentImage < images.length) {
                let path = images[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                this.stopAnimation();
            }
        }, interval);
    }

    stopAnimation() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isAnimationRunning = false; // Reset the flag to allow future animations
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.prevY = this.y
                this.prevSpeedY = this.speedY
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

    isSpeedYDecreasing() {
        if (this.y > this.prevY) return true;
        else return false;
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