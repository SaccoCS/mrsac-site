var x;

function setup() {
  createCanvas(400, 400);
  rectMode(CORNER);
  frameRate(5);
  background(0);
  x = 10
}

function draw() {
 if(x<=390){
   stroke(255);
   line(x,10,x,390);
   line(10,x,390,x);
   
  x += 10; 
 }
}

function mousePressed(){
  
   background(0);
  x = 10
}