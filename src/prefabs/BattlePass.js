//import eventsCenter from "./EventCenter"
class BattlePass{
    constructor(scene, x, y, scale=1, num_options) {
        //handle default args
        this.scene = scene
        this.x = x
        this.y = y
  
        //make attributes
        this.width = 450
        this.height = 750

        //this is a stand in variable until we can pass
        //an array of the companies to the object
        this.num = num_options

        //build visual elements
        var bk1 = scene.add.rectangle(x, y, this.width, this.height, 0x808080) 
        bk1.setScrollFactor(0); 

        this.dataText = scene.add.text(x - 115, this.height / 2 + 10, "Battle Pass", {
            fontSize: 24 
        }).setOrigin(0.5)
        this.dataText.setScrollFactor(0); 
        
        this.b1 = new Button(scene, (() => {this.buy(35, 30)}), this, `Option 1: 35% - $30`, x - 115, this.height / 2 + 65, 0) //110
        this.b2 = new Button(scene, (() => {this.buy(25, 27)}), this, `Option 1: 25% - $27`, x - 115, this.height / 2 + 120, 0) //180
        this.b3 = new Button(scene, (() => {this.buy(15, 20)}), this, `Option 1: 15% - $20`, x - 115, this.height / 2 + 175, 0) //250
        this.b4 = new Button(scene, (() => {this.buy(10, 15)}), this, `Option 1: 10% - $15`, x - 115, this.height / 2 + 230, 0) //320
    }

    buy(percent, cost) {
        this.scene.sound.play('sad');
        
        //this.scene.trombone.play(); 
        this.scene.wheel.bp(percent); 
        console.log(`bought ${percent}% better odds for ${cost} USD`)
        notify("CREDIT CARD NOTIFICATION", `${cost} USD has just been charged to your account.`);
        charge("charge from battle pass, macrotransactions.app", -1*cost);
    }

    // deviltween(percent){
    //     console.log('huhhhh')
    //     //console.log(devil.x)
    //     this.scene.wheel.workpls(percent); 
    // }
}