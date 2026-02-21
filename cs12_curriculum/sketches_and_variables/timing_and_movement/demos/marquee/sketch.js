var x;
function setup() {
  createCanvas(400, 80);
  textAlign(CENTER,CENTER);
  textSize(48);
  x = 0;
}

function draw() {
  background(0);
  fill(222,0,0);
  //noFill();
  stroke(255)
  strokeWeight(1)
  noStroke();
  text("Hello World",x,height/2)
  x += 3;
  
  if( x > width + 148)
    x = - 149
}