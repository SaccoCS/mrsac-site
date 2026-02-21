var h;
function setup() {
  createCanvas(200, 200);
  colorMode(HSB);
  h = 1;
}

function draw() {
  background(220);
  
  fill(h,255,255);
  strokeWeight(4);
  ellipse(width/2,height/2,180);
  
  h++;
  
  if( h > 360)
    h=0;
}