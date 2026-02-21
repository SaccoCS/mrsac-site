
var balls, speed,count;

function setup() {
  createCanvas(250, 200);
  //crateCanvas(740/2, 500/2);
  rectMode(CENTER);
  count = 0;
  //Initialize the ball's location and direction
  balls=[];
  speed=[];
  //speed = [createVector(2,-3)];
}

function draw() {
  //scale(.5)
  background(220);
  drawPaddle();
  drawBall();

  moveBall();
  paddleVsBall();
  
  if(frameCount%10 == 0 && balls.length < 20)
    addBall();
    
  
  if( balls.length == 0)
    count--;
  else{
    count = 50;
  }
}
function populate(){
   balls = []; 
  speed = [];
  for(let x = 0; x<=width; x+=15){
    balls.push(createVector(x,0));
    speed.push(createVector(0,3));
  }
}

function addBall(){
  balls.push(createVector(random(40,width-40)));
  speed.push(createVector(0,2));
}

function paddleVsBall(){
  for(let i in balls){
  if( boxOverlap(balls[i].x,balls[i].y,10,10,width/2,height-40, 90,20)){
    //noLoop();
    speed[i].y *= -1;
    speed[i].x = (balls[i].x - width/2)*0.1;  
  }
}
}

function drawBall(){
  for(let ball of balls)
  rect(ball.x,ball.y,10,10)
}

function drawPaddle(){
  rect(width/2,height-40, 90,20);  
}

function moveBall(){
  
  for(let i in balls){
  //move
  balls[i].add(speed[i]);

  //horizontal wall bounce
  if(balls[i].x<-15 || balls[i].x>width+15)
   {
     balls.splice(i,1);
     speed.splice(i,1);
     addBall()
     continue;
   }
  
  //vertical wall bounce
  if(balls[i].y<-15 || balls[i].y>height+15){
     balls.splice(i,1);
     speed.splice(i,1);
    addBall()
     continue;
  }
  }
}

function keyPressed(){
  if(key == " ")
    saveCanvas();
}

function boxOverlap(x1,y1,w1,h1,x2,y2,w2,h2){
  if( x1+w1/2 < x2-w2/2)
    return false;
 if( x2+w2/2 < x1-w1/2)
    return false;
  if( y2+h2/2 < y1-h1/2)
    return false;
  if( y1+h1/2 < y2-h2/2)
    return false;
  
  return true;
}