class Obstacle {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        fill(150, 150, 150);
        rect(this.x, this.y, this.width, this.height);
    }

    collide(rocket) {
        if (rocket.position.x >= this.x && rocket.position.x <= this.x + this.width
            && rocket.position.y >= this.y && rocket.position.y <= this.y + this.height) {
                return true;
        }

        return false;
    }
};