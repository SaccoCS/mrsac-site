function setup() {
  createCanvas(300, 256);
}

function draw() {
  background(255);
  noStroke();
  let i = int(map(mouseX,0,width,0,3))

  if (i==0) {
    fill(255, 0, 0);
    rect(0, 0, 100, 300);
  } else if (i==1) {
    fill(0, 255, 0);
    rect(100, 0, 100, 300);
  } else {
    fill(0, 0, 255);
    rect(200, 0, 100, 300);
  }

}