let x = 20;
function setup() {
  createCanvas(340, 40);
  rectMode(CENTER);
  frameRate(5);
  background(0);
  
}

function draw() {
    //Replace with a number pattern
    square(x,20,20);
  x+=30
    
  
}

function mousePressed(){
  
 
  background(0);
   x=20;
}