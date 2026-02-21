var x, y;

function setup() {
  createCanvas(200, 200);
  rectMode(CENTER);
  x = width / 2;
  y = height / 2;


}

function draw() {
  background(99);
  rect(x, y, 30, 30);




}


//Called for every mouse click
function mousePressed() {
  x  = mouseX;
  y = mouseY;
}

//Called for every key press
function keyPressed() {

}