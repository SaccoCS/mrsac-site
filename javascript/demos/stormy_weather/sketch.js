function setup() {
  createCanvas(100, 40);
}

function draw() {
  let n = noise(frameCount*0.03);
  let b = map(n, 0.2, 0.8, 0,255);
  background(b);
}