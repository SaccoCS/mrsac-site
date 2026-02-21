
var balls, speed,count,pX,pY;

function setup() {
  createCanvas(200,150);
  //crateCanvas(740/2, 500/2);
  rectMode(CENTER);
  count = 0;
  //Initialize the ball's location and direction
  balls=[];
  speed=[];
  //speed = [createVector(2,-3)];
}

function draw() {
  
  pX =width/2
  pY = height/2
  background(220);
  drawPaddle();
  drawBall();

  moveBall();
  paddleVsBall();
  
  if(frameCount%10 == 0 && balls.length < 20)
    addBall();
    
  
 
  
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
  
  let loc = p5.Vector.random2D();
  loc.mult(140);
  loc.add(width/2, height/2)
  
  let dir = new p5.Vector(width/2 + random(-30,30),height/2);
  dir.sub(loc);
  dir.mult(.02)
  
  balls.push(loc);
  speed.push(dir);
}

function paddleVsBall(){
  for(let i in balls){
  if( boxOverlap(balls[i].x,balls[i].y,10,10,pX,pY, 60,20)){
    //noLoop();
    // speed[i].y = 0;
    // speed[i].x = 0;  
    
    if(balls[i].y -speed[i].y > pY-15 && balls[i].y-speed[i].y < pY + 15)
      speed[i].x *= -1;
    else      
      speed[i].y *= -1;
      
  }
}
}

function drawBall(){
  for(let ball of balls)
  rect(ball.x,ball.y,10,10)
}

function drawPaddle(){
  rect(pX,pY, 60,20);  
}

function moveBall(){
  
  for(let i in balls){
  //move
  balls[i].add(speed[i]);

  //horizontal wall bounce
  if(balls[i].x<-150 || balls[i].x>width+150)
   {
     balls.splice(i,1);
     speed.splice(i,1);
     addBall()
     continue;
   }
  
  //vertical wall bounce
  if(balls[i].y<-150 || balls[i].y>height+150){
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