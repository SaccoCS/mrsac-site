function setup() {
  createCanvas(207, 157);
  strokeWeight(1);
  stroke(255)


  lines = false;
  chr205()

}

function draw() {
for (var i = 0;lines&& i < 400; i++) {
    y = 16 * floor(i / 16);
    x = 16 * floor(i % 16);


   
   
      noFill();
      stroke(255, 0, 0);
      rect(x, y, 16, 16);
    

  }
}

function mousePressed() {
  lines = !lines;
  chr205()

}

function chr205() {


  background(0);
  for (var i = 0; i < 400; i++) {
    y = 16 * floor(i / 16);
    x = 16 * floor(i % 16);


    stroke(255)
    if (random() < 0.5) {
      line(x, y, x + 16, y + 16);
    } else {

      line(x + 16, y, x, y + 16);
    }
    if (lines) {
      noFill();
      stroke(255, 0, 0);
      rect(x, y, 16, 16);
    }

  }

 // console.log(lines);

}

