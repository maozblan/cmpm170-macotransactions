//import eventsCenter from "./EventCenter";

class GachaWheel extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'wheel'); 

        scene.add.existing(this); 
        scene.physics.add.existing(this); 
        console.log(scene.dummy); 
    }
}

class Gacha {
    constructor(scene, x, y) {
        // greybox
        this.height = 750;
        this.width = 450;
        var gachabackground = scene.add.rectangle(x, y, this.width, this.height, 0x808080);
        gachabackground.setScrollFactor(0); 
        
        //myrect.setScrollFactor(0);
        //console.log('rec', myrect)

        this.scene = scene;
        this.canSpin = true; 
        this.sliceprizes = ["A KEY!!", "50 STARS", '500 STARS', 'BAD LUCK', '200 STARS', '100 STARS']; 
        this.slices = 6; 

        this.timedEvent = this.scene.time.addEvent({
            delay: 3000,  //every 3 second - adjust later
            loop: true,
            callback: this.spinWheel,
            callbackScope: this,
        }) 

        this.timedEvent2 = this.scene.time.addEvent({
            delay: 3000,
            loop: true,
            callback: () => {
                // Stop the wheel
                this.stopWheel();
                // Set canSpin to true after another 3 seconds
                this.scene.time.delayedCall(3000, () => {
                    this.canSpin = true;
                }, [], this);
            },
            callbackScope: this
        });

        this.prizeText = this.scene.add.text(game.config.width - 110, game.config.height/2 - 50, "Spin the wheel", {
            font: "bold 25px Arial",
            color: "white"
        });
        this.prizeText.setOrigin(0.5).setScrollFactor(0); 
        
        // wheel sprite
        this.wheel = new GachaWheel(scene, x-this.width/4, y+150).setScale(0.4);
        this.wheel.setScrollFactor(0); 
        // pin sprite
        this.pin = this.scene.add.sprite(x-this.width/4, y+275, 'triangle').setScale(0.03); 
        this.pin.setScrollFactor(0); 

        // var container = this.scene.add.group(); 
        // container.add(myrect);
        // container.add(this.wheel)
        // container.add(this.pin)

        // container.setScrollFactor(0); 
        
        // this.scene.add.group(myrect); 
        // this.scene.add.group(this.wheel);
        // this.scene.add.group(this.pint);  
        
        //this.scene.get('battle-pass', this.foo, this); 
    }

    bp(percent){
        //console.log('heyyyy', percent); 
        if(percent == 35){
            this.slices = 2; 
            this.stopWheel();   
        }
        if(percent == 25){
            this.slices = 4; 
            this.stopWheel();   
        }
        if(percent = 15){
            this.slices = 5; 
            this.stopWheel();   
        }
        if(percent = 10){
            this.slices = 5.5
            this.stopWheel();   
        }
    }

    stopWheel(){
        this.canSpin = false; 
    }

    spinWheel(){
        //console.log('EEEEEEEEEEEEEEEEEEEEEEEE', this.canSpin);
 
        // can we spin the wheel?
        if(this.canSpin){
            this.prizeText.setText("");
            // the wheel will spin round from 2 to 4 times. This is just coreography
            var rounds = Phaser.Math.Between(2, 4);
 
            // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
            var degrees = Phaser.Math.Between(0, 360);
 
            // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
            var prize = 6 - 1 - Math.floor(degrees / (360 / this.slices));
 
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
                    console.log(this.canSpin)
                }
            });
        }
    } 

} 