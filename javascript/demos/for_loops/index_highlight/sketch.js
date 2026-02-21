var ind = 4;
function setup() {
  createCanvas(322, 44);
  rectMode(CORNER);
  textAlign(CENTER, CENTER);


}

function draw() {
  translate(2,2);
  background(255);
  textSize(18);
  noFill();
  for (let i = 0; i < 8; i += 1) {
    if(i == ind){
      fill(255,0,0,80);
    }
    else     
    noFill();{
    strokeWeight(2);
  
      
    }
    
 // noFill();
    stroke(222, 0, 0);
    rect(i * 40 + 0, 0, 39, 40);
    noStroke();
   fill(0);
    text(i, i * 40 + 20, 20 + textDescent() / 2);
  }
}

function keyPressed(){
 if(keyCode == LEFT_ARROW){
  
   ind=(ind+7)%8;
 }
 if(keyCode == RIGHT_ARROW){
  
   ind=(ind+1)%8;
 }
}