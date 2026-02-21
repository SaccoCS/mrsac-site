var vehicles = [];
var p;
var count;
var spawnX = 75;
var spawnY = 75;

var drag = null;
var rects = [];

var slider;

var numVehiclesInput;

var goal; // = new Goal(775,275);
var lastLead;
var frameLimit = 350;
var resetButton;
var leaders = [];
var genP;

var pool;

var genCount = 1;

var pathPic = null;

var showFieldBox;
var obstaclesButton;

let pathCollection = [];

function setup() {
  let c = createCanvas(851, 551);
 // c.style('display','block');
 createP('');

  resetButton = createButton('Reset Brains');
  resetButton.mousePressed(function() {
    vehicles = [];
    genCount = 1;
    lastLead = null;
    genP.html("Generation: 1")
    pathPic = null;
    pathCollection = [];
    spawn();
 
    
  });



  count = 0;


  numVehiclesInput = createInput(256);
  numVehiclesInput.style('width', '30px');
  numVehiclesInput.style('margin-left', '10px');
  
  createP('');
  
obstaclesButton = createButton('Random Obstacles');
  obstaclesButton.mousePressed(minefield);
  obstaclesButton.style('clear','left');
  frameRate(30);
  p = createP(count);

  genP = createP("Generation: 1");

  goal = new Goal(775, 475);
  spawn();
  pathPic = null;
  
  showFieldBox = createCheckbox("Show Leader Flow Field");
  slider = createSlider(1,10,1);
  
  minefield();
}


function keyPressed() {
  if (key == ' ') {
 loop();
  }

  if (key == 'R') {

  }
}

function leader() {
  if (vehicles.length === 0)
    return null;
  let lead = vehicles[0];
  let leadDist = goal.distTo(lead);
  for (let i = 1; i < vehicles.length; i++) {
    let tmpDst = goal.distTo(vehicles[i]);
    vehicles[i].recordDist(tmpDst);
    if (tmpDst < leadDist) {
      lead = vehicles[i];
      leadDist = tmpDst;
    }
  }

  return lead;
}

function nextGen(p) {

  let next = [];
  let v = new Vehicle();
  
  v.pos = createVector(spawnX,spawnY);
  v.field = p.leader().field;
 
   next.push(v);
  while (next.length < vehicles.length) {


    next.push(p.randomCross());
  }
  return next;
}

function nextGenOld() {
  let pool = datingPool();


  let next = [];
  while (next.length < vehicles.length) {

    let mom = random(pool);
    let dad = random(pool);

    let childF = mom.field.cross(dad.field);
    let child = new Vehicle();
    child.pos = createVector(spawnX, spawnY);

    if (random(1) < 0.95)
      child.field = childF;
    next.push(child);
  }
  return next;
}

function datingPool() {
  let pool = [];
  for (let i = 0; i < vehicles.length / 3; i++) {
    let v = vehicles[i];
    // v.minDist = Infinity;


    for (let j = 0; j < v.score; j++) {
      pool.push(v);
    }
  }

  // console.log(pool.length);
  //   for (let i = 0; i < pool.length * 0.05; i++) {
  //     pool.push(new Vehicle(spawnX, spawnY));
  //   }

  //console.log(pool[0]);
  return pool;
}

function scoreVehicles() {
  let max = -1;
  let ave = 0;
  let hit = 0;
  for (let i = 0; i < vehicles.length; i++) {
    let s = score(vehicles[i]);
    ave += s;

    if (i === 0 || s > max)
      max = s;

    if (vehicles[i].hitBonus != 1)
      hit++;

    // console.log(s);
  }
  if (ave !== 0)
    ave /= vehicles.length


  console.log("max:" + max);
  console.log("ave:" + (ave / vehicles.length));
  console.log("hitCount:" + hit);
}

function mousePressed() {

  for (let i = rects.length - 1; i >= 0; i--) {
    if (rects[i].contains(mouseX, mouseY)) {

      rects.splice(i, 1);
    }
  }


  drag = new Rectangle(mouseX, mouseY, 0, 0);
}

function mouseReleased() {

  if (drag != null && abs(drag.w) > 10 && abs(drag.h) > 10) {
    drag.abs();
    rects.push(drag);
  }
  drag = null;
}

function mouseDragged() {
  drag.w = mouseX - drag.x;
  drag.h = mouseY - drag.y;

}

function minefield(){
let numTangle = 55;
   
  rects = [];
  while(rects.length<numTangle)
    {
      let w = int(randomGaussian(50,15));
      let h = int(randomGaussian(50,15));
      
      let x = random(0,850-w);
      let y = random(0,550-h);
      
      let has = false;
      let rect = new Rectangle(x,y,w,h);
      for(let r of rects)
        if (rect.overlaps(r))
          has = true;
      
      
     if(rect.overlaps(new Rectangle(spawnX-12,spawnY-12,26,26)))
       has = true;
      if(rect.overlaps(goal))
       has = true;
      
      if(!has)
      rects.push(rect);
  //    console.log(rects[rects.length-1]);
      
    }
  
}

