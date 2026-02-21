function setup() {
  createCanvas(300, 300).style('border','1px solid black');
  background(255);
}

function draw() {
  var x = random(width);
  var y = random(height);
  
  var x2 = random(width);
  var y2 = random(height);
  
  var r = random(255);
  var g = random(255);
  var b = random(255);
  
  strokeWeight(5);
  stroke(r,g,b);
  
  line(x,y,x2,y2);
}