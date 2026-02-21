var x, y, xSpeed, ySpeed, p1Y, p2Y, p1Speed, p2Speed;
var p1Score, p2Score;

var delay = 30;

function setup() {
  frameRate(60);
  createCanvas(640, 400);
  rectMode(CENTER);

  x = 500;
  y = height/2//random(150,height-150);
  xSpeed = -5;
  ySpeed = 3;

  p1Y = height/2
  p2Y = height/2
  p1Speed = 0;
  p2Speed = 0;

  p1Score = 0;
  p2Score = 0;

}

function draw() {
scale(.5);
  
  //Draw Everything
  background(0);
  drawBall();
  drawPaddle1();
  drawPaddle2();
  drawScores();


  
  
  //Update Variables
  moveBall();
  movePaddles();
  wallBounce();  
  bouncePaddle1();
  bouncePaddle2();
}

function drawScores() {
  textAlign(CENTER, CENTER);
  textSize(24);
  textFont('"Press Start 2P", cursive');
  text(p1Score, 180, 50);
  text(p2Score, 460, 50);
}

function movePaddles() {
  p1Y += p1Speed;
  p1Y = max(40,min(p1Y,height-40));
  
  p2Y += p2Speed;
  
  p2Y = max(40,min(p2Y,height-40));
}

function bouncePaddle1() {
  if (boxOverlap(x, y, 16, 16, 50, p1Y, 16, 80) && xSpeed < 0) {
    xSpeed *= -1;
  }
}

function bouncePaddle2() {
  if (boxOverlap(x, y, 16, 16, width - 50, p2Y, 16, 80) && xSpeed > 0) {
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
  rect(width - 50, p2Y, 16, 80);
}

function wallBounce() {


  if (x > width - 8)
  {
    p1Score++;
    x = 150;
    y = height/2;
    xSpeed = 4
    ySpeed = random(-4,4);
    delay = 30;
    //xSpeed *= -1;
  }

  if (y > height - 8)
    ySpeed *= -1;

  if (x < 8)
  {
    p2Score++;
    x = width -150;
    y = height/2;
    xSpeed = -4;
    
    ySpeed = random(-4,4);
    delay = 30;
  }

  if (y < 8)
    ySpeed *= -1;
}

function mousePressed() {

//  x = mouseX;
 // y = mouseY;

}

function moveBall() {
  
  if(delay>0)
  {
    delay--;
    return;
    
  }
  
  
  x += xSpeed;
  y += ySpeed;
}

function drawBall() {
  noStroke();
  fill(255);
  rect(x, y, 16, 16);

}

function keyPressed() {
  if (keyCode == UP_ARROW)
    p2Speed = -4;

  if (key == 'w')
    p1Speed = -4;

  if (keyCode == DOWN_ARROW)
    p2Speed = 4;

  if (key == 's')
    p1Speed = 4;
  
  if(key == 'r')
    {
      p2Score = p1Score = 0;
    }


}

function keyReleased() {
  if (keyCode == UP_ARROW && p2Speed < 0)
    p2Speed = 0;
  if (keyCode == DOWN_ARROW && p2Speed > 0)
    p2Speed = 0;

  if (key == 'w' && p1Speed < 0)
    p1Speed = 0;
  
  if (key == 's' && p1Speed > 0)
    p1Speed = 0;



}