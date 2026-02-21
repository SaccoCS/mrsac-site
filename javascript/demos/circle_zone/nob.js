var r = [50, 100, 150, 200];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  //colorMode(HSB);
  //noStroke();

  var d = dist(200, 200, mouseX, mouseY);

  strokeWeight(3);
  
  if (d >= r[2] && d < r[3])
    fill(222, 0, 0);
  else
    fill(255);

  ellipse(200, 200, r[3] * 2);
  
  if (d >= r[1] && d < r[2])
    fill(222, 0, 0);
  else
    fill(255);

  ellipse(200, 200, r[2] * 2);

  if (d >= r[0] && d < r[1])
    fill(222, 0, 0);
  else
    fill(255);

  ellipse(200, 200, r[1] * 2);




  if (d < r[0]) {
    fill(222, 0, 0);
  } else {
    fill(255);
  }

  ellipse(200, 200, r[0] * 2);

  
  

}