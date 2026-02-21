function setup() {
  createCanvas(300, 256);
}

function draw() {
  background(255);
  noStroke();
  let i = map()

  if (mouseX < 100) {
    fill(255, mouseY, 0);
    rect(0, 0, 100, 300);
  } else if (mouseX < 200) {
    fill(mouseY, 255, 0);
    rect(100, 0, 100, 300);
  } else {
    fill(mouseY, 0, 255);
    rect(200, 0, 100, 300);
  }

}