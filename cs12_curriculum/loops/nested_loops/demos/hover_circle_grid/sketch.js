function setup() {
  createCanvas(330, 120);
  ellipseMode(RADIUS);
  circs = [];
  let gap = 30;
  for(let x = gap/2; x<width; x += gap)
    for(let y = gap/2; y<height; y += gap){
      circs.push(new Circ(x,y))
    }
}

function draw() {
  background(0);
      stroke(255);
  strokeWeight(3);
  
  for(let c of circs){
    c.paint();
  }
  
}

class Circ{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  paint(){
    let d = dist(mouseX,mouseY,this.x,this.y);
      if( d < 10)
        fill(255,0,99);
      else
        fill(0)
      circle(this.x,this.y,10)
  }
}