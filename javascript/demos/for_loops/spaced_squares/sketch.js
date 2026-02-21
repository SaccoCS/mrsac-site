function setup() {
  createCanvas(500, 80);
  frameRate(115);
  rectMode(CENTER);
  textAlign(CENTER,CENTER);


}

function draw() {
  background(0);
  
  var i = 0;
 	for(let x = 40; x<=width-30;x += 60){
    textSize(18);
    stroke(222,0,0);
    strokeWeight(3);
   rect(x,height/2,40,40,10); 
    noStroke();
    text(i,x,height/2+textDescent()/2);
    i++;
  }
}