var x, y;
var dir;

function setup() {
  createCanvas(200, 200);
  rectMode(CENTER);
  x = width / 2;
  y = height / 2;

dir = "E";
}

function draw() {
  background(99);
  rect(x, y, 30, 30);


  if( dir == "N")
    y -=1;
  if( dir == "S")
    y +=1;
  if( dir == "E")
    x +=1;
  if( dir == "W")
    x -=1;
  

  
  x = constrain(x,15,width-16);
  y = constrain(y,15,height-16);

}


//Called for every mouse click
function mousePressed() {
  x = mouseX;
  y = mouseY;
}

//Called for every key press
function keyPressed() {
if(key == "w")
  dir = "N";

if(key == "s")
  dir = "S";

if(key == "d")
  dir = "E";

if(key == "a")
  dir = "W";
}