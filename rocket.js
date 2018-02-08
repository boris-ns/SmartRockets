class Rocket {

    constructor(x, y) {
        this.position = createVector(x, y);
        this.acceleration = createVector();
        this.velocity = createVector();
        this.dna = new DNA();

        this.dnaCounter = 0;
        this.crashed = false;
        this.finished = false;
        this.fitness = 0;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    calculateFitness() {
        // += because of punishemnt function when rocket gets out of canvas
        this.fitness += Math.sqrt(Math.pow(this.position.x - target.x, 2) + Math.pow(this.position.y - target.y, 2));
    }

    // Physics (movement) for rocket
    tick() {
        if (!this.crashed && !this.finished) {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.acceleration.mult(0);
            this.velocity.setMag(3);
        }

        if (!this.finished && Math.pow(this.position.x - target.x, 2) + Math.pow(this.position.y - target.y, 2) <= Math.pow(target.r, 2)) {
            this.finished = true;
            this.fitness += 10000; // can't be 0, because of division
            numOfHits++; // Global variable from main.js
        }

        if (this.position.x < 0 || this.position.x > CANVAS_WIDTH || this.position.y > CANVAS_HEIGHT) {
           this.crashed = true;
           this.fitness *= 0.01;
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