class Population {

    constructor() {
        this.MAX_POPULATION = 50; 
        this.rockets = new Array(this.MAX_POPULATION);
        this.dnaCounter = 0; // same as TTL - time to live
    }

    generatePopulation() {
        for (let i = 0; i < this.rockets.length; ++i) {
            this.rockets[i] = new Rocket(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 100);
        }
    }

    setInitPositions() {
        for (let i = 0; i < this.rockets.length; ++i) {
            this.rockets[i].position.x = CANVAS_WIDTH / 2;
            this.rockets[i].position.y = CANVAS_HEIGHT - 100;
        }
    }

    calculateFitness() {
        for (let i = 0; i < this.rockets.length; ++i) {
            this.rockets[i].calculateFitness();
        }
    }

    selection() {
        // Just testing crossover
        let parent1 = this.rockets[31];
        let parent2 = this.rockets[15];

        for (let i = 0; i < this.rockets.length; ++i) {
            this.rockets[i].crossover(parent1, parent2);
        }
    }
    
    tickAndDraw() {
        for (let i = 0; i < this.rockets.length; ++i) {
            this.rockets[i].applyForce(this.rockets[i].dna.genes[this.dnaCounter]);

            if (this.dnaCounter == this.rockets[0].dna.genes.length) {
                this.dnaCounter = 0;
                // @TODO: selection, crossover and other things...
                this.calculateFitness();
                this.selection();
                // generate new population, not this initial one
                this.setInitPositions();
                break;
            }

            this.rockets[i].tick();
            this.rockets[i].draw();
        }

        this.dnaCounter++;
    }
};