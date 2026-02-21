var spacing = 25;

function setup() {
  createCanvas(400, 400);
  list = [];
  for (var x = spacing / 2; x < width; x += spacing) {
    for (var y = spacing / 2; y < height; y += spacing) {
      list.push(createVector(x, y))
    }
  }
}

function draw() {
  background(0);


  for (let zee of list)
    curc(zee.x, zee.y);
}

function curc(x, y) {
  var d = dist(mouseX, mouseY, x, y)
  var size = constrain(1500 / (d), 0, spacing);

  circle(x, y, size) //d/400*40+1.2)
}