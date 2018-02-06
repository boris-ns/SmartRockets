class Population {

    constructor() {
        this.MAX_POPULATION = 50; 
        this.rockets = new Array(this.MAX_POPULATION);
    }

    generatePopulation() {
        for (let i = 0; i < this.rockets.length; ++i) {
            this.rockets[i] = new Rocket(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 100);
        }
    }
    
    tickAndDraw() {
        for (let i = 0; i < this.rockets.length; ++i) {
            this.rockets[i].applyForce(p5.Vector.random2D());
            this.rockets[i].draw();
            this.rockets[i].tick();
        }
    }
};