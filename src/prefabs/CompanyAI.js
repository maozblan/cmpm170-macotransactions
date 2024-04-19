//the trading algorithm that companies will use to simulate real stock behavior
//USAGE:
    //create a company AI object with 
class CompanyAI {
    //parameter list
        //scene, company name, starting trading value, max trading value, risk temperment (value 0 - 1), starting cash,
    constructor(scene, name, starting, max, risk, money=1000) {
        //atrributes
        this.scene = scene          //scene binding
        this.name = name            //company name
        this.stocks = 1000          //starting stock amount
        this.money = money          //cash on hand - default is 1000
        this.rate = starting        //exchange rate
        this.max = max              //max value the stock can trade for
        this.risk = (risk + 1)      //make the risk value such that it can be used to easily scale ranges

        //other companies that the AI needs to be aware of
        this.compArray = []     //this is empty to start in order to avoid issues with creating
                                //AIs before one another, and not being able to pass them into each others contructors
    
        this.init = false              //initilization flag
        this.num_others = 0            //number of other companies to consider
        this.compDict = new Map()      //dictionary of the stocks owned for each company: [name, [amount owned, bought price]]
        this.start = true              //starting behavior flag

        //calculations for running average
        this.averagePrice = 200        //running average, starts at 100
        this.smoothingValue = 0.9      //this is used to give more significance to more recent values. The closer to 1, the more significance applied

        this.debt = 0
        this.dead = false
    }

    initilizeComp(compArray){
        this.compArray = compArray
        this.init = true
        for (const c of compArray) {
            if (c.name != this.name){
                this.compDict.set(c.name, [0, 0])
                this.num_others += 1
            }
        }
        //console.log(this.compDict)
    }

    //buy stock
    buy(company, amount) {
        //if there is enough stock to buy
        //console.log(`${this.name} buying ${company.name}: ${company.name} price: ${company.rate}, ${this.name} amount: ${amount} `)
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
        //console.log(`${this.name} selling ${company.name}: ${company.name} price: ${company.rate}, ${this.name} bought: ${this.compDict.get(company.name)[1]} `)
        if(this.compDict.get(company.name) < amount) {
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

    //random behavior additive
    diceRoll(val=70) {
        let dice = ((Math.random() * val))
        if(dice < 1) {
            //console.log("HIIIIIIIIIIT")
            return true
        } else {
            return false
        }
    }

    update() {
        //make sure its initilized
        if(this.init == false) {
            throw new Error(`company ${this.name} is not initilized. Please use the initilzeComp() method before attempting to update.\n`)
        }

        if(this.money < 0) {
            this.debt += 1
            if(this.debt == 20){
                this.dead = true
                this.rate = 0
                this.money = 0
            }
        } else {
            this.debt = 0
        }

        if(this.dead != true) {
            console.log(`${this.name}: ${this.rate} -- ${this.stocks}`)
            //starting behavior (buy stocks randomly to get started)
            if(this.start == true) {
                this.start = false  
                //go through each company
                for (const c of this.compArray) {
                    if(c.name != this.name){
                        //buy a random amount of each stock
                        let amount = (Math.trunc((Math.random() * 1000) / this.num_others))
                        //console.log( this.name, ": ", amount)
                        this.buy(c, amount)
                    }
                }
            } 
            //active behavior - after starting buy-up
            else {
                //check positions for each stock
                for(const c of this.compArray) {
                    if (c.name != this.name) { 
                        //buy behavior
                        if(c.rate < c.averagePrice || this.diceRoll() == true) {
                            //buy a random-ish number of stocks
                            this.buy(c, Math.trunc((Math.random() * 1000) / this.num_others))
                        }

                        //sell behavior
                        //sell immediately if the stock price exceeds 150% of the bought price
                        if (c.rate > (this.compDict.get(c.name)[1]) * 1.5 || this.diceRoll() == true) {
                            //console.log(this.name, this.compDict.get(c.name)[1] * 1.5)
                            this.sell(c, this.compDict.get(c.name)[0])
                        }

                        //sell immediately if the stock dips too low
                        if(c.rate < (this.compDict.get(c.name)[1]) * .75 || this.diceRoll() == true) {
                            this.sell(c, this.compDict.get(c.name)[0])
                        }
                    }
                } 
            }
        }
        else {
            
        }
    }
}