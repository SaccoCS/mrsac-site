function setup() {
  createCanvas(250, 250);
  
  //draw background once in the beginning
  background(0);  

}

function draw() {
  noStroke();
  
  //White, highly transparent
  fill(200,10); 
  
  //Uses p5's width/height to get random x/y
  var x = random(0,width); 
  var y = random(0,height);
  
  //A random diameter 20-40
  var d = random(10,50);
  ellipse(x,y,d);
}

function mousePressed(){
 background(0); 
}