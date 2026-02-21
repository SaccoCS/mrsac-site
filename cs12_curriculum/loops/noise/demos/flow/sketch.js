let x1,y1

function setup() {
  createCanvas(300, 240);
  angleMode(DEGREES);
  
  field = [];
  
  let gap = 12;
  for(let x = 0; x<=width; x+=gap){
  field[x]=[]; 
    for(let y  = 0; y<=height; y+=gap){
      
      let a = map(noise(x*0.01,y*0.01),0.2,0.8,0,360);
      field[x][y] = a;
    }
  }
  
}

function draw() {
  background(255);
  stroke(155);
      
  
  let gap = 12;
  for(let x = 0; x<=width; x+=gap){
    for(let y  = 0; y<=height; y+=gap){
      let a =field[x][y];
     
      drawVector(x,y,a);
    }
    
  }
  
  if(!x1)return;
  
  fill(222,0,99);
  circle(x1,y1,8);
  
  let a = map(noise(x1*0.01,y1*0.01),0.2,0.8,0,360);
  let dx = cos(a);
  let dy = sin(a);
  x1+=dx;
  y1+=dy;
  
}

function drawVector(x,y,angle){
   translate(x,y);
   rotate(angle);      
   line(0,0,8,0);
   circle(0,0,2);
   resetMatrix();
}

function mousePressed(){
  x1 = mouseX;
  y1 = mouseY
}
