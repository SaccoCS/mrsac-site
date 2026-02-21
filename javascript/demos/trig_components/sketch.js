function setup() {
  createCanvas(100,100);
  ellipseMode(RADIUS)
  background(255); 
  pts = [];
  for(let i =0; i<360; i+= 1){
     let x = 50 + 40*cos(radians(i));
    let y = 50 + 40*sin(-radians(i));
    pts.push(new p5.Vector(x,y));
  }
  console.log(pts)
}

function draw() {
  
  
 
  
  fill(255);
  noStroke()
  rect(0,0,100);
  stroke(0);
  strokeWeight(2)
  
  let angle = frameCount%360;
  let radius = 40;
  let centX = 50;
  let centY = 50;
  let x = pts[angle%360].x
  let y = pts[angle%360].y
  
  circle(centX, centY, radius)
  circle(centX, centY, 0)
  
  line(x,y,50,50)
  
  stroke(255,0,0);
  line(x,y,x,50)
  stroke(0,0,255)
  line(x,50,50,50)
  
  
  stroke(0);
  circle(x,y,5)

  
  
  
 
  

}

function orbs(oX,oY){
  let angle = frameCount%(360*2);
  stroke(0)
  circle(oX,oY,5)
  // circle(110,oY,5)
  // circle(oX,110,5);
   stroke(222,0,0)
  fill(255)
  
  let travX = map(angle, 0,720,110,330);
  circle(travX,oY,2)
  
  stroke(0,0,222)
  let travY = map(angle, 0,720,110,330);
  circle(oX, travY,2)
}

function axis(x,y,radius){
  stroke(0)
   line(110,y-radius,110,y+radius)
  line(107,y-radius,113,y-radius)
  line(107,y+radius,113,y+radius)
  
  
  line(x-radius,110,x+radius,110)
  line(y-radius,107,y-radius,113)
  line(y+radius,107,y+radius,113)
}