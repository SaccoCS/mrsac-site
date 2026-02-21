

let blocks = [];
let goal; //  = new Goal(775,275);

let activeBrain;

let vehicles = [];
let gens = [];

let rateP;

function setup() {
  createCanvas(851, 551);
  rateP = createP();
  frameRate(30);

  goal = new Goal(775, 475);

  vehicles = vehicleGrid();

  
  mineField();
  
  
  
  let g = new Generation(blocks,goal);
  gens.push(g);
  
  g.scoreBrains();
  activeBrain = g.alpha();
   vehicles = vehicleGrid(activeBrain);
}

function draw() {
  
  rateP.html(int(frameRate()));
  background(255);
  noFill();
  stroke(0);
  rect(0,0,850,550);
  
  
  drawBlocks();
  goal.draw();
  image(activeBrain.flow.getImage(),0,0);
 
  drawVehicles();



  ///////////////////////////////////

  updateVehicles();
  vehiclesCollision();


  if (completed()) {
    createP(distSum());
    console.log(activeBrain);

//       activeBrain.scorem(blocks,goal);
//     vehicles = vehicleGrid(activeBrain);
    
    
    let g = new Generation(blocks,goal,gens[gens.length-1].brains);
  gens.push(g);
  
 // g.scoreBrains();
  activeBrain = g.alpha();
   vehicles = vehicleGrid(activeBrain);
    
    
    
  }
}



function completed() {
  for (let v of vehicles) {

    if (v.isActive)
      return false;
  }
  return true;
}


function vehiclesCollision() {
  for (let v of vehicles) {

    if (!v.isActive)
      continue;

    let futureX = v.pos.x + 2 * v.vel.x;
    let futureY = v.pos.y + 2 * v.vel.y;

    for (let r = 0; r < blocks.length; r++) {
      if (blocks[r].contains(futureX, futureY)) {
        v.isActive = false;
      }
    }


    if (futureX < 0 || futureY < 0 || futureX > 850 || futureY > 550)
      v.isActive = false;
    
    if (goal.distTo(v) < goal.r) {
        v.isActive = false;
      }
  }
}

function updateVehicles() {
  for (let v of vehicles) {

    if (!v.isActive)
      continue;

    v.steerField();
    v.update();
  }
}

function drawVehicles() {
  for (let v of vehicles) {
    v.draw();
  }
}

function drawBlocks() {
  for (let b of blocks)
    b.draw();
}

function mineField() {
  let numTangle = 15;
  let rects = [];
  while (rects.length < numTangle) {
    let w = int(randomGaussian(50, 15));
    let h = int(randomGaussian(50, 15));

    let x = random(0, 850 - w);
    let y = random(0, 550 - h);

    let has = false;
    let rect = new Rectangle(x, y, w, h);
    for (let r of rects)
      if (rect.overlaps(r))
        has = true;


    if (goal.overlaps(rect)) {
      has = true;
    }
    if (!has)
      rects.push(rect);
  }
  blocks = rects;
}

function mousePressed() {
  vehicles = vehicleGrid();
}

function loadBrad(brain) {
  activeBrain = brain;
}


function distSum(x, y) {
  let sum = 0;

  for (let v of vehicles)
    sum += goal.distTo(v);

  return sum;
}

function vehicleGrid(brain) {
  ve = [];
  for (let x = 25; x < width; x += 50) {
    for (let y = 25; y < height; y += 50) {
      ve.push(new Vehicle(x, y, brain));
    }

  }

  return ve;
}


//inc
function generation(pastBrains){
  let brains = [];
  
  if(pastBrains){
    for(let i =0;i<100;i++){
      brains.push(new Brain());
    }
  }
  else{
    
  }
}




