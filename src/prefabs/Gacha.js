class Gacha extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture); 

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
    }

    create(){
        //this.pin = this.add.sprite(this.x, this.y+150, 'triangle').setScale(0.05); 
        this.canSpin = true; 

        this.timedEvent = this.time.addEvent({
            delay: 3000,  //every 3 second - adjust later
            loop: true,
            callback: this.spinWheel,
            callbackScope: this,
        }) 
    }

    spinWheel(){
 
        // can we spin the wheel?
        if(this.canSpin){
 
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
            this.tweens.add({
 
                // adding the wheel to tween targets
                targets: [this.texture], //refering to the wheel sprite
 
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
                    this.canSpin = true;
                }
            });
        }
    } 

} 