let x = 0;

function setup() {
  createCanvas(400, 200);
  frameRate(15);
  strokeWeight(3);
  background(0);

 
}

function draw() {
    
    
    stroke(random(256),random(256),random(256));
    line(x, 50, x, 150);
    
    x++;
}

function mousePressed(){
  x=0;
  background(0);
}