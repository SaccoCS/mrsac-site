function setup() {
  createCanvas(400, 170);
}

function draw() {
  background(255);
	textAlign(CENTER,CENTER);
	textSize(15);
	textFont('Josefin Sans');
	
	fill(190,140,90);
	rect(25,20,350,130,20);
	
	fill(255);
	
	var h = hour();
	if(h>12)
		h-=12;
	var m = minute();
	var s = second();
	
	//draw hour
	
	strokeWeight(3);
	line(50,50,350,50);
	line(50,85,350,85);
	line(50,120,350,120);
	
	var sX = map(s,0,60,50,350);
	ellipse(sX,120,30);
	
	var mX = map(m,0,60,50,350);
	ellipse(mX,85,30);
	
	
	var hX = map(h,0,12,50,350);
	ellipse(hX,50,30);
	
	fill(190,140,90);
	text(s,sX,122);
	text(m,mX,87);
	text(h,hX,52);
}