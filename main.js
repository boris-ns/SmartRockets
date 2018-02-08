const CANVAS_WIDTH  = 740;
const CANVAS_HEIGHT = 480;
const MUTATION_RATE = 1; //%

let generationCounter = 0;
let numOfHits = 0;
let bestNumOfHits = 0;

let population;
let obstacles;
var target = {
    x : CANVAS_WIDTH - 60,
    y : 45,
    r : 25
};


function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    //createCourse1();
    createCourse2();
    population = new Population();
    population.generatePopulation();
}

/* Creates course. */
function createCourse1() {
    obstacles = new Array(4);
    obstacles[0] = new Obstacle(0, 300, 200, 20);                  // Left obstacle
    obstacles[1] = new Obstacle(CANVAS_WIDTH - 200, 300, 200, 20); // Right obstacle
    obstacles[2] = new Obstacle(270, 150, 200, 20);                // Center obstacle
    obstacles[3] = new Obstacle(CANVAS_WIDTH - 170, 0, 20, 200);   // Vertical obstacle
}

function createCourse2() {
    obstacles = new Array(4);
    obstacles[0] = new Obstacle(CANVAS_WIDTH / 2 + 50, 300, 20, 200);
    obstacles[1] = new Obstacle(CANVAS_WIDTH / 2 - 150, 300, 200, 20);
    obstacles[2] = new Obstacle(200, 0, 20, 150);
    obstacles[3] = new Obstacle(400, 150, 20, 150);
}

/* Checks collision between every rocket and every obstacle. */
function checkCollision() {
    for (let i = 0; i < population.rockets.length; ++i) {
        for (let j = 0; j < obstacles.length; ++j) {
            if (obstacles[j].collide(population.rockets[i])) {
                population.rockets[i].crashed = true;
                break;
            }
        }
    }
}

/* Calling draw method for all obstacles. */
function drawObstacles() {
    for (let i = 0; i < obstacles.length; ++i) {
        obstacles[i].draw();
    }
}

/* Printing informations about genetic algorithm. */
function drawText() {
    fill(255, 200, 0);
    textSize(16);
    text("Population: " + population.MAX_POPULATION, 10, 30);
    text("Mutation rate: " + MUTATION_RATE + "%", 10, 50);
    text("Generation: " + generationCounter, 10, 70);
    text("Number of hits: " + numOfHits + "/" + population.MAX_POPULATION, 10, 90);
    text("Best num. of hits: " + bestNumOfHits, 10, 110);
}

function draw() {
    background(50, 50, 50);
    drawText();

    population.tickAndDraw();
    checkCollision();
    drawObstacles();
    // Draw target
    fill(255, 0, 0);
    ellipse(target.x, target.y, target.r, target.r);
}