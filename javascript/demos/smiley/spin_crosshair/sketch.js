function setup() {
  createCanvas(100, 100);
}

function draw() {
  background(136,225,243);
  angleMode(DEGREES); 

  translate(50,50);
  push();
  rotate(frameCount);  
  smiley();
  pop();
  
  line(-width/2,0,width/2,0);
  
  line(0,-height/2,0,height/2);
  
}

function smiley(){  

  strokeWeight(3); 
  //draw head
  fill(255,255,0);
  ellipse(0,0,75,75);

  //draw eyes
  fill(0);
  ellipse(12,-13,10,25);
  ellipse(-13,-13,10,25);

  //draw smile
  noFill();
  strokeWeight(3);  
  arc(0,-4,62,62,20,160);

  //Draw Center
  fill(255,0,0);
 // ellipse(0,0,3);
}