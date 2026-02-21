var isOpen;
var x;

function setup() {
  createCanvas(600, 180);
  angleMode(DEGREES);

  isOpen = true;
  x = 100;
}

function draw() {
  
 // scale(.8);
  background(88);
  strokeWeight(3);


  drawDots();

  //Draw PacMan
  fill(255, 255, 0);

  if (isOpen)
    arc(x, height / 2, 150, 150, 35, -35,PIE);
  else
    arc(x, height / 2, 150, 150, 0, -1,PIE);




}

function drawDots() {
  push();
  translate(130, height / 2);
  fill(255);
  for (var i = 0; i < 4; i++) {
    translate(100, 0);
    ellipse(0, 0, 28);
  }
  pop();
}


function mousePressed() {
  isOpen = !isOpen;
  //x += 10;
}