class Game extends Phaser.Scene {
    constructor() {
        super('gameScene')
    }

    preload() {
        this.load.image('particle', './assets/img/particle.png')
    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 3, "Game Scene", {
            color: '#FFFFFF',
            fontSize: 30,
            align: "center"
        }).setOrigin(.5)

        this.company1 = new CompanyAI(this, "Amazon", 100, 200, 0.5)
        this.company2 = new CompanyAI(this, "Google", 100, 200, .5)
        this.company3 = new CompanyAI(this, "Gamestop", 100, 200, .5)

        this.compConfig = [this.company1, this.company2, this.company3]

        this.company1.initilizeComp(this.compConfig)
        this.company2.initilizeComp(this.compConfig)
        this.company3.initilizeComp(this.compConfig)

        // this.h1 = new Harness(this, 250, 200, this.company1, 'particle')
        this.h1 = new StockTicker(this, this.company1, 250, 200)

        // this.h2 = new Harness(this, 800, 200, this.company2, 'particle')
        this.h2 = new StockTicker(this, this.company2, 800, 200)

        // this.h3 = new Harness(this, 500, 600, this.company3, 'particle')
        this.h3 = new StockTicker(this, this.company3, 500, 600)
    }

    update() {
        this.company1.update()
        this.company2.update()
        this.company3.update()

        this.h1.update()
        this.h2.update()
        this.h3.update()
    }
}