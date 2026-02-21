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




  fill(255, 99, 99);
  ellipse(0, 0, 270);


  var s = second();
  var secAngle = map(s, 0, 60, 0, 360);
  strokeWeight(3);
  push();
  rotate(secAngle);


  line(0, 0, 0, -135);
  push();
  translate(0, -135);
  scale(.25);
  smiley();
  pop();

  pop();



  var m = minute();
  var minAngle = map(m, 0, 60, 0, 360);
  //strokeWeight(3);
  push();
  rotate(minAngle + secAngle / 60);
  fill(90, 210, 90);
  ellipse(0, 0, 180);
  line(0, 0, 0, -90);

  push();
  translate(0, -90);
  scale(.25);
  smiley();
  pop();
  pop();


  var h = hour();
  if (h > 12)
    h = h - 12;
  var hourAngle = map(h, 0, 12, 0, 360);
  
  push();
  rotate(hourAngle + minAngle / 60);

  fill(99, 99, 255);
  ellipse(0, 0, 90);
  line(0, 0, 0, -45);
  push();
  translate(0, -45);
  scale(.25);
 // smiley();
  pop();
  pop();

  //ellipse(0, 0, 3);

  noFill();
}


function smiley() {
return;
  push();
  rotate(0);
  strokeWeight(3);
  //draw head
  fill(255, 255, 0);
  ellipse(0, 0, 81, 81);

  //draw eyes
  fill(0);
  ellipse(13, -10, 10, 25);
  ellipse(-14, -10, 10, 25);

  //draw smile
  noFill();
  arc(0, -4, 62, 62, 20, 160);

  pop();

}