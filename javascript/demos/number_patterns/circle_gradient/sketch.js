var x;
var colorVal;

function setup() {
  createCanvas(256, 256);
  rectMode(CORNER);
  //frameRate(45);
  background(0);

  //Initialize Variables
  x=0;
  colorVal = 255;
}

function draw() {

  if( x < 256 ){
noFill();
    strokeWeight(2);
    stroke(0,colorVal,0);
    //line(x,20,x,60);   
    ellipse(width/2,height/2,x);

    //x location increases
    x+=1;

    //Color value decreases
    colorVal--;
  }
}
function mousePressed(){
  
   background(0);
  x=0;
  colorVal = 255;
}