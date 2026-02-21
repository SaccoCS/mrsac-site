let bx, by, field;
function setup() {
  createCanvas(300, 200);
  field = [];
  let gap = 10; 
  let index = 0;
  for(let x = gap/2; x<width; x+= gap){
    
  for(let y = gap/2; y<height; y+= gap){
    translate(x,y);
    let n = noise(x*0.01,y*0.01);
    let a = map(n, 0.2,0.8,0,TWO_PI)
    
    // rotate(a)
    // line(0,0,8,0)
    //  resetMatrix();
    
    field.push(a);
  }
 }
}

function draw() {
  background(255);
  
 drawField();
  
  fill(255,0,99)
  circle(bx,by,12)
  
    let n = noise(bx*0.01,by*0.01);
  
  
    let a = map(n, 0.2,0.8,0,TWO_PI)
    let dx = cos(a);
    let dy = sin(a);
  
  bx+=dx;
  by+=dy;
  
  
}

function mousePressed(){
  bx = mouseX;
  by = mouseY;
}