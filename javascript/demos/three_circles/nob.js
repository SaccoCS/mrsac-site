function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  noFill();
  
  stroke(222,0,0);
  drawCircle(100,100);
  
  
  stroke(0,0,222);
  drawCircle(300,100);
  
  
  stroke(0,222,0);
  drawCircle(200,100+100*sqrt(3));
}

function drawCircle(x,y){
  strokeWeight(3);
  ellipse(x,y,3,3);
 var d = dist(mouseX,mouseY,x,y);
  ellipse(x,y,2*d);
}