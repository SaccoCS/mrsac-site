let angle = 0;
let rotSpeed = 0;
let message = "";
function setup() {
  createCanvas(100, 125);
  ellipseMode(RADIUS);
  angleMode(DEGREES);
  textAlign(CENTER,CENTER);
  textSize(20);
  
  angle = 0;
  rotSpeed = 15;
}

function draw() {
  background(0);
  // angle = mouseX
  
  if( rotSpeed > 0 ){
    angle += rotSpeed;
    rotSpeed -= 0.1;
  }else{
    
    let a = angle%360;//( angle+270)%360;
    

    
    if( a < 72 )
      message = "Red";
    else if( a < 144 )
      message = "Orange";
    else if( a  < 216 )
      message = "Green";
    else if( a  < 288 )
      message = "Blue";
    else 
      message = "Purple"
    
   
    
  }
  
  
 
  
  drawSpinner();
  
  
  
  noStroke();
  fill(255);
  text(message,50,110)
}

function mousePressed(){
  rotSpeed = random(15, 30);
  message = "";
  
}


function drawSpinner(){
  push();
  
  
   translate(50,50);
  rotate(-angle-90);
  
  
  noStroke();
  fill("red");
  arc(0,0,40,40,0,72,PIE)
  fill("orange");
  arc(0,0,40,40,72,144,PIE)
  fill("green");
  arc(0,0,40,40,144,216,PIE)
  fill("blue");
  arc(0,0,40,40,216,288,PIE)
  fill("purple");
  arc(0,0,40,40,288,359,PIE)
  
  fill(255);
  circle(0,0,4)
  pop();
  
  stroke(255);
  strokeWeight(2)
  line(50,0,50,25)
}