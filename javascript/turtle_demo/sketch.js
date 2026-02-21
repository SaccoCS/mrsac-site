let dir,loc;
function setup() {
  createCanvas(480, 480);
  loc = createVector(30,240);
  list = [loc.copy()];
  dir = createVector(30,0);
 rotAngle = PI/2;
  
  createButton("move").mousePressed(()=>{
    loc.add(dir);
    list.push(loc.copy());
  });
  createButton("turnLeft").mousePressed(()=>{
   dir.rotate(-rotAngle)
  });
  createButton("turnRight").mousePressed(()=>{
   dir.rotate(rotAngle)
  });
  
  createButton("reset").mousePressed(()=>{
   loc = createVector(30,240);
  list = [loc.copy()];
  dir = createVector(30,0);
  });
  
  sel = createSelect();
  sel.option(30)
  sel.option(45)
  sel.option(60)
  sel.option(90)
  sel.option(144)
  sel.selected(90);
  
  sel.style("width","60px")
  
  sel.changed(()=>{
    rotAngle = radians(sel.selected());
    
  });
  
  
  
}

function draw() {
  background(0);
  
  beginShape();
  for(let p of list){
    vertex(p.x,p.y);
  }
  noFill();
  stroke(255);
  endShape();
  fill(255);
  stroke(0);
  
  push()
  translate(loc.x,loc.y);
  rotate(dir.heading())
  triangle(-5,-6,-5,6,10,0);
  pop();
}