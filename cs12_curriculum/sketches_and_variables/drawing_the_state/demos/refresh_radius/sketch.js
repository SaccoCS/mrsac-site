
  var size;
var b;

function setup() {
  createCanvas(150, 150);
  frameRate(30);
  size = random(50,250);
  
  b = createButton("Run Sketch Again");
  b.mousePressed(() => {
  size = random(10,70);
  
  });
  
  b.style('margin-top','10px');
}

function draw() {
  background(0);
  fill(222,0,0);
  
  ellipse(width/2,height/2,size);
}