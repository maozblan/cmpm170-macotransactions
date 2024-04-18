class PersonalInfo {
    constructor(scene, x, y, scale=1, playerObj) {
        //handle default args
        this.scene = scene
        this.x = x
        this.y = y

        //make attributes
        this.width = 450
        this.height = 750
        this.cashOnHand = playerObj.money
        this.playerObj = playerObj

        //build visual elements
        scene.add.rectangle(x, y, this.width, this.height, 0x808080).setScrollFactor(0); 
        
        //small ticker box
        scene.add.rectangle(this.width / 4, this.height / 8, this.width / 2 - 40, this.height / 4 - 40,  0xFFFFFF).setOrigin(.5).setScrollFactor(0);  

        //cash and amount text objects
        this.cashData = scene.add.text(this.width / 4 - 55, this.height / 4 + 20, "CASH:", {
            fontSize: 24 
        }).setOrigin(0.5)

        this.cashText = scene.add.text(this.width / 4 + 40, this.height / 4 + 20, this.cashOnHand, {
            fontSize: 24 
        }).setOrigin(0.5)

        //cash and amount text objects
        this.rateData = scene.add.text(this.width / 4 - 65, this.height / 4 + 60, "RATE:", {
            fontSize: 24 
        }).setOrigin(0.5).setScrollFactor(0); 

        this.rateText = scene.add.text(this.width / 4 + 40, this.height / 4 + 60, `${this.playerObj.rate}/stock`, {
            fontSize: 24 
        }).setOrigin(0.5).setScrollFactor(0); 

        //economy data elements
        this.econText = scene.add.text(this.width / 4 - 35, this.height / 4 + 100, "Economy:", {
            fontSize: 24 
        }).setOrigin(0.5).setScrollFactor(0); 

        this.econData = scene.add.text(this.width / 4 + 55, this.height / 4 + 100, "BULL", {
            fontSize: 24 
        }).setOrigin(0.5).setScrollFactor(0); 

        //buttons to buy and sell our own stock
        this.buyButton = new Button(scene, this.buy, this, "BUY", this.width / 4 - 45, this.height / 3 + 60, 0)
        this.sellButton = new Button(scene, this.sell, this, "SELL", this.width / 4 + 25, this.height / 3 + 60, 0)

    }

    update() {
        this.cashText.text = this.playerObj.money
        this.rateText.text = `${this.playerObj.rate}/stock`
    }

    sell() {
        //sell call back

        //debug
        console.log("sold")

        this.playerObj.sell(this.playerObj, 100)
    }
    buy() {
        //buy call back
        this.playerObj.buy(this.playerObj, 100)

        //debug
        console.log("bought")
    }
}