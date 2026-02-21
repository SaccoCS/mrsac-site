function setup() {
  createCanvas(150, 150);
}

function draw() {
  scale(0.5);
  background(220);
  
  //Variables representing the circle
  var angle = frameCount;
  var radius = 1;
  
  
  //Point Calculation
  var x = radius*cos(angle);
  var y = radius*sin(angle);
  
  //Draw Circle
  fill(255);
  circle(x,y,20);
}