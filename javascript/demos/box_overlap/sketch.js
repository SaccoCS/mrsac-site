function setup() {
  createCanvas(240, 300);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(12);
 // noSmooth();
  
}

function draw() {
  background(255);
  strokeWeight(1);

  //fill box 1 red when boxesOverlap
  if (boxOverlap(mouseX, mouseY, 40, 106, width / 2, height / 2,  76, 50))
    fill(222, 0, 0);
  else
    noFill();
  rect(width / 2, height / 2, 76, 50);
  fill(0);
  text(2, width / 2, height / 2);


  //draw box 2, never filled
  noFill();
  rect(mouseX, mouseY, 40, 106);
  fill(0);
  text(1, mouseX, mouseY);
}

//returns true if box1 overlaps box2
function boxOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
  if(x1+w1/2<x2-w2/2)
    return false;
  if(x1-w1/2>x2+w2/2)
    return false;
  if(y1+h1/2<y2-h2/2)
    return false;
  if(y1-h1/2>y2+h2/2)
    return false;
  return true;
}