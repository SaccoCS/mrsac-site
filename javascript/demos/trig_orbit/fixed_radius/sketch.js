function setup() {
  createCanvas(300/2, 300/2);
}

function draw() {
  scale(0.5);
  background(220);
  
  //Variables representing the circle
  var angle = frameCount;
  var radius = 120;
  
  
  //Point Calculation
  var x = radius*cos(angle);
  var y = radius*sin(angle);
  
  //Draw Circle
  fill(255);
  circle(x,y,20);
}