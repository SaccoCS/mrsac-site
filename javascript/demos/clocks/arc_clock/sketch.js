function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(255);
  angleMode(DEGREES);
  noStroke();
  var s = second();
  var angle = map(s,0,60,-90,270);
  stroke(255,0,0);
  noFill();
  strokeWeight(15)
  
  arc(width/2,height/2,width*0.9,height*0.9,-90,angle);
  
  
  var m = minute();
	angle = map(m,0,60,-90,270);
  
  stroke(0,200,0);
  arc(width/2,height/2,width*0.7,height*0.7,-90,angle);
  
  
  var h = hour();
  if(h>12) h-=12;
  
	angle = map(h,0,13,-90,270);
 
  stroke(0,0,200);
  arc(width/2,height/2,width*0.5,height*0.5,-90,angle);
}