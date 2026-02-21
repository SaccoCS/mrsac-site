function setup() {
  createCanvas(320, 320);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  textSize(20);
  rowSlider = createSlider(1,9,5,1)
  colSlider = createSlider(1,9,7,1)
}

function draw() {
  background(220);
  scale(.7);
  let numRows = rowSlider.value();
  let numCols = colSlider.value();
  text("Width: "+ numCols,230,30)
  
  push();
  translate(25, 230);
  rotate(radians(-90))
  text("Height: "+ numRows,0,0)
  pop();
  translate(32,32)
  let num = 0;
  for (let r = 0; r < numRows; r += 1)
    for (let c = 0; c < numCols; c += 1) {
      let x = c * 40 + 40;
      let y = r * 40 + 40;
      fill(255);
      strokeWeight(2)
      rect(x, y, 40,40,5);
      fill(0);
      text(num++, x, y + 1);
    }
}
