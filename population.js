class Population {

    constructor() {
        this.MAX_POPULATION = 100; 
        this.rockets = new Array(this.MAX_POPULATION);
        this.dnaCounter = 0;
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

    findMaxFitness() {
        let maxFitness = 0;
        for (let i = 0; i < this.rockets.length; ++i) {
            if (this.rockets[i].fitness > maxFitness) {
                maxFitness = this.rockets[i].fitness;
            }
        }

        return maxFitness;
    }

    normalizeFitness() {
        let maxFitness = this.findMaxFitness();

        for(let i = 0; i < this.rockets.length; ++i) {
            this.rockets[i].fitness /= float(maxFitness);
        }
    }

    crossover(parent1, parent2) {
        let child = new Rocket(0, 0);
        //let middle = child.dna.genes.length / 2;
        let middle = random(child.dna.genes.length);

        for (let i = 0; i < child.dna.genes.length; ++i) {
            if (i <= middle) {
                child.dna.genes[i] = parent1.dna.genes[i];
            } else {
                child.dna.genes[i] = parent2.dna.genes[i];
            }

            // Mutation of 1%
            if (random(1) <= MUTATION_RATE / 100.0) {
                child.dna.genes[i] = p5.Vector.random2D();
            }
        }

        return child;
    }

    generateNewPopulation() {
       this.normalizeFitness();
       let newPopulation = new Array(this.MAX_POPULATION);

       for (let i = 0; i < newPopulation.length; ++i) {
           let parent1 = this.acceptReject();
           let parent2 = this.acceptReject();

           newPopulation[i] = this.crossover(parent1, parent2);
           console.log(parent1.fitness);
       }

       generationCounter++;                 // Global variable from main.js
       this.rockets = newPopulation;
    }

    acceptReject() {
        while (true) {
            let index = floor(random(this.MAX_POPULATION));
            let r = random(1);

            if (r < this.rockets[index].fitness) {
                return this.rockets[index];
            }
        }
    }
    
    tickAndDraw() {
        for (let i = 0; i < this.rockets.length; ++i) {
            this.rockets[i].applyForce(this.rockets[i].dna.genes[this.dnaCounter]);

            if (this.dnaCounter == this.rockets[0].dna.genes.length) {
                this.dnaCounter = 0;
                this.calculateFitness();
                this.generateNewPopulation();
                this.setInitPositions();

                if (numOfHits > bestNumOfHits) {
                    bestNumOfHits = numOfHits;
                }
                numOfHits = 0; // Global variable from main.js

                break;
            }

            this.rockets[i].tick();
            this.rockets[i].draw();
        }

        this.dnaCounter++;
    }
};