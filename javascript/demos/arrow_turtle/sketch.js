function setup() {
can =  createCanvas(300, 300);
  p = createP("Use the arrow keys to make the turtle<br/>&nbsp;move(), turnLeft(), and turnRight()");
  p.elt.style = "margin:4px 2px;font-family:monospace;font-size:14px"
  moveBut = createButton("Move");
  moveBut.mousePressed(fwd);
  leftBut = createButton("Turn Left");
  leftBut.mousePressed(turnLeft);
  rightBut = createButton("Turn Right");
  rightBut.mousePressed(turnRight);
  resetBut = createButton("Reset");
  resetBut.style("margin-right:6px")
  resetBut.mousePressed(()=>{
    
  initTurtle();
  })
  
  
  angleSelect = createSelect();
  [45,10,30,60,72,90,120,144].forEach((v)=>{             
    angleSelect.option(v)
  }) 
  
  
  angleSelect.changed(()=>{
    turnAngle = angleSelect.value();
    angleSelect.elt.blur();
  })
  
  initTurtle();
}

function initTurtle(){
  points = [createVector(0,0)];
  dir = createVector(8,0);
  minX = minY = -24;
  maxX = maxY = 24;
  turnAngle = angleSelect.value();
}

function draw() {
  background(0);
  stroke(255);
  
  drawPath();
  drawTurtle();
}

function fwd(){
  let lastPoint = points[points.length-1];
  let newPoint = p5.Vector.add(lastPoint,dir)
  points.push(newPoint);
  
  minX = min(minX,newPoint.x);
  minY = min(minY,newPoint.y);
  maxX = max(maxX,newPoint.x);
  maxY = max(maxY,newPoint.y);
  
  
}

function turnLeft(){
  dir.rotate(radians(-turnAngle));
}
function turnRight(){
  dir.rotate(radians(turnAngle));
}

function drawPath(){
  strokeWeight(2);
  
  points.forEach((p,i)=>{
    if(i==0)return;
    let last = points[i-1];
    
   
    p = pnt(p);
     last = pnt(last)
    
    line(p.x,p.y,last.x,last.y);
  })
  
}

function pnt(p){
  let dx = maxX-minX;
  let dy = maxY-minY;
  let xOff = 0;
  let yOff = 0;
 // let gap;
  if( dx > dy){
    gap = dx;
    yOff=-(dx-dy)/2;
  }else{
    gap = dy;
    xOff = -(dy-dx)/2;
  }
  
   // gap = max(gap,24)
  
//             p.x = map(p.x, minX + xOff, minX + xOff + gap, windowMin, windowMax);
//             p.y = map(p.y, minY + yOff, minY + yOff + gap, windowMin, windowMax);
  
  // if(mouseIsPressed){
  //   xOff = 0;
  //   yOff = 0;
  // }
  
  let x = map(p.x,minX + xOff, minX + xOff + gap,20,width-20);
  // if(dx == 0)
  //   x = width/2;
  let y = map(p.y,minY + yOff, minY + yOff + gap,20,height-20);
  // if(dy == 0)
  //   y = height/2;
  return createVector(x,y);
  
}

function drawTurtle(){
  let loc = points[points.length-1];
  loc = pnt(loc);
  
  // console.log(gap)
  push()
  translate(loc.x,loc.y);
 rotate((dir.heading()));
  beginShape();
  vertex(10,0);
  vertex(-5,-6);
  vertex(-5,6);
  endShape(CLOSE);
  pop();
  // circle(loc.x,loc.y,10);
}







function keyPressed(){
  if(keyCode == UP_ARROW){
    fwd();
  }
  if(keyCode == LEFT_ARROW){
    turnLeft();
  }
  if(keyCode == RIGHT_ARROW){
    turnRight();
  }
  if(key == "r"){
    initTurtle();
  }
  if(keyIsDown(CONTROL) && key == "z"&& points.length>0){
    points.pop();
  }
}