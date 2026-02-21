function setup() {
  createCanvas(400, 30);
  frameRate(5);
}

function draw() {
  background(255);
  textSize(20);
  textFont('Courier New');
  textAlign(LEFT,CENTER);
  text("random()-> "+nfs(random(),0,15),20,height/2);
}