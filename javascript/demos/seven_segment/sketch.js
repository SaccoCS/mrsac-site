var a, b, c, d, e, f, g;

function setup() {
  createCanvas(105, 170);
  rectMode(CENTER);
  angleMode(DEGREES);
  frameRate(1);
  setDisplay(frameCount);

}

function draw() {
  scale(.5);
  setDisplay(frameCount%10);
  background(0);
  translate(105, 30);

  //a
  if (a)
    segment();

  translate(70, 70);
  rotate(90);

  //b
  if (b)
    segment();

  translate(140, 0);

  //c
  if (c)
    segment();

  rotate(-90);
  translate(-70, 70);
  //d
  if (d)
    segment()

  //e
  translate(-70, -70);
  rotate(90);
  if (e)
    segment();

  //f
  translate(-140, 0);
  if (f)
    segment();

  //g
  rotate(-90);

  translate(70, 70);
  if (g)
    segment();
}

function segment() {
  fill(222, 0, 0);
  var wid = 110;
  rect(0, 0, wid, 24, 12);

  // ellipse(0,0,5);
}


function setDisplay(val) {

  if (val == 0) {
    a = true;
    b = true;
    c = true;
    d = true;
    e = true;
    f = true;
    g = false;

  } else if (val == 1) {
    a = false;
    b = true;
    c = true;
    d = false;
    e = false;
    f = false;
    g = false;

  } else if (val == 2) {
    a = true;
    b = true;
    c = false;
    d = true;
    e = true;
    f = false;
    g = true;
    

  } else if (val == 3) {
    a = true;
    b = true;
    c = true;
    d = true;
    e = false;
    f = false;
    g = true;

  } else if (val == 4) {
    a = false;
    b = true;
    c = true;
    d = false;
    e = false;
    f = true;
    g = true;

  } else if (val == 5) {
    a = true;
    b = false;
    c = true;
    d = true;
    e = false;
    f = true;
    g = true;

  } else if (val == 6) {
    a = true;
    b = false;
    c = true;
    d = true;
    e = true;
    f = true;
    g = true;

  } else if (val == 7) {
    a = true;
    b = true;
    c = true;
    d = false;
    e = false;
    f = false;
    g = false;

  } else if (val == 8) {
    a = true;
    b = true;
    c = true;
    d = true;
    e = true;
    f = true;
    g = true;
  } else if (val == 9) {
    a = true;
    b = true;
    c = true;
    d = false;
    e = false;
    f = true;
    g = true;

  }

}