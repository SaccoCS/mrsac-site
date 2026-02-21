function setup() {
  createCanvas(230, 144);
}

function draw() {
  background(0);
  strokeWeight(3);
  textAlign(CENTER,CENTER);
  
  digit(hour()/10,30,100);
  digit(hour()%10,60,100);
  
  digit(minute()/10,100,100);
  digit(minute()%10,130,100);
  
  digit(second()/10,170,100);
  digit(second()%10,200,100);
}

function digit(val, x, y) {
  val = int(val);
  textSize(18);
  push();
	translate(x,y);
  push();
  fill(255);
  translate(0,25);
  text(val,0,0);
  pop();
  
  
  for(var i = 0; i< 4; i++){
    if(val>>i&1)
      fill(255,0,0);
    else
      fill(255);
    
    ellipse(0,0,25);
    translate(0,-25);
  }
	


  pop();
}