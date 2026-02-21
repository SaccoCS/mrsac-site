function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(136, 225, 243);
  angleMode(DEGREES);
  
  fill(255,255,0);
  ellipse(150,150,300);
  eye(100,100);
  
  eye(200,100);
  fill(0);
  rectMode(CENTER);
  rect(150,210,150,30,10);
  
  
}


function eye(x,y){
  push();
  translate(x,y);
  
  fill(255);
  ellipse(0,0,90);
  
  fill(0);
  rotate(frameCount*5);
  //line(0,0,0,100);
  ellipse(30,0,20);
  pop();
}