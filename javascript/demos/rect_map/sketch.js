function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  textAlign(CENTER,CENTER);
  rect(20,20,150,100);
  
  strokeWeight(3);
  var x = constrain(mouseX,30,160);
  var y = constrain(mouseY,30,110);
  fill(222,0,0);
  ellipse(x,y,20);
  
  
  fill(222,0,0);
  rect(50,150,280,200);
  
  var x2 = map(x,30,160,60,320);
  var y2 = map(y,30,110,160,340);
  ellipse(x2,y2,20,20);
}