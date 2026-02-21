function setup() {
  createCanvas(200, 150);
}

function draw() {
  scale(.5);
  constrainMouse();
  background(255);
  noFill();
  strokeWeight(4);
  rect(0, 0, 400, 300)

  drawRect(30, 30, 80, 130);
  drawRect(120, 200, 200, 75)
  drawRect(200, 50, 120, 100);


  fill(0);
  circle(mouseX*2, mouseY*2, 20);  
}

function constrainMouse(){
  mouseX = constrain(mouseX, 0, width);
  mouseY = constrain(mouseY, 0, height);  
}

function drawRect(x,y,w,h){
  fill(255);
  rect(x,y,w,h);
  let x1 = map(mouseX,0,width,x,x+w);  
  let y1 = map(mouseY,0,height,y,y+h);
  fill(0);
  ellipse(x1,y1,10);
  
}