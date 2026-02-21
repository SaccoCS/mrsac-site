var roids = [];


function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 40; i++){
    let a = new Asteroid();
    a.angSpeed =0;
    roids.push(a);
  }
}



function draw() {
  background(255);
  for (let i = 0; i < roids.length; i++) {
    roids[i].draw();
  }




  for (let i = 0; i < roids.length; i++) {
    var roid = roids[i];
    roid.update();

    if (roid.pos.x > width + roid.size / 2)
      roid.pos.x = -roid.size / 2;

    if (roid.pos.x < -roid.size / 2)
      roid.pos.x = width + roid.size / 2;

    if (roid.pos.y > height + roid.size / 2)
      roid.pos.y = -roid.size / 2;

    if (roid.pos.y < -roid.size / 2)
      roid.pos.y = height + roid.size / 2;
  }
  
  rectMode(CORNER);
  noFill();
  rect(0,0,width-1,height-1);
  fill(255);
}



function mousePressed() {
  for (let i = 0; i < roids.length; i++) {
    var roid = roids[i];
    roid.pos = createVector(mouseX, mouseY);
    roid.randVect();
    

  }

}