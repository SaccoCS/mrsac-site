function setup() {
  createCanvas(150, 150, WEBGL); //WEBGL is necessary for 3D
  angleMode(DEGREES);
}

function draw() {
  background(52);
  
  rotateZ(frameCount);

  axis();
}
	
function axis() {
  push();
  noStroke();
  ambientMaterial(255, 200, 0);
  sphere(6);

  push();

  ambientMaterial(255, 0, 0);
  rotateZ(-90);
  translate(0, 25);
  cylinder(2, 50);
  pop();



  push();
  ambientMaterial(0, 255, 0);

  translate(0, 25);
  cylinder(2, 50);
  pop();

  push();
  ambientMaterial(0, 0, 255);
  rotateX(90)
  translate(0, 25);
  cylinder(2, 50);
  pop();
}