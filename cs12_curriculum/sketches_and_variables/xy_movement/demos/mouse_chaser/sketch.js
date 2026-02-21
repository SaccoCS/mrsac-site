let x,y

function setup() {
  createCanvas(300, 200);
  ellipseMode(RADIUS);
  x = 150;
  y = 100;
}

function draw() {
  background("#63C5DA");
  strokeWeight(3)
  circle(x,y,8)
  
  let distance = dist(x,y,mouseX,mouseY);
  let dX = mouseX-x;
  let dY = mouseY - y;
  
  dX/=distance;
  dY /= distance;
  
  x += dX;
  y += dY;
  
  if(distance>15)
  line(x,y,x+15*dX,y + 15*dY)
  else
    line(x,y,mouseX,mouseY);
}