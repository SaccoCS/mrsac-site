var x;

function setup() {
  createCanvas(400, 80);
  rectMode(CORNER);
  frameRate(5);
  background(0);
  x = 20;
}

function draw() {
  if( x <= 360 ){
    var wid = random(1,60);
    rect(x,20,wid,40);
    x+=wid;
  }
}


function mousePressed(){
  
   background(0);
  x = 20
}