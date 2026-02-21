function setup() {
  createCanvas(256, 128);
  ellipseMode(RADIUS);
  noStroke();
  let gap = 16; 
  circs=[];
  for(let x = gap/2; x<width; x+= gap)
  for(let y = gap/2; y<height; y+= gap){
  
    circs.push(new C(x,y))
  }
  
}

function draw() {
  background(0);
 for(let c of circs){
   c.paint();
 }
}

class C{
  constructor(x,y){this.x = x; this.y = y;}
  paint(){
    stroke(255)
    let v = new p5.Vector(mouseX-this.x,mouseY-this.y);
    v.setMag(12);
    line(this.x,this.y, this.x+v.x,this.y+v.y)
    
  }
}