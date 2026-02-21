var size;
var opening;

function setup() {
  createCanvas(400, 400);
  size = 100;
  opening = false;
}

function draw() {
  background(0);
  
  ellipse(width/2,height/2,size);
  
  if(opening)
  size++;
  else
    size--;
  
  if( size < 0)
    opening = true;
  
  if( size > 350)
    opening = false;
}