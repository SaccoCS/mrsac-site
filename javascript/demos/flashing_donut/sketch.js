function setup() {
  createCanvas(200, 200);
  strokeWeight(4);
  noSmooth();
  vals = [65,66,67,200,201,202];
}

function draw() {
 background(255);
  if(keyIsDown(vals[0])&& keyIsDown(vals[1])&& keyIsDown(vals[2]))
    fill(random(256),random(256),random(256))
  else
    fill(0);
  circle(width/2,height/2,width*.8);
  
  
    if(keyIsDown(vals[4])&& keyIsDown(vals[5])&& keyIsDown(vals[3]))
    fill(random(256),random(256),random(256))
  else
    fill(255);
  circle(width/2,height/2,width*.5)
  
}
