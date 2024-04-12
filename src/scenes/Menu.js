class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {

    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 3, "MacroTransactions", {
            color: '#FFFFFF',
            fontSize: 30,
            align: "center"
        }).setOrigin(.5)
        this.add.text((game.config.width / 2), (game.config.height / 2), "Space to Start", {
            color: '#FFFFFF',
            fontSize: 24,
            align: "center"
        }).setOrigin(.5)
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if(this.keySpace.isDown == true) {
            this.scene.start("gameScene")
        }
    }
}
