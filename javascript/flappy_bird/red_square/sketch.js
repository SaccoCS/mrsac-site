let bird;
let fr;
function setup() {
  createCanvas(200, 300);
 // setFrameRate(50);

  bird = new Bird();
  fr = createP('');

}



function draw() {

  background(255);
  

  fill(0);
  textSize(12);
  text('Click to Flap',width/2 - textWidth('Click to Flap')/2,30);


  bird.paintSelf();




  bird.update();
  
  if (bird.y > height - bird.h)
    bird.y = height - bird.h;
  
  noFill();
  rect(0, 0, width-1 , height -1);

}

function mousePressed(){
  bird.flap();
}