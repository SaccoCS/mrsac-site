function setup() {
  createCanvas(256, 100);
  frameRate(115);
  strokeWeight(3);


}

function draw() {
  background(0);

  var blu = 255;
  for (var x = 0; x < 256; x++) {
    stroke(0, 0, blu);
    line(x, 0, x, 100);

    blu -= 1;
  }
  
}