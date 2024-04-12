class Assets {
    constructor(scene, x, y, scale=1, num_companies) {
        //handle default args
        this.scene = scene
        this.x = x
        this.y = y

        //make attributes
        this.width = 450
        this.height = 750

        //this is a stand in variable until we can pass
        //an array of the companies to the object
        this.num = num_companies

        //build visual elements
        scene.add.rectangle(x, y, this.width, this.height, 0x808080);
        
        let i = 1
        while(i <= this.num){
            //text objects for each company
            this.dataText = scene.add.text(this.width / 4 - 40, (y / 2) + (55 * i), `Company${i}:`, {
                fontSize: 20 
            }).setOrigin(0.5)

            this.dataText = scene.add.text(this.width / 4 + 55, (y / 2) + (55 * i), `example`, {
                fontSize: 20
            }).setOrigin(0.5)
            i++
        }


    }

    update() {
        //this will have to be written once we have integrated all the systems
        //it will update the stock values with each pass
    }
}