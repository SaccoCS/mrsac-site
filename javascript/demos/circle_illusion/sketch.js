function setup() {
  createCanvas(400/2, 400/2);
  angleMode(DEGREES);
  circs = [[0,50,350,200,200],[45,94,306,306,94],[90,200,200,350,50],[135,306,94,306,94]];
}

function draw() {
  scale(0.5);
  background(220);  
 circs.forEach(c=>{
   drawCircle(c[0],c[1],c[2],c[3],c[4])
 }) 
}

function drawCircle(off, lowX,highX,lowY,highY){
  var s = sin(frameCount+off);
  var x = map(s,-1,1,lowX,highX);
  var y = map(s,-1,1,lowY,highY);
  circle(x,y,20);
}