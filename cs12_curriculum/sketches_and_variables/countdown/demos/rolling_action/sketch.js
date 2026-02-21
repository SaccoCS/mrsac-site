let d1,d2,rollCount;

function setup() {
  createCanvas(150, 80);
  
  d1 = floor(random(1,7));
  d2 = floor(random(1,7));
  rollCount = 0;
  
  frameRate(10)
}

function draw() {
  background(220);
  drawDie(d1,40,40);
  drawDie(d2,110,40);
  
  
  if(rollCount > 0 ){
    
  d1 = floor(random(1,7));
  d2 = floor(random(1,7));
    
    rollCount--;
  }
  
  
  
}

function drawDie(val,x,y){
  fill(255)
    rectMode(CENTER);
    strokeWeight(3);
    square(x,y,50,4);
  
    fill(0)
    if( val%2 == 1 ){
        circle(x, y, 3);
    }
    if( val > 1){
        circle( x - 15, y - 15, 3 )
        circle( x + 15, y + 15, 3 )
    }
    if( val > 3){
        circle( x + 15, y - 15, 3 )
        circle( x - 15, y + 15, 3)
    }
    if(val > 5){
        circle( x - 15, y, 3)
        circle( x + 15, y, 3)
    }
}


function mousePressed(){
   rollCount = 15 
}