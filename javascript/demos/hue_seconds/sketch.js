function setup() {
  createCanvas(400, 150);
	colorMode(HSB);
}

function draw() {
	var s = second();
	var hue = map(s,0,60,0,360);
  background(hue, 255, 255);
	
	fill(0);
	textFont('Courier New');
	textAlign(CENTER,CENTER);
	textSize(16)
	text("var hue = map(second(), 0, 60, 0, 360);",width/2,19);
	textSize(20)
	text("second()\n( 0 - 60 )\n"+s,width/4+10,height/2);
	text("hue\n ( 0 - 360 )\n "+hue,width*3/4-10,height/2);
}