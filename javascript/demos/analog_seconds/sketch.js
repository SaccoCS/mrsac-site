function setup() {
  createCanvas(250, 250);
  pts = [];
  for(let i =0; i<360; i+= 6){
     let x = 125 + 100*cos(radians(i-90));
    let y = 125 + 100*sin(radians(i-90));
    pts.push(new p5.Vector(x,y));
  }
  
  textAlign(CENTER,CENTER);
  textSize(22);
  textFont('monospace')
}

function draw() {
  background(0);
 strokeWeight(2);
  ellipseMode(RADIUS);
  noFill();
  stroke(255);
  circle(125,125,100);
  
  let p = pts[floor(second())];
  
  console.log(pts)
  fill(0);
  circle(p.x,p.y,20)
  noStroke()
  fill(255);
  text(second(), p.x, p.y);
}