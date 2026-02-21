function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(52);
  directionalLight(255, 255, 255, 0, 0, -1);
  ambientMaterial(222, 222, 0);
  
  rotateX(frameCount*.4);
  rotateY(frameCount*.2);
  noStroke();
  translate(0,-60);
  sphere(35);

  translate(0,30+40);
  cylinder(5,80);

  
  push();
  rotateZ(90);
  cylinder(5,100);
  pop();
  
  translate(0,40);
  
  
  push();
rotateZ(35);
  translate(0,28,0);
  cylinder(5,60);
  
  pop();
  
  
  push();
rotateZ(-35);
  translate(0,28,0);
  cylinder(5,60);
  
  pop();
  
  
  
  






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