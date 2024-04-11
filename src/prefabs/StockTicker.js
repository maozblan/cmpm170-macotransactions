// aligned at center
class StockTicker {
  constructor(scene, companyAIObj, x, y, scale=1) {
    this.ticker = new StockGraph(scene, this, x, y-(25*scale), scale);
    this.dataBar = new StockData(scene, this, x, y+(125*scale), scale);
    this.stock = new Stock(scene, x+(170*scale), y-(25*scale), scale);
    scene.add.text(x-190*scale, y-140*scale, companyAIObj.name); // company name

    this.companyAIObj = companyAIObj;

  }

  update() {
    this.stock.update(this.companyAIObj.rate);
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
  
  update() {
    
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

class Stock {
  constructor(scene, x, centerY, scale) {
    this.centerY = centerY;
    this.top = centerY - 115;
    this.bot = centerY + 115;
    this.currentY = centerY;
    this.particles = scene.add.particles(x, this.currentY, 'particle', {
      lifespan: 1830*scale,
      speedX: -200,
      maxVelocityY: 0,
    });
  }

  update(rate) {
    this.particles.y = ((this.bot - this.top) * ((rate-100)/100) + this.top);
  }
}
