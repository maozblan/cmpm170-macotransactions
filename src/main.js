
let config = {
  type: Phaser.AUTO,
  pixelPerfect: true,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [ Game ],
}
let game = new Phaser.Game(config)
