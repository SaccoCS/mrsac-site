
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
  strokeWeight(3);
  angleMode(DEGREES);
  //https://imgur.com/gallery/4IBKPo8
  var h = hour();
  var m = minute();
  var s = second();
  var hourHand = map(h,0,12,0,360)
  var minuteHand = map(m,0,60,0,360)
  var secondHand = map(s,0,60,0,360)
  ellipse(200,200,395);
  
  drawClock(200,40,0);
  drawClock(280,70,30);
  drawClock(330,130,60);
  drawClock(360,200,90);
  drawClock(330,275,120);
  drawClock(270,330,150);
  drawClock(200,360,180);
  drawClock(130,320,210);
  drawClock(80,265,240);
  drawClock(50,200,270);
  drawClock(75,130,300);
  drawClock(130,80,330);
  
  push();
  translate(200,200);
  rotate(hourHand);
  line(0,0,0,-50);
  pop();
  
  push();
  translate(200,200);
  rotate(minuteHand);
  line(0,0,0,-90);
  pop();
  
  push();
  strokeWeight(1);
  translate(200,200);
  rotate(secondHand);
  line(0,0,0,-100);
  pop();
  
}
function drawClock(x,y,hourAngle){
 push();
  translate(x,y);
  ellipse(0,0, 50);
  ellipse(0,0,1);
  rotate(hourAngle);
  line(0,0,0,-15);
  pop();
  push();
  translate(x,y);
  strokeWeight(1.5);
  line(0,0,0,-20);
  pop();
}