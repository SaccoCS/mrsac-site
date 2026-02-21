function setup() {
  createCanvas(320, 80);
  frameRate(4);
}

function draw() {
  background(255);
  textSize(18);
  textFont('Courier New');
  var r = random(1,6);
  fill(0); 
  text('let r = random(1,6);',20,20);
  text('    r  -> '+nf(r,0,14),20,45);
  text('floor(r) -> '+floor(r),20,65);
  
}