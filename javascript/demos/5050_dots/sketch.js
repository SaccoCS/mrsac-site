function setup() {
  createCanvas(250, 250);

  //draw background once in the beginning
  background(128);  
}

function draw() {
  //noStroke();
strokeWeight(2);
  if(random() <0.5){
  fill(0); 
    stroke(255);
  }
  else{
    fill(255);
    stroke(0);
}

  //Uses p5's global width/height variables to get random x/y
  var x = random(0,width); 
  var y = random(0,height);

  //A random diameter 10.0 - 49.9
  var d = random(10,50);
  ellipse(x,y,d);
}