
  var size;
var b;
var c;

function setup() {
  createCanvas(150, 150);
  frameRate(30);
  size = random(50,250);
  
  b = createButton("Run Sketch Again");
  b.mousePressed(() => {
  size = random(10,70);
  randomizeCol();
  });
  
  b.style('margin-top','10px');
  
  randomizeCol();
}
function randomizeCol(){
 c = color(random(256),random(256),random(256));  

}

function draw() {
  background(0);
  fill(c);
  
  ellipse(width/2,height/2,size);
}