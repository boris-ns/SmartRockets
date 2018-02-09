// Main parameters
const CANVAS_WIDTH  = 740;
const CANVAS_HEIGHT = 480;
let MUTATION_RATE   =   1; //%
let POPULATION_SIZE = 100;
let DNA_SIZE        = 300;

let population;
let obstacles;
var target = {
    x : CANVAS_WIDTH - 60,
    y : 45,
    r : 25
};

// Variables for storing info about algorithm
let generationCounter = 0;
let numOfHits = 0;
let bestNumOfHits = 0;

// HTML elements
let sliderPopulation;
let sliderMutation;
let sliderDnaSize;
let paragPopulation;
let paragMutation;
let paragDnaSize;
let paragCourse;
let resetButton;
let radioLevels;

// Variables for creating new obstacles
let startX;
let startY;

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    createCourse1();
    population = new Population();
    population.generatePopulation();

    initHtmlElements();
}

function initHtmlElements() {
    createP(""); // @Hack: so the sliders wont be at right side of canvas
    paragPopulation = createDiv("Population: " + POPULATION_SIZE);
    sliderPopulation = createSlider(0, 500, POPULATION_SIZE);
    paragMutation = createDiv("Mutation rate: " + MUTATION_RATE + "%");
    sliderMutation = createSlider(0, 100, MUTATION_RATE);
    paragDnaSize = createDiv("DNA size (Time To Live): " + DNA_SIZE);
    sliderDnaSize = createSlider(0, 1000, DNA_SIZE);

    createDiv("Choose level:");
    radioLevels = createRadio();
    radioLevels.option("Level 1", 1);
    radioLevels.option("Level 2", 2);
    radioLevels.option("Level 3", 3);
    radioLevels.option("Custom level", 4);

    createP("You can create custom obstacles by clicking and dragging mouse across canvas.");  
    resetButton = createButton("Reset");
    resetButton.mousePressed(resetButtonAction);
}

/* Action when reset button is clicked. This method resets whole simulation with new paremeters. */
function resetButtonAction() {
    POPULATION_SIZE = sliderPopulation.value();
    MUTATION_RATE   = sliderMutation.value();
    DNA_SIZE        = sliderDnaSize.value();
    setLevel();

    population = new Population();
    population.generatePopulation();
}

/* Sets level according to values from radio button. */
function setLevel() {
    if (radioLevels.value() == 2) {
        createCourse2();
    } else if (radioLevels.value() == 3){ 
        createCourse3();
    } else if (radioLevels.value() == 4) {
        createCustomLevel();
    } else {
        createCourse1();
    }
}

/* These 2 functions are for creating new obstacles when user clicks and drags mouse over canvas.
   With mousePressed we save starting position of obstacle, and with mouseReleased we save ending
   positions and also create new obstacle. */
function mousePressed() {
    startX = mouseX;
    startY = mouseY;
}

function mouseReleased() {
    let endX = mouseX;
    let endY = mouseY;
    let width = endX - startX;
    let height = endY - startY;
    obstacles.push(new Obstacle(startX, startY, width, height));
}

/* Creates course. */
function createCourse1() {
    obstacles = new Array(3);
    obstacles[0] = new Obstacle(0, 300, 200, 20);                  // Left obstacle
    obstacles[1] = new Obstacle(CANVAS_WIDTH - 200, 300, 200, 20); // Right obstacle
    obstacles[2] = new Obstacle(270, 150, 200, 20);                // Center obstacle
    target.x = CANVAS_WIDTH / 2;
}

function createCourse2() {
    obstacles = new Array(4);
    obstacles[0] = new Obstacle(0, 300, 200, 20);                  // Left obstacle
    obstacles[1] = new Obstacle(CANVAS_WIDTH - 200, 300, 200, 20); // Right obstacle
    obstacles[2] = new Obstacle(270, 150, 200, 20);                // Center obstacle
    obstacles[3] = new Obstacle(CANVAS_WIDTH - 170, 0, 20, 200);   // Vertical obstacle
    target.x = CANVAS_WIDTH - 60;
}

function createCourse3() {
    obstacles = new Array(4);
    obstacles[0] = new Obstacle(CANVAS_WIDTH / 2 + 50, 300, 20, 200);
    obstacles[1] = new Obstacle(CANVAS_WIDTH / 2 - 150, 300, 200, 20);
    obstacles[2] = new Obstacle(200, 0, 20, 150);
    obstacles[3] = new Obstacle(400, 150, 20, 150);
    target.x = CANVAS_WIDTH - 60;
}

function createCustomLevel() {
    obstacles = new Array();
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
    textSize(14);
    text("Population: " + POPULATION_SIZE, 10, 30);
    text("Mutation rate: " + MUTATION_RATE + "%", 10, 50);
    text("Generation: " + generationCounter, 10, 70);
    text("Number of hits: " + numOfHits + "/" + POPULATION_SIZE, 10, 90);
    text("Best num. of hits: " + bestNumOfHits, 10, 110);
    text("DNA size (TTL): " + DNA_SIZE, 10, 130);
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

    // Updating HTML elements
    paragPopulation.html("Population: " + sliderPopulation.value());
    paragMutation.html("Mutation rate " + sliderMutation.value() + "%");
    paragDnaSize.html("DNA size (Time To Live): " + sliderDnaSize.value());
}