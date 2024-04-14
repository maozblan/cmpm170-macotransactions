class PersonalInfo {
    constructor(scene, x, y, scale=1, cashOnHand) {
        //handle default args
        this.scene = scene
        this.x = x
        this.y = y

        //make attributes
        this.width = 450
        this.height = 750
        this.cashOnHand = cashOnHand

        //build visual elements
        scene.add.rectangle(x, y, this.width, this.height, 0x808080);
        
        //small ticker box
        scene.add.rectangle(this.width / 4, this.height / 8, this.width / 2 - 40, this.height / 4 - 40,  0xFFFFFF).setOrigin(.5)

        //cash and amount text objects
        this.dataText = scene.add.text(this.width / 4 - 35, this.height / 4 + 20, "CASH:", {
            fontSize: 24 
        }).setOrigin(0.5)

        this.cashText = scene.add.text(this.width / 4 + 30, this.height / 4 + 20, this.cashOnHand, {
            fontSize: 24 
        }).setOrigin(0.5)

        //economy data elements
        this.econText = scene.add.text(this.width / 4 - 35, this.height / 4 + 60, "Economy:", {
            fontSize: 24 
        }).setOrigin(0.5)

        this.econData = scene.add.text(this.width / 4 + 55, this.height / 4 + 60, "BEAR", {
            fontSize: 24 
        }).setOrigin(0.5)

        //buttons to buy and sell our own stock
        this.buyButton = new Button(scene, this.buy, this, "BUY", this.width / 4 - 45, this.height / 3 + 60)
        this.sellButton = new Button(scene, this.sell, this, "SELL", this.width / 4 + 25, this.height / 3 + 60)

    }

    update() {
        
    }

    sell() {
        //sell call back

        //debug
        console.log("sold")

        //add arbitrary amount to cash
        this.cashOnHand += 100
        
        //update text
        this.cashText.text = this.cashOnHand
    }
    buy() {
        //buy call back

        //debug
        console.log("bought")

        //subtract from cash
        this.cashOnHand -= 100

        //update text
        this.cashText.text = this.cashOnHand
    }
}