class Game extends Phaser.Scene {
  constructor() {
    super("gameScene");
  }

  create() {
    this.add.text(0, 0, 'lyssa was here');
    const ai = new CompanyAI(this, 'sample comp.');
    ai.initilizeComp([]);
    this.ticker = new StockTicker(this, ai, game.config.width/2, game.config.height/2);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER))) {
      this.ticker.update();
    }
  }
}