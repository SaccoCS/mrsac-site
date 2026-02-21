function setup() {
  createCanvas(200, 200);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(20);
  strokeWeight(3);
  vals = [ob(100, 75, "W"), ob(50, 125, "A"), ob(100, 125, "S"), ob(150, 125, "D")];
}

function ob(a, b, c) {
  return {
    x: a,
    y: b,
    v: c
  };
}

function draw() {
  background(220);

  vals.forEach(foo => {
    if (keyIsDown(unchar(foo.v))) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    square(foo.x, foo.y, 50);
    fill(0);
    text(foo.v, foo.x, foo.y);
  })
}