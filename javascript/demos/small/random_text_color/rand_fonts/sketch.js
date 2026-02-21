function setup() {
  createCanvas(250, 40);
  frameRate(4);
}

function draw() {
  background(0);
  textSize(18);
  textFont('Courier');
  var r = random(3);

  
  r = int(r);
  if( r == 0 ){
    fill(222,0,0);
    
  }
  else if(r == 1){
    fill(0,222,0);
  }
  else{
	 	fill(0,0,255)    
  }
  
  
   r = random(3);

  
  r = int(r);
  if( r == 0 ){
    textFont('Luckiest Guy');
    
  }
  else if(r == 1){
    textFont('Bangers');
  }
  else{
    textFont('Armata');
  }
  
  textSize(30);
  textAlign(CENTER,CENTER);
  text('Hello World!!!',width/2,height/2);
  //rect(100,100,100,100);
}