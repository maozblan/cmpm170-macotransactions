//local variables 
//create main function of 


let config = {
  type: Phaser.AUTO,
  height: 750,
  width: 1024,
  pixelPerfect: true,
  pixelArt: true,
  // scale: {
  //   mode: Phaser.Scale.FIT,
  //   autoCenter: Phaser.Scale.CENTER_BOTH,
  // },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  scene: [ Menu, Game, Load ],
}
let game = new Phaser.Game(config)

//default height and width: 1024, 768
