function setup() {
  createCanvas(200, 200, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(152);
  directionalLight(255, 255, 255, 0, 0, -1);
  ambientMaterial(222, 0, 0);

  noStroke();

  rotateX(-20);
  rotateY(-40+frameCount);
  rotateZ(0);

  box(100,30,40);
  
  
  ambientMaterial(50,50,199);
  push();
  translate(70,0,0);
  rotateZ(-90);
  cone(15,40);
    pop();
  
  
  ambientMaterial(99,99,99);
  translate(25,15,25);
  ellipsoid(15,15,10);
  //torus(15,4);
  translate(-60,0,0);
  //torus(15,4);
  
  ellipsoid(15,15,10);
  rotateY(180);
  translate(0,0,50);
  //torus(15,4);
  ellipsoid(15,15,10);
  translate(-60,0,0);
  ellipsoid(15,15,10);
 // torus(15,4);
  
  


 // axis(); //leave this at the end of draw
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