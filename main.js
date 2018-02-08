const CANVAS_WIDTH  = 740;
const CANVAS_HEIGHT = 480;
const MUTATION_RATE = 5; //%
let generationCounter = 0;
let numOfHits = 0;
let bestNumOfHits = 0;

let population;
var target = {
    x : CANVAS_WIDTH / 2,
    y : 20,
    r : 25
};


function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    population = new Population();
    population.generatePopulation();
}

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

    // Draw target
    fill(255, 0, 0);
    ellipse(target.x, target.y, target.r, target.r);
}