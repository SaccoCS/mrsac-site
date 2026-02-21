function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  angleMode(DEGREES);
  var h = hour();
  var m = minute();
  var s = second();
  
  
  
  var shrthnd = map(h,0,12,0,360);
  var lnghnd = map(m,0,60,0,360);
  var sechnd = map(s,0,60,0,360);
  
  
  ellipse(200,200,300,300);
  
  textAlign(CENTER,CENTER);
  textSize(20);
  
  
  if(h<10){
  translate(200,200,0,0);
  rotate(shrthnd);
  strokeWeight(2);
  ellipse(0,-75,30,30);
  text("0"+h,0,-75);  
	}else{
  translate(200,200,0,0);
  rotate(shrthnd);
  strokeWeight(2);
  ellipse(0,-75,30,30);
  text(h,0,-75);
  }
  
  
  if(m<10){
  rotate(lnghnd);
  strokeWeight(2);
  ellipse(0,-100,30,30);
  text("0"+m,0,-100) ; 
	}else{
  rotate(lnghnd);
  strokeWeight(2);
  ellipse(0,-100,30,30);
  text(m,0,-100);
  }
  
  
  if(s<10){
  rotate(sechnd);
  ellipse(0,-120,30,30);
  text("0"+s,0,-120); 
	}else{
  rotate(sechnd);
  ellipse(0,-120,30,30);
  text(s,0,-120);
  }
  

}