// aligned at center
class StockTicker {
  constructor(scene, companyAIObj, x, y, scale=1) {
    this.ticker = new StockGraph(scene, this, x, y-(25*scale), scale);
    this.dataBar = new StockData(scene, this, x, y+(125*scale), scale);
  }

  update() {
  }

  sell() {
    console.log('sold');
  }
  
  buy() {
    console.log('bought');
  }
}

// the up down graphic of the stocks
class StockGraph {
  constructor(scene, stockTicker, x, y, scale) {
    this.width = 400 * scale;
    this.height = 250 * scale;
    scene.add.rectangle(x, y, this.width, this.height, 0xAAAAAA).setOrigin(0.5);
  }
}

// the bar of data on the bottom
class StockData {
  constructor(scene, stockTicker, x, y, scale) {
    this.width = 400 * scale;
    this.height = 50 * scale;
    scene.add.rectangle(x, y, this.width, this.height, 0x777777).setOrigin(0.5);

    // text data
    this.dataText = scene.add.text(x - this.width/2 + 10*scale, y, 'conversions bad')
      .setOrigin(0, 0.5);

    // buttons
    new Button(scene, stockTicker.sell, stockTicker, 'SELL', x + this.width/2 - 90*scale, y);
    new Button(scene, stockTicker.buy, stockTicker, 'BUY', x + this.width/2 - 30*scale, y);
  }
}
