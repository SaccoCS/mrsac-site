function setup() {
  createCanvas(360, 180);
  ellipseMode(RADIUS);
  angleMode(DEGREES);
  
  circs = [];
  let gap = 30
  for(let x = gap/2; x<width; x+= gap)
  for(let y = gap/2; y<height; y+= gap){
    circs.push(new Circ(x,y));
  }
  
 
}

function draw() {
  background(0);
  stroke(255,0,99);
  fill(255,0,99);
  noStroke();
  strokeWeight(2);
  
  for(let c of circs){
    c.paint();     
  }
}