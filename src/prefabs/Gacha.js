class GachaWheel extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'wheel'); 

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
    }
}

class Gacha {
    constructor(scene, x, y) {
        // greybox
        this.height = 750;
        this.width = 450;
        scene.add.rectangle(x, y, this.width, this.height, 0x808080);

        this.scene = scene;
        this.canSpin = true; 
        this.sliceprizes = ["A KEY!!", "50 STARS", '500 STARS', 'BAD LUCK', '200 STARS', '100 STARS']; 
        this.timedEvent = this.scene.time.addEvent({
            delay: 3000,  //every 3 second - adjust later
            loop: true,
            callback: this.spinWheel,
            callbackScope: this,
        }) 

        this.prizeText = this.scene.add.text(game.config.width / 2, game.config.height - 20, "Spin the wheel", {
            font: "bold 32px Arial",
            align: "center",
            color: "white"
        });
        this.prizeText.setOrigin(0.5); 
        
        // wheel sprite
        this.wheel = new GachaWheel(scene, x-this.width/4, y+150).setScale(0.4);
        // pin sprite
        this.pin = this.scene.add.sprite(x-this.width/4, y+275, 'triangle').setScale(0.03); 
    }

    spinWheel(){
        console.log('EEEEEEEEEEEEEEEEEEEEEEEE', this.canSpin);
 
        // can we spin the wheel?
        if(this.canSpin){
            this.prizeText.setText("");
            // the wheel will spin round from 2 to 4 times. This is just coreography
            var rounds = Phaser.Math.Between(2, 4);
 
            // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
            var degrees = Phaser.Math.Between(0, 360);
 
            // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
            var prize = 6 - 1 - Math.floor(degrees / (360 / 6));
 
            // now the wheel cannot spin because it's already spinning
            this.canSpin = false;
 
            // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
            // the quadratic easing will simulate friction
            this.scene.tweens.add({
 
                // adding the wheel to tween targets
                targets: [this.wheel], //refering to the wheel sprite
 
                // angle destination
                angle: 360 * rounds + degrees,
 
                // tween duration
                duration: 3000,
 
                // tween easing
                ease: "Cubic.easeOut",
 
                // callback scope
                callbackScope: this,
 
                // function to be executed once the tween has been completed
                onComplete: function(tween){
                    // player can spin again
                    this.prizeText.setText(this.sliceprizes[prize]);
                    this.canSpin = true;
                }
            });
        }
    } 

} 