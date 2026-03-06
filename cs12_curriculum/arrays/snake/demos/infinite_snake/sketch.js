let sX = 0;
function setup() {
  createCanvas(136, 56);
  snake = new Snake();
  noSmooth();
  frameRate(8)
  
}

function draw() {
  background(255);
  translate(0.5,0.5);
  
  translate(-sX,-7)
  sX+=1;
 
  drawGrid();
  snake.draw();
  // fill(0,180,0);
  // drawCell(15,5)
 
  
  if( frameCount%10==0){
  snake.go();
    
  }
  
  
}

function drawGrid(){
  noFill();
  stroke(0);
  strokeWeight(1);
  let h = snake.head.plus(new Loc(0,-10));
  let g = [];
  for(let x = 0; x<width+100; x+=10){
    g.push(x);
  }
  g.forEach(x=>{
    line(x+h.xy().x,0,x+h.xy().x,height+100)
    line(0,x,width+h.xy().x+100,x)
  })
}

function drawCell(r,c){
 
  let x = c*10;
  let y = r*10;
  rect(x,y,10);
}



