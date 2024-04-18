class Game extends Phaser.Scene {
    dummy = 10; 
    constructor() {
        super('gameScene')
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('wheel', 'wheel.png'); 
        this.load.image('triangle', 'triangle.png'); 
    }

    create() {
        // TEMPORARY
        var cam = this.cameras.main.setBounds(-200, 0, 1450, 808);
        this.add.text(game.config.width / 2, game.config.height / 3, "Game Scene", {
            color: '#FFFFFF',
            fontSize: 30,
            align: "center"
        }).setOrigin(.5)

        // company AI things
        this.company1 = new CompanyAI(this, "Amazon", 100, 200, 0.5)
        this.company2 = new CompanyAI(this, "Google", 100, 200, .5)
        this.company3 = new CompanyAI(this, "Gamestop", 100, 200, .5)
        //player object
        this.player = new Player(this, "Player", 100, 200, 100000)

        this.compConfig = [this.company1, this.company2, this.company3, this.player]

        this.company1.initilizeComp(this.compConfig)
        this.company2.initilizeComp(this.compConfig)
        this.company3.initilizeComp(this.compConfig)
        this.player.initilizeComp(this.compConfig)


        // stock ticker graphic things
        this.h1 = new StockTicker(this, this.company1, 250, 200)
        this.h2 = new StockTicker(this, this.company2, 800, 200)
        this.h3 = new StockTicker(this, this.company3, 500, 600)

        

      
      this.input.on("pointermove", function (p) {
        if (!p.isDown) return;
        cam.scrollX -= (p.x - p.prevPosition.x); //wire this to tickers instead???
        cam.scrollY -= (p.y - p.prevPosition.y); //scrolls up and down
      });

      // left hand bar
      this.info = new PersonalInfo(this, 0, 0, 1, this.player)
      this.assets = new Assets(this, 0, 750, 1, this.player.compDict);

      //add the player ticker object
      this.playerTicker = new PlayerStockTicker(this, this.player, 112.5, 93.75, .5)

      // right hand bar
      this.battle = new BattlePass(this, game.config.width, 750, 1, 4);
      this.wheel = new Gacha(this, game.config.width, 0);

      // timer for company AI and stock ticker updates
      this.time.addEvent({
        delay: 500, // in milliseconds
        startAt: 0,
        loop: true,
        callback: () => {
          this.company1.update()
          this.company2.update()
          this.company3.update()
          this.player.update()

          this.h1.update()
          this.h2.update()
          this.h3.update()
          this.playerTicker.update()
        },
        callbackScope: this,
      })
    }

    update() {
        this.info.update()
        this.assets.update()
    }
}
