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
        scene.add.rectangle(x, y, this.width, this.height, 0x808080).setScrollFactor(0); 
        const stringList = ['Amazon', 'Google', 'Gamestop'];
        
    //     let i = 0; // Changed the index to start from 0
    //     while (i < stringList.length) { // Changed condition to iterate over the length of stringList
    //         //text objects for each company
    //         this.dataText = scene.add.text(this.width / 4 - 40, (y / 2) + (55 * (i + 1)), `Company ${i + 1}: ${stringList[i]}`, {
    //             fontSize: 20 
    //     }).setOrigin(0.5).setScrollFactor(0);
    // } 
        
        let i = 0
        while(i <= this.num-1){
            //text objects for each company
            this.dataText = scene.add.text(this.width / 5 - 80, (y / 2) + (55 * i), `Company${i+1}:${stringList[i]}`, {
                fontSize: 20 
            }).setScrollFactor(0)
            i++
        }


    }

    update() {
        //this will have to be written once we have integrated all the systems
        //it will update the stock values with each pass
    }
}