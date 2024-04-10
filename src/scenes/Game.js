class Game extends Phaser.Scene {
    constructor() {
        super('gameScene')
    }

    preload() {

    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 3, "Game Scene", {
            color: '#FFFFFF',
            fontSize: 30,
            align: "center"
        }).setOrigin(.5)

        this.info = new PersonalInfo(this, 0, 0, 1, 1000)
    }

    update() {
        this.info.update()
    }
}