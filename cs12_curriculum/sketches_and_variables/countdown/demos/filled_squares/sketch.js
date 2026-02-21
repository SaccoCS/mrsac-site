let countRed, countGreen, countBlue;

function setup() {
  createCanvas(280, 100);
  rectMode(CENTER);  
  countRed = countGreen = countBlue = 0;
  
  
}

function draw() {
  strokeWeight(5);
  stroke(255)
  background(0);
  
  if(countRed > 0)
    countRed--;
  
  
  if(countGreen > 0)
    countGreen--;
  
  
  if(countBlue > 0)
    countBlue--;
  
  
  if(countRed > 0)
    fill(255,0,0);
  else
    noFill();  
  stroke(255,0,0);
  rect(58,50,48,48)
  
  
  
  
  if(countGreen > 0)
    fill(0,255,0);
  else
    noFill();  
  
  stroke(0,255,0);
  rect(140,50,48,48)
  
  if(countBlue > 0)
    fill(0,0,255);
  else
    noFill();  
  stroke(0,0,255);
  rect(222,50,48,48)
}


function mousePressed(){
  
  if( mouseInBox(58,50,48,48))
    countRed  = 50;
  
  if( mouseInBox(140,50,48,48))
    countGreen  = 50;
  
  if( mouseInBox(222,50,48,48))
      countBlue  = 50;
}



function mouseInBox(x,y,w,h){
  return mouseX>x-w/2 && mouseX<x+w/2 && mouseY > y-h/2 && mouseY < y+h/2
}

