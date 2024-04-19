class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = '/assets/sfx/'
        this.load.audio('sad', 'sad.mp3'); 
    } 
} 