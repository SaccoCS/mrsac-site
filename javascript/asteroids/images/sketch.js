var roids = [];
var roidImages = [];
var shipImages = [];
var up,left,right;
function preload(){
   
  for(let i = 1; i<=5; i++)
  loadImage('asteroid'+i+'.png', function(img){
    roidImages.push(img);  });
  
  shipImages[0]= loadImage('shipnoboost.png');
 shipImages[1] = loadImage('shipwithboost.png')
  
 
}


function setup() {
  createCanvas(600, 400);

  for (let i = 0; i < 5; i++)
    roids.push(new Asteroid());
  
   ship = new Spaceship();
}


function draw() {
  background(255); 
  
  
  
  
  
  //Draw Asteroids
  for (let i = 0; i < roids.length; i++) {
    roids[i].draw();
  }
  
  
  ship.draw();
  
  //Draw Border
  rectMode(CORNER);
  noFill();
  rect(0,0,width-1,height-1);
  fill(255);

  
  
  
  
  ////////////////////////////////////////////////////////////UPDATE
  
  if(up)
    ship.boost();
  if(left)
    ship.turnLeft();
  if(right)
    ship.turnRight();
  
  
  
  
  
  ship.update();
  wrapAround(ship);

  for (let i = 0; i < roids.length; i++) {
    var roid = roids[i];
    roid.update();
wrapAround(roid);
    
  

}
}

function wrapAround(sprite){
   if (sprite.pos.x > width + sprite.size / 2)
      sprite.pos.x = -sprite.size / 2;

    if (sprite.pos.x < -sprite.size / 2)
      sprite.pos.x = width + sprite.size / 2;

    if (sprite.pos.y > height + sprite.size / 2)
      sprite.pos.y = -sprite.size / 2;

    if (sprite.pos.y < -sprite.size / 2)
      sprite.pos.y = height + sprite.size / 2;
}



function mousePressed() {
  for (let i = 0; i < roids.length; i++) {
    var roid = roids[i];
    roid.pos = createVector(mouseX, mouseY);
    roid.randVect();
    

  }

}



function keyPressed(){
  
  if(keyCode === 38)
    up = true;  
  if(keyCode === 37)
    left = true;
  if(keyCode === 39)
    right = true;
}

function keyReleased(){
  
  if(keyCode === 38)
    up = false;  
  if(keyCode === 37)
    left = false;
  if(keyCode === 39)
    right = false;
}