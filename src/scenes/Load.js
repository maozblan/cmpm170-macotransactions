class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = 'assets/img/'
        this.load.image('wheel', 'wheel.png'); 
        this.load.image('triangle', 'triangle.png'); 
        this.load.image('devil', 'demon.png'); 
        this.load.image('helperdemon', 'evil_demon.png'); 
        this.load.image('door', 'door.png'); 
        this.load.image('pet', 'pet.png'); 

        this.load.path = 'assests/sfx/'
        this.load.audio('money', 'money.mp3'); //cash register sound 
        this.load.audio('down', 'down.mp3'); //wahhhhh sound 
        this.load.audio('sad', 'sad.mp3'); //wah wah wahh sound 
    } 
} 