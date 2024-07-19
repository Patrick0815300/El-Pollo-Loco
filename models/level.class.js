class Level {
    enemies;
    clouds;
    backgroundObject;
    collectableObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObject, collectableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.collectableObjects = collectableObjects;
    }
}