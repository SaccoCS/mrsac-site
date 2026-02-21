function setup() {
  createCanvas(375, 225);
  ellipseMode(RADIUS);
  noStroke();
  let gap = 15; 
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
    let d = dist(this.x,this.y,mouseX,mouseY);
    let r = 250/d;
    
     r = min(r,7)
    circle(this.x,this.y,r);
    
  }
}