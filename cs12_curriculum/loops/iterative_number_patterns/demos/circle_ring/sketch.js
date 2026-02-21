var rad=100;

function setup() {
  createCanvas(256, 256);
  rectMode(CORNER);
  background(0);
  
}

function draw() {
  if( rad < 200 ){
    
    strokeWeight(2);
    stroke(255);
    noFill();
    ellipse(width/2,height/2,rad);
   
    rad++;
  }
}



function mousePressed(){
  
 
  background(0);
   rad=100;
}