function setup() {
  createCanvas(211, 71);
}

function draw() {
  background(220);
  textFont("Coiny");
  textAlign(CENTER, CENTER);

  var s = second();
  var m = minute();
  var h = hour();

  textSize(45);

  var r = map(h, 0, 23, 0, 255);
  var g = map(m, 0, 59, 0, 255);
  var b = map(s, 0, 59, 0, 255);

  background(r, g, b);

  fill(255 - r, 255 - g, 255 - b);

  if (s < 10)
    s = "0" + s;

  if (m < 10)
    m = "0" + m;

  if (h < 10)
    h = "0" + h;

  text(h + ":" + m + ":" + s, width / 2, 40);
}