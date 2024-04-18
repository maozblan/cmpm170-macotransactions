class Assets {
    constructor(scene, x, y, scale=1, companyDict) {
        //handle default args
        this.scene = scene
        this.x = x
        this.y = y

        //make attributes
        this.width = 450
        this.height = 750
        this.compDict = companyDict

        //this is a stand in variable until we can pass
        //an array of the companies to the object

        //build visual elements
        scene.add.rectangle(x, y, this.width, this.height, 0x808080);

        this.textArray = []
        
        let i = 0
        for(const c of companyDict.entries()) {
            //text objects for each company
            this.dataText = scene.add.text(this.width / 4 - 40, (3*y / 5) + (55 * i), `${c[0]}:`, {
                fontSize: 20 
            }).setOrigin(0.5)

            this.dataText = scene.add.text(this.width / 4 + 55, (3*y / 5) + (55 * i), `0`, {
                fontSize: 20
            }).setOrigin(0.5)

            this.textArray[i] = this.dataText

            i++
        }

        // this.remainingStockText = scene.add.text(this.width / 4 - 60, (3*y / 5) + (55 * i), `Player Stock Left:`, {
        //     fontSize: 18
        // }).setOrigin(0.5)

        // this.remainingStockData = scene.add.text(this.width / 4 + 55, (3*y / 5) + (55 * i), `${this.}`, {
        //     fontSize: 20
        // }).setOrigin(0.5)


    }

    update() {
        //this will have to be written once we have integrated all the systems
        //it will update the stock values with each pass
        let i = 0
        for(const c of this.compDict.entries()) {
            this.textArray[i].text = `${c[1][0]}`
            i++
        }
    }
}