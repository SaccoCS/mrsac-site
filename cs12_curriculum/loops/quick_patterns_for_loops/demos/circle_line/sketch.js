var x;
function setup() {
  createCanvas(410, 50);
  textAlign(CENTER,CENTER)
  x = 25;
  background(220);
  frameRate(10)
}

function draw() {
  
 if( x <= 385 ){
    fill(255);
    circle(x,25,30)
  }
  
  
  x+=30;
}

function mousePressed(){
  x = 25;
  background(220);
}
