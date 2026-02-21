function setup() {
  createCanvas(300, 300);
  angleMode(DEGREES);
  noStroke();
  background(0);
  
   pts = [];
  for(let a = 0; a<360*10; a++){
    let nX = 150 + .4*cos(a);
    let nY = 150 + .4*sin(a);
    
    let angle = a;
    let n = noise(nX,nY,0.1*floor(a/360));
    let radius = map(n,0.2,0.8,30,140)
    let x = 150 + radius*cos(angle);
    let y = 150 + radius*sin(angle);
    
     pts.push(createVector(x,y));
    
  }
}

function draw() {
  background(0,12);
  let angle = frameCount;
 
  
  let p = pts[angle%(360*10)];
  let x = p.x;
  let y = p.y;
  
  fill(255,0,99);
  circle(x,y,10)
}