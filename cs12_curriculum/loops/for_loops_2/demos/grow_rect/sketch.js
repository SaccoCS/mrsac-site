function setup() {
  createCanvas(300, 30);
  rectMode(CENTER);
}

function draw() {
  background(0);
  noStroke();
  stroke(255)
  
  for(let x = 0; x<=width; x+=10){
    let h = 50/Math.abs(mouseX-x);
    h = min(h, 20);
    rect(x,height/2,8,h)
  }
}