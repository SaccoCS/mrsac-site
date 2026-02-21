var x1,y1,x2,y2,x3,y3;

function setup() {
  createCanvas(150, 150);
  frameRate(30);
  randomize();
  
  b = createButton("Run Sketch Again");
  b.mousePressed(randomize);
  
  b.style('margin-top','10px');
}

function randomize(){
  
  x1 = random(width);
  x2 = random(width);
  x3 = random(width);
  
  y1 = random(height);
  y2 = random(height);
  y3 = random(height);
}

function draw() {
  background(0);
  fill(222,0,0);
  triangle(x1,y1,x2,y2,x3,y3);
}