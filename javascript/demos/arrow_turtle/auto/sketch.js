function setup() {
can =  createCanvas(300, 300);

  
  functions = [hilbert,arrowhead,gosper,dragon,kochSnowflake]
  // p = createP("Use the arrow keys to make the turtle<br/>&nbsp;move(), turnLeft(), and turnRight()");
  // p.elt.style = "margin:4px 2px;font-family:monospace;font-size:14px"
  // moveBut = createButton("Move");
//   moveBut.mousePressed(fwd);
//   leftBut = createButton("Turn Left");
//   leftBut.mousePressed(turnLeft);
//   rightBut = createButton("Turn Right");
//   rightBut.mousePressed(turnRight);
//   resetBut = createButton("Reset");
//   resetBut.style("margin-right:6px")
//   resetBut.mousePressed(()=>{
    
//   initTurtle();
//   })
  
  
//   angleSelect = createSelect();
//   [45,10,30,60,72,90,120,144].forEach((v)=>{             
//     angleSelect.option(v)
//   }) 
  
  
//   angleSelect.changed(()=>{
//     turnAngle = angleSelect.value();
//     angleSelect.elt.blur();
//   })
  
  initTurtle();
  random(functions)();
  
  curIndex = 0;
  
}

function initTurtle(){
  points = [createVector(0,0)];
  dir = createVector(8,0);
  minX = minY = 0;
  maxX = maxY = 0;
  turnAngle = 45;//angleSelect.value();
}

function draw() {
  background(0);
  stroke(255);
  
  drawPath(floor(curIndex));
 drawTurtle(floor(curIndex));
  curIndex+=points.length*0.0015;
  
  
  if(curIndex>=points.length){
    initTurtle();
  random(functions)();
  
  curIndex = 0;
  }
  
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
  // console.log(turnAngle)
  dir.rotate(radians(turnAngle));
}

function drawPath(maxInd){
  if(maxInd == undefined)maxInd = points.length;
  strokeWeight(2);
  
  points.forEach((p,i)=>{
    if(i==0||i>maxInd)return;
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

function drawTurtle(maxInd){
  if(maxInd == undefined)maxInd =points.length-1;
  maxInd = constrain(maxInd, 0,points.length-1);
  let loc = points[maxInd];
  loc = pnt(loc);
  let head = 0;
  if(maxInd>0)
    {
      head = p5.Vector.sub(points[maxInd],points[maxInd-1]).heading();
    }
  
  // console.log(gap)
  push()
  translate(loc.x,loc.y);
 rotate(head);
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
  
  if( key == " ")
    saveCanvas()
}


function kochSnowflake(){
  turnAngle = 60;
  let path= "F++F++F";
  
  
  for(let i =0; i<3 ; i++){
  let accu = "";
  for(let c of path){
    if(c == "F")
      accu+= "F-F++F-F";
    else
      accu+= c;
  
  }
    path = accu;
  }
  followPath(path);
}



function arrowhead(num){
  if(num== undefined)
    num = 6;
  
  turnAngle = 60;
  let path= "Y";
  
  
  for(let i =0; i<num; i++){
  let accu = "+";
  for(let c of path){
    if(c == "X")
      accu+= "YF-XF-Y";
    else if( c == "Y")
      accu += "XF+YF+X"
    else
      accu+= c;
  
  }
    path = accu;
  }
  followPath(path);
}

function gosper(num){
  if(num== undefined)
    num = 3;
  
  turnAngle = 60;
  let path= "XF";
  
  
  for(let i =0; i<num; i++){
  let accu = "+";
  for(let c of path){
    if(c == "X")
      accu+= "X+YF++YF-FX--FXFX-YF+";
    else if( c == "Y")
      accu += "-FX+YFYF++YF+FX--FX-Y"
    else
      accu+= c;
  
  }
    path = accu;
  }
  followPath(path);
}



function hilbert(num){
  if(num== undefined)
    num = 5;
  
  turnAngle = 90;
  let path= "XF";
  
  
  for(let i =0; i<num; i++){
  let accu = "+";
  for(let c of path){
    if(c == "X")
      accu+= "+YF-XFX-FY+";
    else if( c == "Y")
      accu += "-XF+YFY+FX-"
    else
      accu+= c;
  
  }
    path = accu;
  }
  followPath(path);
}




function dragon(num){
  if(num== undefined)
    num = 9;
  turnAngle = 90;
  let path= "F";
  
  
  for(let i =0; i<num; i++){
  let accu = "";
  for(let c of path){
    if(c == "F")
      accu+= "F+G";
    else if( c == "G")
      accu += "F-G"
    else
      accu+= c;
  
  }
    path = accu;
  }
  followPath(path);
}

function followPath(path){
  for(let c of path){
    if(c == 'F' || c == 'G')
      fwd();
    if(c == '+')
      turnRight();
    if(c == '-')
      turnLeft();
  }
}



