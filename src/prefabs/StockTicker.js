// aligned at center
class StockTicker {
  constructor(scene, companyAIObj, x, y, scale=1) {
    this.ticker = new StockGraph(scene, this, x, y-(25*scale), scale);
    this.dataBar = new StockData(scene, this, x, y+(125*scale), scale);
    scene.add.text(x-190*scale, y-140*scale, companyAIObj.name); // company name

    this.companyAIObj = companyAIObj;
  }

  update() {
    this.ticker.update();
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
    this.stockGroup = new StockGroup(scene, x-(195*scale), y, 240, scale);
    this.stockTicker = stockTicker;

    this.history = [];
    for (let i = 0; i < 11; ++i) { // preload data
      this.history.push(0.5);
    }
  }
  
  update() {
    console.log(this.history);
    this.history.push((this.stockTicker.companyAIObj.rate-100)/100); //make percentage
    this.history.shift();
    this.stockGroup.update(this.history);
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

class StockGroup {
  constructor(scene, startingX, centerY, height, scale) {
    this.top = centerY - height/2*scale;
    this.bot = centerY + height/2*scale;
    this.height = height;
    this.history = [0];

    this.barWidth = 30;
    this.barSpace = 10;

    this.stocks = [];
    for (let i = 0; i < 10; ++i) {
      this.stocks.push(
        new Stock(scene, startingX+this.barWidth/2+(i*(this.barWidth+this.barSpace)), this.top, this.barWidth),
      );
    }
  }

  update(data) {
    for (let i = 0; i < data.length-1; ++i) {
      this.stocks[i].change(this.height*data[i]+this.top, this.height*data[i+1]+this.top);
    }
  }
}

class Stock {
  constructor(scene, x, y, width) {
    // make a rectangle
    this.self = scene.add.rectangle(x, y, width, 100, 0x63B75B).setOrigin(0.5, 0); // rectangle
  }

  change(start, end) {
    if (start > end) { // stock rise
      this.self.fillColor = 0x63B75B;
      this.self.height = start-end;
      this.self.y = end;
    } else { // stock fall
      this.self.fillColor = 0xD35050;
      this.self.height = end-start;
      this.self.y = start;
    }
  }
}
