var val = 0;
var mod = 5;
var pause = false;

function setup() {
  createCanvas(140, 70);
  textAlign(CENTER);
//  textFont('Calibri');
  textSize(20);
 frameRate(30);
}

function draw() {
  background(220);
  
 text("val\n"+val,30,30);
 text("val%"+mod+"\n"+val%mod,100,30);
  
  if(frameCount%10==0 && !pause)
  val++;
  
  val %= 100;
}

function keyPressed(){
 if( keyCode == RIGHT_ARROW){
   mod = (mod+1)%33;
 }
  
  if(keyCode == LEFT_ARROW){
   mod = max(1,mod-1); 
  }
  
  if( key == ' ')
     pause = !pause;
  
}