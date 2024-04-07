//local variables 
//create main function of 

let config = {
  type: Phaser.AUTO,
  pixelPerfect: true,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [ Menu, Game ],
}
let game = new Phaser.Game(config)

//default height and width: 1024, 768
