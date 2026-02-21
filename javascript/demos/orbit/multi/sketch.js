function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  angleMode(DEGREES);
  
  translate(width/2,height/2);
  
  
  
  ellipse(0,0,60);
  rotate(frameCount);
  //ellipse(40,0,40);
  rotate(frameCount);
  ellipse(60,0,30);
  rotate(frameCount);
  ellipse(0,120,40);
  rotate(frameCount);
  ellipse(160,0,20);
  
  
}