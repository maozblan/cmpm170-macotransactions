// aligned at center, locked 3:4 aspect ratio
class PlayerStockTicker {
    constructor(scene, companyAIObj, x, y, scale=1) {
      this.ticker = new StockGraph(scene, companyAIObj, x, y-(25*scale), scale);
      this.ticker.setScrollFactor(0);
      //this.dataBar = new StockData(scene, this, x, y+(125*scale), scale);
      scene.add.text(x-190*scale, y-140*scale, companyAIObj.name).setScrollFactor(0); // company name
  
      this.companyAIObj = companyAIObj;
  
      this.playerObj
      
      for(const c of companyAIObj.compArray){
        if(c instanceof Player) {
          this.playerObj = c
        }
      }
    }
  
    update() {
      this.ticker.update();
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