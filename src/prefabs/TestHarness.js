//test harness for the AI
class Harness{
    constructor(scene, x, y, company, texture) {
        this.scene = scene
        this.x = x
        this.y = y
        this.company = company
        this.texture = texture

        scene.add.existing(this)
        scene.add.rectangle(x, y, 400, 400, 0x777777)

        scene.add.text(x + 200, y, company.name)

        this.particles = scene.add.particles(x, y + 190, texture, {
            lifespan: 1000,
            speedX: -200,
            maxVelocityY: 0,
        })

        this.particles.emitParticle(10000, x, y)
    }
    update() {
        this.particles.y = (this.y + 400) - (this.company.rate * 2)
        //console.log(this.company.name, "rate: ", this.company.rate)
    }
}