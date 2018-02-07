class Rocket {

    constructor(x, y) {
        this.position = createVector(x, y);
        this.acceleration = createVector();
        this.velocity = createVector();
        this.dna = new DNA();

        this.dnaCounter = 0;
        this.crashed = false;
        this.fitness = 0;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    calculateFitness() {
        // += because of punishemnt function when rocket gets out of canvas
        this.fitness += Math.sqrt(Math.pow(this.position.x - target.x, 2) + Math.pow(this.position.y - target.y, 2));
    }

    crossover(parent1, parent2) {
        // @TODO: maybe random middle point ?!
        let middle = this.dna.genes.length / 2;

        for (let i = 0; i < this.dna.genes.length; ++i) {
            if (i <= middle) {
                this.dna.genes[i] = parent1.dna.genes[i];
            } else {
                this.dna.genes[i] = parent2.dna.genes[i];
            }

            // Mutation of 1%
            if (random(1) <= MUTATION_RATE / 100.0) {
                this.dna.genes[i] = p5.Vector.random2D();
            }
        }
    }

    // Physics (movement) for rocket
    tick() {
        if (!this.crashed) {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
            this.velocity.setMag(3);
        }

        // @TODO: paziti na gornju ivicu, da se ona ne kazni uopste ?! 
        if (this.position.x < 0 || this.position.x > CANVAS_WIDTH ||
            this.position.y < 0 || this.position.y > CANVAS_HEIGHT) {
            
           this.crashed = true;
           this.fitness *= 10000;
        }
    }

    // @TODO: Figure out how to draw a triangle instead of rectangles, it'll look better
    draw() {
        push();
        fill(255);
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 5);
        pop();
    }
};