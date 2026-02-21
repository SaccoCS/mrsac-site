function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  hoverCircle(150, 90, 150);
  hoverCircle(350,120,75);
  hoverCircle(250,240,280);
  hoverCircle(100,290,180);
  hoverCircle(170,365,50);
}

//Draws an Oval at the given x,y location with a diameter of diam
//The color should be different if the mouseX and mouseY are contained within the circle.
function hoverCircle(x, y, diam) {
  var d = dist(mouseX, mouseY, x, y);
  
  strokeWeight(3);
  if( d < diam/2)
    fill(255,0,0);
  else
    fill(255);
  ellipse(x,y,diam);

}