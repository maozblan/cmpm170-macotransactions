class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = '../../assets/img/'
        this.load.image('wheel', 'wheel.png'); 
        this.load.image('triangle', 'triangle.png'); 
    } 
} 