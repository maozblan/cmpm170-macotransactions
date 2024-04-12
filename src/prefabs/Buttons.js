class Button {
    constructor(scene, callbackFx, callbackScope, text, x, y, font='courier new', fontSize='50') {
      // variables
      this.scene = scene;
      this.callbackFx = callbackFx;
      this.callbackScope = callbackScope;
  
      // referencing https://webtips.dev/webtips/phaser/interactive-buttons-in-phaser3
      // this.button = scene.add.bitmapText(x, y, font, text, `${fontSize}`).setOrigin(0.5);
      this.button = scene.add.text(x, y, text)
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ backgroundColor: '#FACADE' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {callbackFx.bind(callbackScope)()})
        .on('pointerover', () => this.button.setStyle({ fill: '#f39c12' }))
        .on('pointerout', () => this.button.setStyle({ fill: '#FFF' }));
    }
  }