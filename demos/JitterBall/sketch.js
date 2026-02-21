function setup() {
  createCanvas(200, 200);
  list = [ball()];
  
  strokeWeight(3);
  for(let i =0; i<0; i++)
  {
    list.push(ball()); 
  }
   
  
}

function ball(){
  return {
   x:width/2,
    y:height/2,
    c: color(random(100,256),random(100,256),random(100,256),160),
    size:random(30,50)
    
    
    
    
  }
}

function mousePressed(){
 for(let b of list)
  {
   b.x = mouseX;
    b.y = mouseY;
  }
}

function draw() {
  background(255);
  
  for(let b of list)
  {
     fill(b.c);
     ellipse(b.x,b.y,b.size,b.size);
    
     let angle = random(TWO_PI);
     let dx = 1.5*cos(angle);
     let dy = 1.5*sin(angle);
    
    b.x += dx;
    b.y += dy;
  }
}