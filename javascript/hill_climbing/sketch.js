function setup() {
  div = createDiv();
//   div.child(createP("Hill Climbing"));
  
  div.child(createCanvas(400, 120));
  textFont("monospace")
 init();
  
}

function init(){
  nums = [];
  for(let i = 0; i< 20; i++){
    
    let mx = i<4?75:100;
    nums.push((random(1,mx)));
  }
  
  current = 0;
}

function draw() {
  background(230);
  
  
  // translate(5,3)
  // height =120
  stroke(90)
  strokeWeight(2)

  fill(255)
  large = -1;
  let x = 0;
  let wid = 20;
  nums.forEach((e,i)=>{
    if(i>current)return;
    let h = e;
    rect(x,height-h,wid,h+3,3)
    x+= wid
    
    large =max(large,e);
 
  })
  
  large = large
  
  
  
  //draw large line
  stroke(200)
 line(0,height-large,width,height-large)
  
  
  drawWords();
  
  drawLargeLine()
  
  
  if(frameCount %30 == 0)
  incr();
  
  
  
  noFill();
  stroke(0);
  strokeWeight(1)
  rect(0,0,width,height)
}

function drawLargeLine(){
  let large = -1;
  let wid = 20;
  let x = 0;
  stroke(222,0,99)
  strokeWeight(4)
  
  nums.forEach((h,i)=>{
    if(i>current)return;
 
    
    let oldLarge = large;
    large =max(large,h);
    
    let end = i == nums.length-1 && delay > 0?width+1:x+wid;
    
    if(i>0)
    line(x,height-large,x,height-oldLarge)
    line(x,height-large,end,height-large)
    x+= wid
 
  })
}

function mousePressed(){
}

function drawWords(){
  if( current == nums.length-1 && delay != 0)
    fill(222,0,99)
  else
    fill(0)
  
  noStroke()
  text("Largest Value: "+floor(large*10), 270, height-large-8)
}

function incr(){
  if(current == nums.length-1){
    if( delay++ > 3)
      current = 0;
      init();
    
  }
  else {
    delay = 0;
    current++;
  }
  
  // current = current == nums.length-1?0:current+1;
  
}

function keyPressed(){
  if(key == "r")
    init();
}