function setup() {
  createCanvas(500, 300);
}

function draw() {
  background(0);
  strokeWeight(5);
  
  
  rectMode(CENTER);
  rect(width/2,height/2,300,200);
  
  
  //strokeWeight(2);
  var x = constrain(mouseX,width/2-125,width/2+125);
  var y = constrain(mouseY,height/2-75,height/2+75);
  ellipse(x,y,50,50);
}