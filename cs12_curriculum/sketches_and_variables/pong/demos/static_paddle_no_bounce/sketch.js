var x, y, xSpeed, ySpeed, p1Y, p2Y,p1Speed,p2Speed;

function setup() {
  createCanvas(320, 200);
  rectMode(CENTER);

  x = width ;
  y = height 

  p1Y = y;
  p2Y = y;
  p1Speed = 0;
  p2Speed = 0;

  xSpeed = random(3, 4);
  ySpeed = random(-4, 4);
}

function draw() {
  scale(.5);
  //Draw Everything
  background(0);
  drawBall();
  drawPaddle1();
  drawPaddle2();


  //Update Variables
  moveBall();
 // movePaddles();
  wallBounce();
 // bouncePaddle1();
 // bouncePaddle2();
}

function movePaddles() {
  p1Y += p1Speed;
  p2Y += p2Speed;
}

function bouncePaddle1() {
  if (boxOverlap(x, y, 16, 16, 50, p1Y, 16, 80) && xSpeed < 0) {
    xSpeed *= -1;
  }
}

function bouncePaddle2() {
  if (boxOverlap(x, y, 16, 16, 640 - 50, p2Y, 16, 80) && xSpeed > 0) {
    xSpeed *= -1;
  }
}

function boxOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (x1 + w1 / 2 < x2 - w2 / 2)
    return false;
  if (x2 + w2 / 2 < x1 - w1 / 2)
    return false;
  if (y1 + h1 / 2 < y2 - h2 / 2)
    return false;
  if (y2 + h2 / 2 < y1 - h1 / 2)
    return false;

  return true;
}

function drawPaddle1() {
  noStroke();
  fill(255);
  rect(50, p1Y, 16, 80);
}

function drawPaddle2() {
  noStroke();
  fill(255);
  rect(640 - 50, p2Y, 16, 80);
}

function wallBounce() {
  if (x > 640 - 8)
    xSpeed *= -1;

  if (y > 400 - 8)
    ySpeed *= -1;

  if (x < 8)
    xSpeed *= -1;

  if (y < 8)
    ySpeed *= -1;
}

function mousePressed() {
  return;
  x = mouseX;
  y = mouseY;
  xSpeed = -4;
  ySpeed = 0;
}

function moveBall() {
  x += xSpeed;
  y += ySpeed;
}

function drawBall() {
  noStroke();
  fill(255);
  rect(x, y, 16, 16);

}

function keyPressed(){
 if( keyCode == UP_ARROW)
   p2Speed = -3;
  
 if( key == 'w')
   p1Speed = -3;
  
 if( keyCode == DOWN_ARROW)
   p2Speed = 3;
  
 if( key == 's')
   p1Speed = 3;
  
}

function keyReleased(){
 if( keyCode == UP_ARROW || keyCode == DOWN_ARROW )
   p2Speed = 0;
  
  if( key == 'w'||key == 's')
   p1Speed = 0;
  
}
