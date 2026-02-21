var x, y, xSpeed, ySpeed;

function setup() {
  createCanvas(200, 200);
  x = width / 2;
  y = height / 2;
  xSpeed = random(-5, 5);
  ySpeed = random(-5, 5);
}

function draw() {
  background(255);
  noFill();
 // rect(0,0,width-1,height-1);
  
fill(222,0,0);
  ellipse(x, y, 20);
  
  x += xSpeed;
  y += ySpeed;
  
  if( x > width-10)
    xSpeed = -xSpeed;
  if( x < 10)
    xSpeed = -xSpeed;
  
  if( y > height-10)
    ySpeed = -ySpeed;
  if( y < 10)
    ySpeed = -ySpeed;
  
  x = constrain(x, 10,width-10);
  y = constrain(y, 10,height-10);

}