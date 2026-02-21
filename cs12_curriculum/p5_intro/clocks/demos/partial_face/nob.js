function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(255);
  stroke(0);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textSize(25);
  translate(width / 2, height / 2);
  ellipse(0, 0, 270);
  push();
  rotate(30);
  strokeWeight(1);
  for (var h = 1; h <= 12; h++) {

    translate(0, -115);
    if (h % 3 == 0)
      text(h, 0, 0);
    translate(0, 115);
    rotate(30);
  }

  pop();

  var s = second();
  var secAngle = map(s, 0, 60, 0, 360);
  strokeWeight(1);
  push();
  rotate(secAngle);
  line(0, 0, 0, -95);
  pop();



  var m = minute();
  var minAngle = map(m, 0, 60, 0, 360);
  strokeWeight(3);
  push();
  rotate(minAngle+secAngle/60);
  line(0, 0, 0, -100);
  pop();

  
  var h = hour();
  if(h>12)
    h = h -12;  
  var hourAngle = map(h, 0, 12, 0, 360);
  strokeWeight(3);
  push();
  rotate(hourAngle+minAngle/60);
  line(0, 0, 0, -65);
  pop();
  
  ellipse(0,0,7);
}