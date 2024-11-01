class Player {
    //parameter list
        //scene, company name, starting trading value, max trading value, risk temperment (value 0 - 1), starting cash,
    constructor(scene, name, starting, max, money=100000) {
        //atrributes
        this.s = scene          //scene binding
        this.name = name            //company name
        this.stocks = 1000          //starting stock amount
        this.money = money          //cash on hand - default is 1000
        this.rate = starting        //exchange rate
        this.max = max              //max value the stock can trade for

        //other companies that the Player needs to be aware of
        this.compArray = []     //this is empty to start in order to avoid issues with creating
                                //AIs before one another, and not being able to pass them into each others contructors
    
        this.init = false              //initilization flag
        this.num_others = 0            //number of other companies to consider
        this.compDict = new Map()      //dictionary of the stocks owned for each company: [name, [amount owned, bought price]]
        this.start = true              //starting behavior flag

        //calculations for running average
        this.averagePrice = 200        //running average, starts at 100
        this.smoothingValue = 0.9      //this is used to give more significance to more recent values. The closer to 1, the more significance applied

        this.dead = false
        this.debt = 0
    }

    initilizeComp(compArray){
        this.compArray = compArray
        this.init = true
        for (const c of compArray) {
            this.compDict.set(c.name, [0, 0])
            this.num_others += 1
        }
    }

    //buy stock
    buy(company, amount=100) {
        //if there is enough stock to buy
        console.log(`${this.name} buying ${company.name}: ${company.name} price: ${company.rate}, ${this.name} amount: ${amount} `)
        if(company.stocks > amount) {
            //subtract those from the total
            company.stocks -= amount
            //add those to portfolio
            let obj = [(this.compDict.get(company.name)[0]) + amount, company.rate]
            this.compDict.set(company.name, obj)
            //subtract cash and give it to seller
            this.money -= (amount * company.rate)
            company.money += (amount * company.rate)
        //not enough supply
        } else {
            //buy the rest
            let obj = [(this.compDict.get(company.name)[0]) + company.stocks, company.rate]
            this.compDict.set(company.name, obj)
            //move money
            this.money -= (company.stocks * company.rate)
            company.money += (company.stocks * company.rate)
            //set available stocks to zero
            company.stocks = 0
        }
        //console.log(company.stocks, "-", company.name, " stocks after purchase")

        //update stock price
        //this formula makes the price scale between 100 and 200 dollars based on how much stock is left
        company.rate = Math.floor(((1000 - company.stocks) * 0.1) + 100)

        //update running average
        //this is a formula for an exponential moving average, which means that the AI will consider more recent values more heavily
        company.averagePrice = (company.smoothingValue * company.rate) + ((1 - company.smoothingValue) * company.averagePrice)
    }

    //sell stock
    sell(company, amount) {
        //if there is enough to sell
        console.log(`${this.name} selling ${company.name}: ${company.name} price: ${company.rate}, ${this.name} bought: ${this.compDict.get(company.name)[1]} `)
        if(this.compDict.get(company.name)[0] > amount) {
            //add them back to total
            company.stocks += amount
            //remove from portfolio
            this.compDict.set(company.name, [(this.compDict.get(company.name)[0]) - amount, this.compDict.get(company.name)[1]])
            //add money for selling
            this.money += amount * company.rate
            company.money -= amount * company.rate
        //if selling more than it has
        } else {
            //move money first
            company.money -= (this.compDict.get(company.name)[0]) * company.rate
            this.money += (this.compDict.get(company.name)[0]) * company.rate
            //add them all back
            company.stocks += (this.compDict.get(company.name)[0])
            //set portfolio to zero
            this.compDict.set(company.name, [0, ])
        }

        //update stock price
        //this formula makes the price scale between 100 and 200 dollars based on how much stock is left
        company.rate = Math.floor(((1000 - company.stocks) * 0.1) + 100)

        //update running average
        //this is a formula for an exponential moving average, which means that the AI will consider more recent values more heavily
        company.averagePrice = (company.smoothingValue * company.rate) + ((1 - company.smoothingValue) * company.averagePrice)
    }

    update() {
        //make sure its initilized
        if(this.init == false) {
            throw new Error(`company ${this.name} is not initilized. Please use the initilzeComp() method before attempting to update.\n`)
        }

        if(this.money < 0) {
            this.debt += 1
            if(this.debt >= 20){
                this.dead = true
                this.rate = 0
                this.money = -100
            }
        } else {
            this.debt = 0
        }

        // YOU LOSE
        if (this.dead == true) {
            setTimeout(() => {
                this.s.scene.start("menuScene");
            }, 500);
            gameOver();
        }
    }
}