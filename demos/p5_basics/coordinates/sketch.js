function setup() {
  createCanvas(170, 170);
}

function draw() {
  translate(10,10)
  background(240);
  fill(0)
  circle(0,0,5)
  strokeWeight(2);
  line(0,0,150,0);
  line(0,0,0,150);
  
  textAlign(CENTER,CENTER);
  text("(0,0)", 16,13);
  
  
  if( mouseX< 150 && mouseY < 150 && mouseX > 1 && mouseY > 1)
  text("("+mouseX+","+mouseY+")", mouseX, mouseY-15);
  
  
}