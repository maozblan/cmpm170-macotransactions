// aligned at center, locked 3:4 aspect ratio
class StockTicker {
  constructor(scene, companyAIObj, x, y, scale=1) {
    this.ticker = new StockGraph(scene, companyAIObj, x, y-(25*scale), scale);
    this.dataBar = new StockData(scene, this, x, y+(125*scale), scale);
    scene.add.text(x-190*scale, y-140*scale, companyAIObj.name); // company name

    this.companyAIObj = companyAIObj;

    this.playerObj
    
    for(const c of companyAIObj.compArray){
      if(c instanceof Player) {
        this.playerObj = c
      }
    }
    console.log(this.playerObj)
  }

  update() {
    this.ticker.update();
    this.dataBar.update();
  }

  sell() { // TODO link to company AI objs that correspond
    console.log('sold');
    this.playerObj.sell(this.companyAIObj)
  }
  
  buy() { // TODO link to company AI objs that correspond
    console.log('bought');
    this.playerObj.buy(this.companyAIObj)
  }
}

// the up down graphic of the stocks
class StockGraph {
  constructor(scene, companyAIObj, x, y, scale) {
    this.width = 400 * scale;
    this.height = 250 * scale;
    scene.add.rectangle(x, y, this.width, this.height, 0xAAAAAA).setOrigin(0.5);
    this.companyAIObj = companyAIObj;

    // the group of bars that tick up and down
    this.stockGroup = new StockGroup(scene, x-(195*scale), y+(10*scale), 220*scale, scale);

    // logged rate of stock price in percents (min 0, max 200)
    this.history = [];
    for (let i = 0; i < this.stockGroup.maxBars+1; ++i) { // preload data
      this.history.push(0.5);
    }
  }
  
  update() {
    // shifted down 50/200 because hardcoded stocks to min at 100
    this.history.push((this.companyAIObj.rate-50)/200); //make percentage and lower by a bit
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
    new Button(scene, stockTicker.sell, stockTicker, 'SELL', x + this.width/2 - 90*scale, y, 1); //moves with the scrolling feature 
    new Button(scene, stockTicker.buy, stockTicker, 'BUY', x + this.width/2 - 30*scale, y, 1); //moves with the scrolling feature 

    this.stockTicker = stockTicker;
  }

  update() {
    this.dataText.text = `Current Trade Rate: ${this.stockTicker.companyAIObj.rate}`;
  }
}

// group of stock objects
class StockGroup {
  constructor(scene, startingX, centerY, height, scale) {
    this.top = centerY - height/2*scale;
    this.bot = centerY + height/2*scale;
    this.height = height;
    this.history = [0];

    this.barWidth = 16*scale;
    this.barSpace = 1*scale;
    this.maxBars = 23;

    // list of stock objects
    // createMultiple wasn't working so this is the object group ;(
    this.stocks = [];
    for (let i = 0; i < this.maxBars; ++i) {
      this.stocks.push(
        new Stock(scene, startingX+this.barWidth/2+(i*(this.barWidth+this.barSpace)), centerY, this.barWidth),
      );
    }
  }

  update(data) {
    // map percentages to actual X values on screen
    data = data.map((percent) => {
      return this.bot - (this.height*percent);
    });
    for (let i = 0; i < data.length-1; ++i) {
      this.stocks[i].change(data[i], data[i+1]);
    }
  }
}

// green, red, OR grey rectangles indicateding stock change
class Stock {
  constructor(scene, x, y, width) {
    // make a rectangle
    this.self = scene.add.rectangle(x, y-1, width, 2, 0x888888).setOrigin(0.5, 0); // rectangle 
  }

  change(start, end) {
    if (start > end) { // stock rise
      this.self.fillColor = 0x63B75B;
      this.self.height = start-end;
      this.self.y = end;
    } else if (start < end) { // stock fall
      this.self.fillColor = 0xD35050;
      this.self.height = end-start;
      this.self.y = start;
    } else { // static stock
      this.self.fillColor = 0x888888;
      this.self.height = 2;
      this.self.y = start-1;
    }
  }
}
