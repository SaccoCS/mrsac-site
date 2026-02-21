function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  strokeWeight(3);
  if(mouseX < 100)
    fill(200,0,0);
  else if(mouseX > 300)
    fill(200,0,0);
  else if(mouseY > 300)
    fill(200,0,0);
  else if(mouseY < 100)
    fill(200,0,0);
  else
    fill(0,200,200);
  rect(100,100,200,200);
}