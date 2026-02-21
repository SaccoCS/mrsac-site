var xs = [];
var ys = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  noStroke();

  var al = 0;
  var rad = 0;
  for (var i=0;i<xs.length;i++) {
    fill(255,al+=3);
    
    ellipse(xs[i], ys[i], rad+=1);
  }
}

function go(a){
  reverse(a);
  a.splice(a.length-1);
  reverse(a);
}

function mouseMoved() {
  xs.push(mouseX);
  ys.push(mouseY);
  
  if(xs.length>50){
    
  go(xs);
    go(ys);
  }
}

function keyPressed() {
  if (key == 'r') {
    xs = [];
    ys = [];
  }
}