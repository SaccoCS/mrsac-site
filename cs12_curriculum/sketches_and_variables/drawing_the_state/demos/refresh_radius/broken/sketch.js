


function setup() {
  createCanvas(150, 150);
  frameRate(30);
 
  
}

function draw() {
  background(0);
  fill(222,0,0);
  
  var size = random(10,70);
  ellipse(width/2,height/2,size);
}