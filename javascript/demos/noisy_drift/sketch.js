function setup() {
  createCanvas(200, 150);
}

function draw() {
  background(0);
  let x = getNoisy(0,width);
  let y = getNoisy(20,height);
  
  ellipse(x,y,20)
}

function getNoisy(v,s){
  return map(noise(frameCount*2*0.002,v),0,1,0,s);
}