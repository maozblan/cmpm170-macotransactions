class Button {
  constructor(scene, callbackFx, callbackScope, text, x, y, sf, font='courier new', fontSize='50') {
    // variables
    this.sf = sf; //scrollfactor 
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
      .setScrollFactor(sf)
      .on('pointerdown', () => {
        if (callbackScope) {
          callbackFx.bind(callbackScope)();
        } else {
          callbackFx();
        }
      })
      .on('pointerover', () => this.button.setStyle({ fill: '#f39c12' }))
      .on('pointerout', () => this.button.setStyle({ fill: '#FFF' }));  
  }
}