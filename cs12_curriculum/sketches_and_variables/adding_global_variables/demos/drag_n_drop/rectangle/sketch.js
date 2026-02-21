var x, y;

function setup() {
  createCanvas(400, 300);
  strokeWeight(5);
  rectMode(CENTER);
  x = 200;
  y = 150;
  dragMode = false
}

function draw() {
  background(220);
  if( dragMode ){
    x = mouseX;
    y = mouseY
  }
  rect(x,y,50,90)
}

//This function is called in response to a mouse button is pressed
function mousePressed() {
  if( mouseX>x-25 && mouseX<x+25 && mouseY < y +45 && mouseY > y -45)
    dragMode = true;


}

//This function is called in response to a mouse button is release
function mouseReleased() {
dragMode = false;
}

