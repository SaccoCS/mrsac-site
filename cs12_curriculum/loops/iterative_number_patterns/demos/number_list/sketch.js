var value;

function setup() {
  createCanvas(40, 210);
  textAlign(CENTER)
  frameRate(5);
  background(0);
  fill(255);
  textSize(18);
  value = 1;
  yPos = 20;
  
}

function draw() {
  if( value <= 10 ){
    
   text(value, 20,yPos);
    
    value++;
    yPos += 20;
  }
}

function mousePressed(){
  
   background(0);
  value = 2;
  yPos = 20;
}