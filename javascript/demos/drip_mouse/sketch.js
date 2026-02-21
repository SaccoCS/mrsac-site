function setup() {
  createCanvas(400, 200);
  list = [];
  for (let i = 0; i < width; i++) {
    list.push(0);
  }
}

function draw() {
  background(0);
  stroke(255)

  for (let i = 0; i < width; i++) {
    let y = list[i];
    line(i, height, i, height - y)
  }
  let x = floor(map(noise(frameCount * 0.01), .1, .9, 0, width));
  list[x - 3] += .5;
  list[x - 2] += 1;
  list[x - 1] += 1.5;
  list[x] += 2.5;
  list[x + 1] += 2;
  list[x + 2] += 1;
  list[x + 3] += .5;

  for (let val of list) {
    if (val > height) {

      list = [];
      for (let i = 0; i < width; i++) {
        list.push(0);
      }
    }
  }
}