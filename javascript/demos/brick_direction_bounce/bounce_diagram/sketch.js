function setup() {
  createCanvas(220, 120);
}

function draw() {
  
  
  let x = (mouseX+40)/2;//constrain((mouseX+40)/2,42,107);
  let y = (mouseY+40)/2; 
  
  while( allIn(x,y)){
    let v = createVector(x,y);
    let c = p5.Vector.sub(v,createVector(75,50));
    
    c.setMag(c.mag()+.001);
    c.add(75,50)
    x = c.x;
    y = c.y;
  }
  x = constrain(x,42,107);
  y = constrain(y,37.5,63.5);
  
  background(220);
  scale(2)
  translate(-20,-20);
  
  
  rectMode(CORNER);
  fill(0,0,255,50)
  noStroke();
  if(y < 40){
  rect(0,0,150,40)
  }
  else if(y >60){
  rect(0,60,150,20)
  }  
  else if(x >75){
  rect(105,40,30,20)
  } else{
  rect(0,40,45,20)
    
  }
  
  stroke(150)
  line(0,40,width,40);
  line(0,60,width,60);
  
  
  rectMode(CENTER);
  fill(255);
  stroke(0);
  rect(75,50,60,20);
  
  
  
  
  
  
  
  rect(x,y,10,10);
  circle(x,y,1)
  
  noStroke();
  fill(0);
  textSize(8)
  textAlign(CENTER,CENTER)
  text("y-bounce",75,30)
  text("y-bounce",75,70)
  text("x",115,50)
  text("x",35,50)
}

function allIn(x,y){
  return x<109 && x > 42 && y  < 61 && y>38;
}