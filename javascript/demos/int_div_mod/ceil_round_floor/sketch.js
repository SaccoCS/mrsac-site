var val = 0;
function setup() {
  createCanvas(185, 150);
  frameRate(2);
}

function draw() {
  background(255);
  textFont("Courier New");
  
  var x = val/10;
  textSize(24);
  text("x:"+(x),60,30);
  text("ceil(x):  "+ceil(x),10,75);
  text("round(x): "+round(x),10,100);
  text("floor(x): "+floor(x),10,125);
  
  val = (val+1)%9000
  
}

function mousePressed(){
 val =0; 
}