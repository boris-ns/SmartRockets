const CANVAS_WIDTH  = 740;
const CANVAS_HEIGHT = 480;

let population;
var target = {
    x : CANVAS_WIDTH / 2,
    y : 20
};


function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    population = new Population();
    population.generatePopulation();
}

function draw() {
    background(50, 50, 50);
    population.tickAndDraw();
    
    // Draw target
    fill(255, 0, 0);
    ellipse(target.x, target.y, 15, 15);
}