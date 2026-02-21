let x,y,xV,yV;
function preload(){
  
  img = loadImage("sacco.png");
}

function setup() {
  createCanvas(img.width, 343);
  noCursor();
  
  x = (random(20,200))
  y = (random(20,200))
  xV = random(0,.05);
  yV = random(0,.05);
  
  cX = x;
  cY = y;
 

}

function draw() {
  background(220);
  image(img, 0, 0);
  rectMode(CENTER);
  
  img.loadPixels();
  let i = 4*(floor(y)*img.width+floor(x));
  fill(img.pixels[i],img.pixels[i+1],img.pixels[i+2]);
  noStroke();
  circle(x,y,60);
  textAlign(LEFT,CENTER);
  fill(255);
  text(`R: ${img.pixels[i]}\nG: ${img.pixels[i+1]}\nB: ${img.pixels[i+2]}`,x-16,y)
  
  if(mouseX >1 && mouseY >1 && mouseX<img.width && mouseY< img.height){
    x = mouseX
    y = mouseY
  }
  else{
  x += xV;
  y += yV
  if( x<30 || x > img.width-30)
    xV *= -1;
  if( y<30 || y > img.height-30)
    yV *= -1;}
}

