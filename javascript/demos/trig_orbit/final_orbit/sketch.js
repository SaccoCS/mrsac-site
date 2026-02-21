function setup() {
  createCanvas(300/2, 300/2);
  angleMode(DEGREES);
}

function draw() {
  scale(0.5);
  background(220);
  
  //Variables representing the circle
  var angle = frameCount;
  
  var radius = 120;
  
  
  //Point Calculation
  var x = 150+radius*cos(angle);
  var y = 150+radius*sin(angle);
  
  //Draw Circle
  fill(255);
  circle(x,y,20);
}