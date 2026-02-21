var p;
function setup() {
	p = createSlider().size(200,AUTO);
  
  
  
  createCanvas(595, 150);
  p.value(25);
}

function draw() {
  background(51);
	
	stroke(255);
	textAlign(LEFT,CENTER);
	
	var val = p.value();
	
	var w100 = val;
	noStroke();
	fill(235);
	
	rect(20,20,val,30);
  
  var w256 = map(val,0,100,0,255);	
	rect(20,60,w256,30);

  
  var w360 = map(val,0,100,0,360);	
	rect(20,100,w360,30);
  
	
	noFill();
	stroke(255);
  
  strokeWeight(1);
  textFont('Courier New');
  text('x = '+p.value()+', with a range of 0 - 100',130,35);
  text('map(x,0,100,0,256) --> '+w256,286,75)
  text('map(x,0,100,0,360) --> '+w360,390,115);
  
  
  strokeWeight(2);
	rect(20,20,100,30);
	rect(20,60,256,30);
	rect(20,100,360,30);
}