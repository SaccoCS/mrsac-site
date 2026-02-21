var bw;
var numBlocks;
var blockSize;

function setup() {
  createCanvas(401, 21);
  stroke(180);

  numBlocks = 40;
  blockSize = (width - 1) / numBlocks;

  //bw = [true, false, true, false, true, false, true, false];

  bw = []
  for (var i = 0; i < numBlocks; i++) {
    bw.push(i%2);
  }
  

}

function draw() {
  background(220);

  //paint each box according to the bw array
  for (var i = 0; i < numBlocks; i++) {
    if (bw[i] == true) {
      fill(0);
    } else {
      fill(255);
    }
    rect(blockSize * i, 0, blockSize, 20);
  }
}

function mousePressed() {
  var ind = floor(mouseX / blockSize);

  if (bw[ind] == true) {
    bw[ind] = false
  } else {
    bw[ind] = true
  }
}