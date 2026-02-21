let angle;

function setup() {
    createCanvas(200, 200);
    angleMode(DEGREES);
    strokeWeight(2);
    stroke(255,255,0);
    background(0);
    
    angle = 0;
}

function draw() {
    
    //draw one line
    translate(100,100);
    rotate(angle);
    line(0,0,80,0);
    
    angle++;
    
}

function mousePressed(){
  
 
  background(0);
   angle = 0;
}