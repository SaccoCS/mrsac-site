function setup() {
  createCanvas(100, 100);
  strokeWeight(2)
  frameRate(2)
  i =0;
}

function draw() {
  background(0);
  
  var a =["red","white","blue"]
  fill(a[i])
  ellipse(width/2,height/2, 90);
  i = (i+1)%3;
}

