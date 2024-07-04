class Level {
    enemies;
    clouds;
    backgroundObject;
    throwableObjects;

    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObject, throwableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.throwableObjects = throwableObjects;
    }
}