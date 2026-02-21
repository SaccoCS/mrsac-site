var m;

function setup() {
  createCanvas(200, 200);
  strokeWeight(3);
  stroke(255);
  fill(0);  
  m = [width,0,height,0];
}

function draw() {
  background(0);
  var x = noise(frameCount*0.003,15)*width;
  var y = noise(frameCount*0.003,85)*height;
  
  funfun(x,y);

  line(m[1], 0, m[1], height);
  line(0,m[3], height,  m[3]);
  
  line(m[0], 0, m[0], height);
  line(0,m[2], height,  m[2]);
  circle(x,y,20);
  
}
function mousePressed(){
  m = [width,0,height,0];
}

function funfun(x,y)
{
  
  if(m[3]<y)
    m[3] = y;
  if(m[1]<x)
    m[1] = x;
  if(m[2]>y)
    m[2] = y;
  if(m[0]>x)
    m[0] = x;
}