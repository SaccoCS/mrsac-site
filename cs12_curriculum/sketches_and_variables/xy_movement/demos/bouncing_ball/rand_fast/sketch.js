var x, y;
var xSpeed,ySpeed;

function setup() {
  createCanvas(200, 200);
  rectMode(CENTER);
  
  x = random(15,width-15);  
y = random(15,height-15);
xSpeed = random(-5,5);
ySpeed = random(-5,5);
  


}

function draw() {
  background(99);
  rect(x, y, 30, 30);

  x += xSpeed;
  y += ySpeed;

  
  if( x > width -15)
    xSpeed = -xSpeed;
  
  if( y > height -15)
    ySpeed = -ySpeed;
  
  if( x <15)
    xSpeed = -xSpeed;
  
  if( y < 15)
    ySpeed = -ySpeed;
}


//Called for every mouse click
function mousePressed() {
  x = random(15,width-15);  
y = random(15,height-15);
xSpeed = random(-1,1);
ySpeed = random(-1,1);
  
}

//Called for every key press
function keyPressed() {

}