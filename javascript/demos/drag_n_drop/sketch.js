var x, y, pressed;

function setup() {
  createCanvas(300, 200);
  x = width / 2;
  y = height / 2;
  pressed = "X";
}

function draw() {
  background(220);
  
  
  if(pressed.length%2 == 0){
    var tmp = mouseX;
    
    x = mouseY;
    y = x;
    x = tmp;
  }
  
  circle(x,y,40);
}

function mousePressed(){
  if( dist(x,y,mouseX,mouseY)<20){
    pressed += "X";
  }
}

function mouseReleased(){
  if(pressed.length%2 == 0){
    pressed = pressed.substring(1);
  }
}