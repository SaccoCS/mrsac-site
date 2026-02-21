var angle;
var x;
var isClosing;

function setup() {
  createCanvas(600, 180);
  angleMode(DEGREES);
  

  angle = 70
  x = 100;
  isClosing = true;
}

function draw() {

  // scale(.8);
  background(88);
  strokeWeight(3);


  drawDots();

  //Draw PacMan
  fill(255, 255, 0);

  arc(x, height / 2, 150, 150, angle / 2, -angle / 2, PIE);



  if (isClosing)
    angle-=3;
  else
    angle+=3;
  
  if( angle <= 2 )
   isClosing = false;
  
  
  if( angle >= 70)
    isClosing = true;
  
  x+=2;
  if(x > 680)
    x= - 80;
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
  if (angle == 70)
    angle = 1;
  else
    angle = 70;
}