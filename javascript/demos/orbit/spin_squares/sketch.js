function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  stroke(255);
  rectMode(CENTER);
  angleMode(DEGREES);

  //go to center and draw a circle
  translate(width / 2, height / 2);
  ellipse(0, 0, 60);

  push(); //save center location/rotation
  
     stroke(255);
  noFill();
     
     rotate(frameCount); //rotate to ball1's rotation
     translate(0, -50); //move to circle's relative location
  fill(255);
  rotate(2*frameCount);
     rect(0, 0, 20,20); //draw circle at current location
  pop(); //reset to center

  push(); //save center location/rotation
     rotate(-frameCount) //rotate to ball2's rotation
     translate(0, -70); 
  rotate(-2*frameCount);
   rect(0, 0, 20,20); //draw circle at current  current location
  pop(); //reset to center

  push(); //save center location/rotation
     rotate(frameCount); //rotate to ball3's rotation
     translate(0, -90);
  rotate(2*frameCount); 
  rect(0, 0, 20,20); //draw circle at current  circle at current location
  pop(); //reset to center
  
  

  push(); //save center location/rotation
     rotate(-frameCount); //rotate to ball3's rotation
     translate(0, -110);
  rotate(-2*frameCount);
  rect(0, 0, 20,20); //draw circle at current ion
  pop(); //reset to center
  

  push(); //save center location/rotation
     rotate(frameCount); //rotate to ball3's rotation
     translate(0, -130);
  rotate(2*frameCount);
  rect(0, 0, 20,20); //draw circle at current w circle at current location
  pop(); //reset to center

  push(); //save center location/rotation
     rotate(-frameCount); //rotate to ball3's rotation
     translate(0, -150);
  rotate(-2*frameCount);
  rect(0, 0, 20,20); //draw circle at current /draw circle at current location
  pop(); //reset to center
  

  push(); //save center location/rotation
     rotate(frameCount); //rotate to ball3's rotation
     translate(0, -170); 
  rotate(2*frameCount);
  rect(0, 0, 20,20); //draw circle at current aw circle at current location
  pop(); //reset to center
  

  push(); //save center location/rotation
     rotate(-frameCount); //rotate to ball3's rotation
     translate(0, -190); 
  rotate(-2*frameCount);
  rect(0, 0, 20,20); //draw circle at current aw circle at current location
  pop(); //reset to center
  
  push();
  noFill();
  for(var i = 50; i<=190;i+=20){
  //ellipse(0,0,i*2);
  }
  
  
  pop();
}