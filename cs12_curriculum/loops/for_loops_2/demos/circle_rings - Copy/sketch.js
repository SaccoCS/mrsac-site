function setup() {
  createCanvas(300, 300);
  ellipseMode(RADIUS);

  
}

function draw() {
  background(0);
  
  noFill();
  stroke(255);
  
  for(let r = 10; r<= 130;r+=20){
    
    strokeWeight(3)
    let d = dist(150,150,mouseX,mouseY);
    
    if( abs(d-r) <= 5)
      strokeWeight(12)
    
    circle(150,150,r)
    
    
    
  }
    
    //Pattern:
    //Start x at 20
    //Incremental Step: Increase x by 30
    //Permissive If:  x < width
 
}

function mouseInBox(x,y,w,h){
  
  return mouseX>x-w/2 && mouseX<x+w/2 && mouseY > y-h/2 && mouseY < y + h/2
  
}