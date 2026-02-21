function setup() {
  var can = createCanvas(400, 400);
  can.style('border', '1px solid black');
  angleMode(DEGREES);
  textAlign(CENTER);
  strokeWeight(2);
  noFill();

  xs = [];
  ys = [];
  dxs = [];
  dys = [];  
  
  pips = createCheckbox('Show Indivudal Points');
  pips.style('font-family', 'Helvetica');
  pips.style('font-size', '12px');
}

function draw() {
  background(255)
  fill(0)
  text('Draw a Circle Below\n(clockwise and starting at the top)', width / 2, 20);

  for (var i = 0; i < xs.length; i++) {
    noFill();
   
    if (pips.checked())
      ellipse(xs[i], ys[i], 9);
    line(xs[i], ys[i], xs[i + 1], ys[i + 1]);

    if (i < dxs.length) {
      xs[i] = lerp(xs[i], dxs[i], .1);
      ys[i] = lerp(ys[i], dys[i], .1);
    }

  }
}

function mouseDragged() {
  xs.push(mouseX);
  ys.push(mouseY);
}

function mousePressed() {
  
  if(mouseY>height)
    return;
  xs = [];
  ys = [];
  dxs = [];
  dys = [];
}



function mouseReleased() {

  if (xs.length > 1) {
    dxs = [];
    dys = [];
    var spacing = 360 / (xs.length - 1);

    for (var i = 0; i < 360+spacing; i += spacing) {
      dxs.push(200 + 150 * cos(i - 80));
      dys.push(200 + 150 * sin(i - 80));
    }
  }
}