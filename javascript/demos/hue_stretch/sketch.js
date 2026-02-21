function setup() {
  createCanvas(610, 94);
}

function draw() {
  translate(25,0);
  noStroke();
  textSize(18);
  background(255);
  colorMode(HSB);  
  
  var x = constrain(mouseX-25,0,550);
  var h = map(x,0,549,0,359);
  
  fill(h,255,255);
  rect(0,0,550,64);
  
  
  stroke(255);
  strokeWeight(5);
  line(x,0,x,200);
  
  textAlign(CENTER,TOP);
  stroke(h,255,255);
  noStroke();
 // noFill();
  text('Hue:'+int(h),x,70);
}