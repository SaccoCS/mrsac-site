var img;
var x,y,xSpeed,ySpeed;
var col;
var size;

function setup() {
  createCanvas(640, 480);
  imageMode(CENTER);
  img = loadImage('dvd_logo.PNG');
  
  size = 150;
  x = random(size/2,width-size/2);
  y = random(size/4,height-size/4);
  
  xSpeed = 2+random();
  ySpeed = 1+random();
  col = color(random(256),random(256),random(256));
}

function draw() {
  scale(.5);
  background(col);
  
  //scale(.5);
  image(img,x,y,size,size/2);
  //console.log(x);
  
 
  x += xSpeed;
  y += ySpeed;
  
  if( x < size/2){
    randomizeColor()
    xSpeed *= -1;
  }
  if( y < size/4){
    randomizeColor()
    ySpeed *= -1;
  }
  
  if( x > width-size/2){
    randomizeColor()
    xSpeed *= -1;
  }
  if( y > height-size/4){
  randomizeColor()
    ySpeed *= -1;
  }
}

function randomizeColor(){
  col = color(random(100,156),random(100,156),random(100,156));
}