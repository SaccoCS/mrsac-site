function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(136,225,243);
  angleMode(DEGREES); 
  strokeWeight(3);
  

// translate(5,5);
  s(100,100,frameCount); 
  s(100,0,frameCount);
  s(100,0,frameCount);
}

function s(x,y,a){
 //push();
  translate(x,y);
  rotate(a);
  smiley();
  //();
}

function smiley(){  
  
  //draw head
  fill(255,255,0);
  ellipse(0,0,75,75);

  //draw eyes
  fill(0);
  ellipse(12,-13,10,25);
  ellipse(-13,-13,10,25);

  //draw smile
  noFill(); 
  arc(0,-4,62,62,20,160);
  
  //Draw Center
  fill(255,0,0);
 // ellipse(0,0,3);
  
  
}

function mark(){
  push();
  strokeWeight(3);
 stroke(255,0,0);
  line(0,0,0,100);  //Red = +Y
  
  stroke(0,0,255);
  line(0,0,100,0);  //Blue = +X
  
  stroke(0,255,0);
  fill(0,255,0);
  ellipse(0,0,5);
  
  translate(20,20);
  noStroke();
  fill(255);
  rect(0,0,40,40);
  pop();
}