function score1(v) {
  let d = v.minDist; //dist(v.pos.x, v.pos.y, goal.x, goal.y);
  d -= 40;
  d = d / 700;
  //d /= 50;

  let s = 100 / (d * d);

  s += v.closeBonus;
  s += v.hitBonus;
  v.score = s;
  return s;
}

function score(v) {
  let d = v.minDist; //dist(v.pos.x, v.pos.y, goal.x, goal.y);
  // d -=30;
  //d = d/700;
  //d /= 50;

  d -= 20;
  d /= 800.0;

  let s = 1 / (d * d);
  //console.log(s + " " + d);



  s += v.closeBonus;
  s *= v.hitBonus;
  v.score = s;

  //   if(s===0)
  //     debugger;
  return s;
}

// function getPath(v){
//   let g = createGraphics(width,height);
//   v.
// }



function spawn() {
  for (let i = 0; i < numVehiclesInput.value(); i++) {
    let v = new Vehicle();
    v.pos = createVector(spawnX, spawnY);
   // v.randVect();
    vehicles.push(v);
  }
}

function activeCount() {
  let c = 0;
  for (let i = vehicles.length - 1; i >= 0; i--) {
    let v = vehicles[i];
    if (v.isActive)
      c++;
  }

  return c;
}



function removeInactives() {

  for (let i = vehicles.length - 1; i >= 0; i--) {
    let v = vehicles[i];
    if (!v.isActive)
      vehicles.splice(i, 1);
  }
}

// function reached(){
//   for(let v of vehicles){
//     i
//   }
// }

function pastPaths(num){
  num = Math.min(num,pathCollection.length)
  for(let i = 1; i<=num; i++)
    {
      let p = pathCollection[pathCollection.length-i];
    //  tint(255,255-i*10);
      image(p,0,0);
    }
 // noTint();
}

function drawPath(v, count) {
  let fIm = v.field.getImage();
  let path = createGraphics(width+1, height);
  path.strokeWeight(1);
 // path.image(fIm, 0, 0);
  v.pos = createVector(spawnX, spawnY);
  v.vel = createVector(0, 0);
  path.fill(255, 0, 0);
  path.stroke( 90, 90,255,20);
  let go = true;
  while (count > 0 && go) {
    v.steerField();
    v.update();
    path.line(v.pos.x, v.pos.y, v.prevPos.x, v.prevPos.y);
    count--;
    let futureX = v.pos.x + 2 * v.vel.x;
    let futureY = v.pos.y + 2 * v.vel.y;

    for (let r of rects) {
      if (r.contains(futureX, futureY)) {
        go = false;
      }
    }
  }
  return path;
}

function lastPaths(num){
  for(let i = 0; i<num && i<pathCollection.length; i++)
    {
      image(pathCollection[i],0,0);
    }
}


function draw() {
  background(250);
  if (pathPic == null)
    pathPic = drawPath(vehicles[0], count);
  else
    image(pathPic, 0, 0);
//   if (!lastLead)
//     lastLead = leader();

  //field.draw();

  if(showFieldBox.checked() && lastLead){
    
  let flow = lastLead.field.getImage();
  image(flow, 0, 0);
  }

  pastPaths(7);
  for (let index = 0; index < rects.length; index++) {
    rects[index].draw();
  }

  //draw spawn
  noFill();
  ellipseMode(CENTER);
  ellipse(spawnX, spawnY, 25, 25);


  goal.draw();

  //Draw all vehicles
  for (let index = 0; index < vehicles.length; index++) {
    let element = vehicles[index];
    element.draw();
  }

  if (drag != null)
    drag.draw();

  noFill();
  rect(0, 0, width - 1, height - 1);




  //Update frame rate
  p.html(count);
  
  for(let i =0; i<slider.value();i++)
  update();
}
  
  
  
  function update(){
    
  

  let endGen = false;

  for (let index = vehicles.length - 1; index >= 0; index--) {
    let v = vehicles[index];


    let futureX = v.pos.x + 2 * v.vel.x;
    let futureY = v.pos.y + 2 * v.vel.y;



    for (let r = 0; r < rects.length; r++) {
      if (rects[r].contains(futureX, futureY)) {
        v.isActive = false;
        // console.log(v);
      }
    }


    if (dist(futureX, futureY, goal.x, goal.y) < goal.r) {
      endGen = true;
      v.isActive = false;
      v.hitBonus = 100;
    }

    if (futureX < 0 || futureX > width || futureY < 0 || futureY > height) {
      v.isActive = false;
    }



    if (v.isActive) {
      v.steerField();
      v.update();
      v.minDist = Math.min(v.minDist, goal.distTo(v));

      // v.recordDist(goal.distTo(v));
    }

  }

  //  removeInactives();
  count += 1;
  if (endGen || count === frameLimit || activeCount() === 0) {


    genCount++;
    genP.html("Generation: " + genCount);

    
    
    let p = new Pool(vehicles);
    pool = p;
  
    lastLead = p.leader();
    leaders.push(lastLead);
    
    
    pathPic = drawPath(p.leader(), count+1);
    pathCollection.push(pathPic);
    
    
    
    //image(pathPic,0,0);
    vehicles = nextGen(p);

    count = 0;
    
   
  // noLoop();
  }
}