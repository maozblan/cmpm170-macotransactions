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
        this.compDict = new Map()      //dictionary of the stocks owned for each company
        this.start = true              //starting behavior flag
    }

    initilizeComp(compArray){
        this.compArray = compArray
        this.init = true
        for (const c of compArray) {
            if (c.name != this.name){
                this.compDict.set(c.name, 0)
                this.num_others += 1
            }
        }
        console.log(this.compDict)
    }

    //buy stock
    buy(company, amount) {
        //if there is enough stock to buy
        if(company.stocks > amount) {
            //subtract those from the total
            company.stocks -= amount
            //add those to portfolio
            this.compDict.set(company.name, (this.compDict.get(company.name)) + amount)
            //subtract cash and give it to seller
            this.money -= (amount * company.rate)
            company.money += (amount * company.rate)
        //not enough supply
        } else {
            //buy the rest
            this.compDict.set(company.name, (this.compDict.get(company.name)) + company.stocks)
            //move money
            this.money -= (company.stocks * company.rate)
            company.money += (company.stocks * company.rate)
            //set available stocks to zero
            company.stocks = 0
        }
    }

    //sell stock
    sell(company, amount) {
        //if there is enough to sell
        if(this.compDict.get(company.name) < amount) {
            //add them back to total
            company.stocks += amount
            //remove from portfolio
            this.compDict.set(company.name, (this.compDict.get(company.name)) - amount)
            //add money for selling
            this.money += amount * company.rate
            company.money -= amount * company.rate
        //if selling more than it has
        } else {
            //move money first
            company.money -= (this.compDict.get(company.name)) * company.rate
            this.money += (this.compDict.get(company.name)) * company.rate
            //add them all back
            company.stocks += (this.compDict.get(company.name))
            //set portfolio to zero
            this.compDict.set(company.name, 0)
        }
    }

    update() {
        if(this.init == false) {
            throw new Error(`company ${this.name} is not initilized. Please use the initilzeComp() method before attempting to update.\n`)
        }
        if(this.start == true) {
            this.start = false
            for (const c of this.compArray) {
                //buy a random amount of each stock
                let amount = (math.trunc((math.random() * 100) / this.num_others))
                this.buy(c, amount)
            }
        } else {
            for(c of this.compArray) {

            } 
        }
    }
}