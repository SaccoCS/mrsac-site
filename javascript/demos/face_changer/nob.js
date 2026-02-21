function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(136,225,243);
  angleMode(DEGREES);

  
  fill(255,255,0);
  ellipse(200,200,300,300);
  
  fill(0);
  ellipse(150,150,40,100);
  ellipse(250,150,40,100);

  noFill();
  strokeWeight(3);
  if(!mouseIsPressed)
  arc(200,180,250,250,20,160);
    else
  arc(200,360,250,250,220,320);
  
  textSize(15);
  text(mouseX+" "+mouseY,5,20);
}