// Car variables
let carImage;
let carX;
let carY;
const carWidth = 50;
const carHeight = 50;
let carSpeed = 5;

// Loading the car image
function preload() {
  carImage = loadImage('car.png');
}

// Gas variables
let gas = [];
const gasSize = 20;
let gasSpeed = 2;
const gasSpeedInc = 0.5;
let lastSpeedInc = 0; 
let makeGasTime = 1000;

// Energy variables
let energy = []
const energySize = 20;
const energySpeed = 3;

// Potion variabels
let potion = []
const potionSize = 20;

// Game variables
let lives = 3;
let timer = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 600);
  
  // Starting position of the car
  carX = width / 2;
  carY = height - carHeight;
  
  // Time intervals for "make" functions
  setInterval(makeGas, makeGasTime); 
  setInterval(makeEnergy, 10000);
  setInterval(makePotion, 20000);
  
  // Timer update
  setInterval(updateTimer, 1000); 
}

function draw() {
  background(220);
  
  game();
}

function game() {
  if(!gameOver) {
    // Position updating functions
    updateCar();
    updateGas();
    updateEnergy();
    
    // Display functions
    displayCar();
    displayGas();
    displayEnergy();
    displayPotion();
    displayNum();
    
    checkCollision();
  }
  else {
    gameEnd();
  }
}

function gameEnd() {
  textSize(30);
  textAlign(CENTER, CENTER);
  text('Game Over', width / 2, height / 2);
  text('Press any key to restart', width / 2, height / 2 + 40);
}

function updateCar() {
  // Constrain car position within the canvas
  carX = constrain(carX, 0, width - carWidth);
  
  if(keyIsDown(LEFT_ARROW)) {
    carX -= carSpeed;
  }
  else if(keyIsDown(RIGHT_ARROW)) {
    carX += carSpeed;
  }
}

function updateGas() {
  for(let i = 0; i < gas.length; i++) {
    gas[i].y += gasSpeed;
  }
}

function updateEnergy() {
  for(let i = 0; i < energy.length; i++) {
    energy[i].y += energySpeed;
  }
}

function checkCollision() {
  // Gas & car & ground
  for(let i = 0; i < gas.length; i++) {
    if(gas[i].y + gasSize >= carY && gas[i].x >= carX && gas[i].x <= carX + carWidth) {
      gas.splice(i, 1);
    }
    else if(gas[i].y + gasSize >= height) {
      gas.splice(i, 1);
      lives--;
      turnScreenRed();
    }
  }
  
  // Energy & car & ground
  for(let i = 0; i < energy.length; i++) {
    if(energy[i].y + energySize >= carY && energy[i].x >= carX && energy[i].x <= carX + carWidth) {
      carSpeed += 0.5;
      energy.splice(i, 1);
    }
    else if (energy[i].y + energySize >= height) {
      energy.splice(i, 1);
    }
  }
  
  // Potion & car
  for(let i = 0; i < potion.length; i++) {
    if(potion[i].y + potionSize >= carY && potion[i].x >= carX && potion[i].x <= carX + carWidth) {
      if(lives < 3) {
        lives++;
      }
      potion.splice(i, 1);
      turnScreenGreen();
    }
  }
  
  // Check if life is zero
  if(lives <= 0) {
    gameOver = true;
  }
}

function displayCar() {
  image(carImage, carX, carY, carWidth, carHeight);
}

function displayGas() {
  fill(255, 255, 0);
  for(let i = 0; i < gas.length; i++) {
    rect(gas[i].x, gas[i].y, gasSize, gasSize);
  }
}

function displayEnergy() {
  fill(50,205,50)
  for(let i = 0; i < energy.length; i++) {
    circle(energy[i].x, energy[i].y, energySize)
  }
}

function displayPotion() {
  fill(0, 0 ,255);
  for(let i = 0; i < potion.length; i++) {
    circle(potion[i].x, potion[i].y, potionSize)
  }
}

function displayNum() {
  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);
  text(`Lives: ${lives}`, 10, 10);
  text(`Timer: ${timer}`, 10, 40);
}

function keyPressed() {
  if (gameOver) {
    resetGame();
  }
}

function resetGame() {
  lives = 3;
  timer = 0;
  gameOver = false;
  CarX = width/2;
  CarY = height - carHeight;
  gasSpeed = 2;
  lastSpeedInc = 0
  gas = [];
  energy = [];
  potion = [];
}

function makeGas() {
  const newGas = {
    x: random(width - gasSize),
    y: 0,
  };
  gas.push(newGas);
}

function makeEnergy() {
  const newEnergy = {
    x: random(width - energySize),
    y: 0,
  };
  energy.push(newEnergy);
}

function makePotion() {
  const newPotion = {
    x: random(width - potionSize),
    y: height - potionSize,
  };
  potion.push(newPotion);
}

function updateTimer() {
  timer++;
  
  // Increasing the speed of gas every 10 seconds
  if (timer - lastSpeedInc >= 10) {
    gasSpeed += gasSpeedInc;
    makeGasTime -= 50;
    lastSpeedInc = timer;
  }
}

function turnScreenRed() {
  background(255, 0, 0);
  setTimeout(resetScreenColor, 200);
}

function turnScreenGreen() {
  background(154, 205, 50);
  setTimeout(resetScreenColor, 200);
}

function resetScreenColor() {
  background(220);
}






