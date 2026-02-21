function setup() {
  createCanvas(260, 250);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  x1 = 50;
  x2 = width - x1;
  mSel = createCheckbox("map");
  floorSel = createCheckbox("floor");
  indSlider = createSlider(1, 5, 3);
}

let x1, x2;
function draw() {
  background(220);
  textSize(12);
  text("points", x1, 22);
  text("dests", x2, 22);
  for (let i = 0; i < 6; i++) {
    strokeWeight(2);
    fill(255);
    let y = i * 30 + 50;
    stroke(0);
    square(x1, y, 30);
    textSize(18);
    noStroke();
    fill(0);
    text(i, x1, y + 1);

    if (i < indSlider.value()) {
      strokeWeight(2);
      stroke(0);
      fill(255);
      square(x2, y, 30);
      noStroke();
      fill(0);
      text(i, x2, y + 1);
    }
  }

  for (let i = 0; i < 6; i++) {
    let i2 = i;

    if (mSel.checked()) {
      i2 = map(i2, 0, 6, 0, indSlider.value());
    }
    if (floorSel.checked()) {
      i2 = floor(i2);
    }
    arrow(i, i2);
  }
}

function arrow(ind1, ind2) {
  strokeWeight(2);
  if (ind2 < indSlider.value() && ind2 % 1 == 0) {
    stroke(0);
  } else {
    stroke(255, 0, 0);
  }

  let y = ind1 * 30 + 50;
  let y2 = ind2 * 30 + 50;

  line(x1 + 20, y, x2 - 20, y2);
  let start = createVector(x1 + 20, y);
  let tip = createVector(x2 - 20, y2);
  let v = tip.copy().sub(start).setMag(8);

  v.rotate(radians(-140));
  line(tip.x, tip.y, tip.x + v.x, tip.y + v.y);
  v.rotate(radians(-80));
  line(tip.x, tip.y, tip.x + v.x, tip.y + v.y);

  let mid = tip.copy();
  mid.sub(start);
  mid.mult(0.5);

  fill(222);
  noStroke();
  circle(start.x + mid.x, start.y + mid.y, 20);

  fill(0);
  noStroke();
  textSize(10);
  if (ind2 % 1 != 0) ind2 = nf(ind2, 0, 1);
  text(ind2, start.x + mid.x, start.y + mid.y);
}
