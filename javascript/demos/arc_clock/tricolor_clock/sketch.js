function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(255);
  angleMode(DEGREES);
  strokeWeight(10);
  var s = second();
  var angle = map(s,0,59,-90,270);
  stroke(255,0,0);
  arc(width/2,height/2,width*0.9,height*0.9,-90,angle);
  
  noFill();
  var m = minute();
	angle = map(m,0,59,-90,270);
  
  stroke(0,200,0);
  arc(width/2,height/2,width*0.7,height*0.7,270,angle	);
  
  
  var h = hour();
	angle = map(h%12,0,12,-90,270);
 
  stroke(0,0,200);
  arc(width/2,height/2,width*0.5,height*0.5,270,angle	);
  
}