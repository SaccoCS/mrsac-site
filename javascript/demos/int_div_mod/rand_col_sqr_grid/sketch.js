function setup() {
  createCanvas(257, 257);
    background(255);
}

function draw() {
 // background(220);
  
  for(var i = 0; i<= 256; i+=32){
    line(i,0,i,256);
    line(0,i,256,i);
  }
}
  
  function mousePressed(){
   var x = floor(mouseX/32)*32;
   var y = floor(mouseY/32)*32; 
    
    fill(random(256),random(256),random(256));
    rect(x,y,32,32);
  }

function keyPressed(){
  if(key == ' ' || keyCode == ENTER){
    background(255);
  }  

}
