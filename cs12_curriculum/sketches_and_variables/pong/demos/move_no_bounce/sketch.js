var x, y, xSpeed, ySpeed;

function setup() {
  createCanvas(320, 200);
  rectMode(CENTER);
  
  x = width/2;
  y = height/2
  
 // xSpeed = random(-4,4);
 // ySpeed = random(-4,4);
  
  while( !ySpeed || abs(xSpeed)<2){    
  xSpeed = random(-4,4);
  ySpeed = random(-4,4);
  }
}

function draw() {
  scale(.5);
  //Draw Everything
  background(0);
  drawBall();
  //drawPaddle1();
 // drawPaddle2();

  
  //Update Variables
  moveBall();  
 // wallBounce();  
 // bouncePaddle1();
}

function bouncePaddle1(){
  
}

function drawPaddle1(){
  noStroke();
  fill(255);
  rect(50,200,16,80);
}

function drawPaddle2(){
  noStroke();
  fill(255);
  rect(width - 50,200,16,80);
}

function wallBounce(){
 if( x > width - 8)
   xSpeed *= -1;
  
 if( y > height - 8)
   ySpeed *= -1;
  
 if( x <  8)
   xSpeed *= -1;
  
 if(  y <  8)
   ySpeed *= -1;
}

function mousePressed(){
  x = mouseX*2;
  y = mouseY*2
  xSpeed = false;
 while( !xSpeed || abs(xSpeed)<2){    
  xSpeed = random(-4,4);
  ySpeed = random(-4,4);
  }
}

function moveBall(){
  x += xSpeed;
  y += ySpeed;
}

function drawBall() {
  noStroke();
  fill(255);
  rect(x, y, 16,16);

}