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
        this.fitness = 2000 - Math.sqrt(Math.pow(this.position.x - target.x, 2) + Math.pow(this.position.y - target.y, 2));

        if (this.crashed) 
            this.fitness *= 0.1;
        else if (this.finished)
            this.fitness += 100000;
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
            numOfHits++; // Global variable from main.js
        }

        if (this.position.x < 0 || this.position.x > CANVAS_WIDTH || 
            this.position.y < 0 || this.position.y > CANVAS_HEIGHT) {
           this.crashed = true;
        }
    }

    draw() {
        let theta = this.velocity.heading() + radians(90);
        fill(255);
       
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -15);
        vertex(-5, 15);
        vertex(5, 15);
        endShape(CLOSE);
        pop();
    }
};