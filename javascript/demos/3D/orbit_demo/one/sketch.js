function setup() {
  createCanvas(330, 330, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(152);
  directionalLight(255, 255,255, 0, 0, -1); // White light pointed toward -Z
  ambientMaterial(222, 222, 0);
  noStroke();
  sphere(35);

  rotateX(0);
  rotateY(0);
  rotateZ(0);

  torus(100, 2);
  rotateZ(frameCount);
  axis();
translate(100,0,0);  
axis();
box(25);
  
  
  axis();  //leave this at the end of draw
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