var mX, mY;

function setup() {
  createCanvas(401, 401);
  textAlign(CENTER);
  strokeWeight(2)
  textSize(12);
  mX = mY = 0;
}

function draw() {
  
  //translate(30, 30);
  background(0);


  var x = 100 * floor((mX) / 100);
  var y = 100 * floor((mY) / 100);
  fill(255,90);
  rect(x, y, 100, 100);
  grid();
  
  fill(255);
  noStroke();

  ellipse(mX,mY,8);
  text("(" + mX + "," + mY + ")", mX, mY - 9);

  
 // ellipse(x,y,8);
  text("Row:" + (y/100) + ", Col: " + x/100, x+50, y + 20);
}

function grid() {
  for (let x = 0; x <= 400; x += 100) {
    stroke(255);
    
    line(x, 0, x, 400);
    line(0, x, 400, x);
  }
}

function mouseText() {
  text("(" + mX + "," + mY + ")", mX, mY - 5);
}

function mouseMoved() {
  if (mouseX >= 0 && mouseX < 400 && mouseY >= 0 && mouseY < 400) {
    mX = mouseX - 0;
    mY = mouseY - 0;
  }
}

function mouseDragged(){
  mouseMoved();
}