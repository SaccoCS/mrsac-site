let count=0;
function setup() {
  createCanvas(150, 300);
  rectMode(CENTER);
  frameRate(2);
  // noLoop(); // static image
}

function draw() {
  background(200);
  drawPole();
  
  
  
  

  if( count > 0 ){
    count--;
  }
  
  
  
  
  
  
  if( count > 4){
  //Green
  fill(0, 255, 0);
  circle(75, 175, 45);
  
  } else if( count > 0){
    
  //Yellow
  fill(255, 255, 0);
  circle(75, 125, 45);
  }else{
    
  
  //Red
  fill(255, 0, 0);
  circle(75, 75, 45);
  
  }
  
  
}




function mousePressed(){
  count  = 15;
}









function drawPole(){
  fill(60);
  rect(width / 2, 260, 20, 100, 5);
  fill(40);
  rect(width / 2, 125, 70, 180, 10);
  fill(25);
  rect(width / 2, 125, 55, 165, 7);
  


  fill(10);
  circle(75, 75, 55);
  circle(75, 125, 55);
  circle(75, 175, 55);
  
   
  fill(120, 30, 30);
  circle(75, 75, 45);

  fill(120, 120, 20);
  circle(75, 125, 45);

  fill(20, 120, 20);
  circle(75, 175, 45);
  
  noStroke();
  fill(255, 255, 255, 60);
  ellipse(65, 65, 15, 15);
  ellipse(65,115, 15, 15);
  ellipse(65, 165, 15, 15);
}
