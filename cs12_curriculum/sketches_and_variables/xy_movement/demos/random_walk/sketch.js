let x,y;

function setup(){
    createCanvas(200,200);
    noStroke();
    
    x = 100;
    y = 100;
    
    background(0);
}

function draw(){
    
    fill(255);
  fill(random(256),random(256),random(256))
    circle(x,y,8);
    
   x += random(-2,2);
   y += random(-2,2);
  
  if( x < 0 || x > width || y < 0 || y > height){
     x = 100;
    y = 100;
    background(0);
  }
}
