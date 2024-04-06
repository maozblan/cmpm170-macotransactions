
let config = {
  type: Phaser.AUTO,
  width: 640, 
  height: 360,
  // pixelPerfect: true,
  pixelArt: true,
  zoom: 1.5,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 1000 },
          // debug: true,
      }
  },
  scene: [ Menu, Game ]
}
let game = new Phaser.Game(config)

// keybinds
let keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyM, keyENTER