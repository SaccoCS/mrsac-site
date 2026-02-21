var x;

function setup() {
  createCanvas(400, 200);
  frameRate(15);
  strokeWeight(3);
  background(0);

  //Initial Value For x
  x = 400;
}

function draw() {

  //Use current x to draw
  stroke(random(256), random(256), random(256));
  line(x, 50, x, 150);

  //Change x a little bit for next time
  x = x - 1;
}

function mousePressed(){
  
 
  background(0);
   x = 400;
}