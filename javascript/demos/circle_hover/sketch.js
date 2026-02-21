function setup() {
  createCanvas(300, 300);
  ellipseMode(RADIUS);
}

function draw() {
  background(0);
  noStroke();
  fill(22);
  rect(50,50,200,200);
  
  strokeWeight(5);
  stroke(255);

  //calculate the distance from the mouse to the center (150,150);
  var distToCenter = dist(mouseX, mouseY, 150, 150);
  
  //pick a fill for the circle
  if( floor(distToCenter/100) == 0)
    fill(255);
  else
    noFill();  

  
  //draw a circle, radius 100
  circle(150, 150, 100);
  circle(150,150,1);
  
  //display the distance from center.
  noStroke();
  fill(255);
  text("Distance: "+distToCenter,10,20);
  noFill();
}