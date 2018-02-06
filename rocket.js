class Rocket {

    constructor(x, y) {
        this.position = createVector(x, y);
        this.acceleration = createVector();
        this.velocity = createVector();
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    // Physics (movement) for rocket
    tick() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.velocity.setMag(3);        
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