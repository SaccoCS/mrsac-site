var x, y;
var xSpeed,ySpeed;

function setup() {
  createCanvas(200, 200);
  rectMode(CENTER);
  
  x = random(15,width-15);  
y = random(15,height-15);
xSpeed = random(-1,1);
ySpeed = random(-1,1);
  


}

function draw() {
  background(99);
  rect(x, y, 30, 30);

  x += xSpeed;
  y += ySpeed;

  
  if( x > width -15)
    xSpeed = -1;
  
  if( y > height -15)
    ySpeed = -1;
  
  if( x <15)
    xSpeed = 1;
  
  if( y < 15)
    ySpeed = 1;
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