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
  

}

function mousePressed(){
   x = width / 2;
  y = height / 2;
  xSpeed = random(-5, 5);
  ySpeed = random(-5, 5);


}