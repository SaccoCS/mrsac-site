function setup() {
  createCanvas(330, 160);
  frameRate(.5);
}

function draw() {
  background(220);
  textSize(15);
  textFont("Courier");
  var rand = random(5);

  text('var rnd = random(5);',30,20);
  meter(rand, 30, 30);
  
  
  textSize(15);
  text('var rndInt = floor(rnd);',30,100);
  meter(floor(rand), 30, 110);
}

function meter(val, x, y) {
strokeWeight(2);
  push();
  // translate(260, 0);
  // rotate(PI / 2);
  var mapR = map(val, 0, 5, 0, 200);
  fill(255);
  rect(x, y, 200, 30);
  fill(255, 0, 0);
  rect(x, y , mapR, 30);

  noFill();
  strokeWeight(1);
  for (var i = 1; i <= 5; i++) {
    line(x + i * 40, y+30, x + i * 40, y );

  }
  fill(0);
  textSize(18);
  if(ceil(val)!=floor(val))
  text(nf(val,0,4),x+220, y+21);
  else
  text(val,x+220, y+21);
  pop();

  
}