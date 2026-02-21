function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(255);
  angleMode(DEGREES);
  var s = second();
  var angle = map(s,0,59,-90,270);
  noFill();
  stroke(0);
  ellipse(width/2,height/2,199);
  noStroke();
  
  
  fill(255,0,0);
  
  arc(width/2,height/2,width*0.9,height*0.9,angle-6,angle+6);
  
  
  var m = minute();
	angle = map(m,0,59,-90,270);
  
  fill(0,200,0);
  arc(width/2,height/2,width*0.7,height*0.7,angle-6,angle+6	);
  
  
  var h = hour();
	angle = map(h>12?h-12:h,0,12,-90,270);
 
  fill(0,0,200);
  arc(width/2,height/2,width*0.5,height*0.5,angle-6,angle+6	);
  
}