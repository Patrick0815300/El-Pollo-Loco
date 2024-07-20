class Level {
    enemies;
    clouds;
    backgroundObject;
    collectableObjects;
    level_end_x = 2200;
    character;

    constructor(enemies, clouds, backgroundObject, collectableObjects, character) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.collectableObjects = collectableObjects;
        this.character = character;
    }
}