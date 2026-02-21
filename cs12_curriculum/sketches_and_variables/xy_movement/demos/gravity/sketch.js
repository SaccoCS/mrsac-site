let x,y,ySpeed;

function setup() {
  createCanvas(50, 350/2);
  ellipseMode(RADIUS);
  strokeWeight(3)
  
  x = 50;
  y = 0;
  
  ySpeed = 1;
  
}

function draw() {
  scale(0.5)
  background(220);
  
  circle(x,y,10)
  
  y += ySpeed;
  
  ySpeed += 0.5
 
  
  if( y > 2*height-10){
    y = 2*height-10;
    ySpeed *= -0.9;
    
    if(abs(ySpeed) <5){
       
  x = width/2;
  y = 0;
  
  ySpeed = 0;
    }
  }
  
  
}


function mousePressed(){
  x = mouseX;
  y = mouseY;
  ySpeed = 0;
}