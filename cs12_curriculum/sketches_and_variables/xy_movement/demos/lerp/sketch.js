let x,y,destX,destY;

function setup() {
  createCanvas(300, 200);
  ellipseMode(RADIUS);
  
  x = 40;
  y = 120;
  // destX = 210;
  // destY = 80;
}

function draw() {
  background(0);
  strokeWeight(4);
  stroke(222,0,99);
  
  //Draw both circles
  noFill();  
  if(destX)
  circle(destX, destY, 25);
  else{
    textAlign(CENTER,CENTER);
    textSize(40)
    noStroke();
    fill(255)
    text("Click to Lerp",150,100)
  }
  
  fill(222,0,99);
  circle(x,y,15);
  
  //ToDo: Lerp (x,y) toward (destX, destY)
  if( destX){
  x = lerp(x,destX,0.1);
  y = lerp(y,destY,0.1);
  }
}


//Teleport the destination circle to the mouse
function mousePressed(){
  destX = mouseX;
  destY = mouseY;
}