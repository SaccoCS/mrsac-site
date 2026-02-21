function setup() {
  createCanvas(180, 50);
  textFont("monospace");
}

function draw() {
  background(51);
  fill(255);
  
  textSize(36);
  
  let h = hour();
  let m = minute();
  let s = second();
  
  
  //Display the Time  
  text((h>9?"":"0")+h+":", 10 , 35); 
  text((m>9?"":"0")+m+":", 70, 35);  
  text((s>9?"":"0")+s, 130 , 35 ); 
}