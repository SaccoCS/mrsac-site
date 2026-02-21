function setup() {
  createCanvas(250, 250);
  pts = [];
  for(let i =0; i<360; i++){
     let x = 125 + 100*cos(radians(i));
    let y = 125 + 100*sin(radians(i));
    pts.push(new p5.Vector(x,y));
  }
  background(0);
}

function draw() {
  strokeWeight(3);
  stroke(random(255),random(255),random(255))
  
  let pt1 = random(pts);
  let pt2 = random(pts);
  line(pt1.x,pt1.y,pt2.x,pt2.y);
  
}