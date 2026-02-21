function setup() {
  createCanvas(340, 40);
  rectMode(CENTER);

  
}

function draw() {
  background(0);
    
    //Pattern:
    //Start x at 20
    //Incremental Step: Increase x by 30
    //Permissive If:  x < width
    
  for(let x = 20; x<width; x+=30){
    fill(255);
    noStroke();
    if(mouseInBox(x,20,20,20)){
      fill(222,0,99)
      stroke(255);
      strokeWeight(3)
    }
    square(x,20,20);
    
    
    
  }
  
}

function mouseInBox(x,y,w,h){
  
  return mouseX>x-w/2 && mouseX<x+w/2 && mouseY > y-h/2 && mouseY < y + h/2
  
}