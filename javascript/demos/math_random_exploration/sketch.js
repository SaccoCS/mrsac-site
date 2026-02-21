function setup() {
  createCanvas(600, 100);
  // equation = createP();
  // equation.style("font-family:monospace;font-size:18pt")
  slider = createSlider(1,9,1);
  plus = createSlider(0,6,0,1);
  cast = createCheckbox("(int)");
  
  plus.style("display:block")
  ;
  lowX = 20;
  highX = width-20;
  list = [];
  
  // frameRate(60)
}

function draw() {
  if(frameCount%30 != 0 && !keyIsDown(32))
    return;
  background(255);
  fill(0);
  textSize(16)
  textAlign(CENTER,CENTER);
  textFont("monospace")
  
  let times = slider.value()>1?"*"+slider.value():"";
  let plusStr = plus.value()>0?" + "+plus.value():"";
  let mess = cast.checked()?"(int)(Math.random()"+times+")"+plusStr:"Math.random()"+times+plusStr;
  text(mess,width/2,20);
 // equation.html(mess)
  
  var x = Math.random()*slider.value()+plus.value();
//  x = map(x,0,100,lowX,highX)
  
  if( cast.checked())
    x = int(x)

    list.push({x:map(x,0,10,lowX,highX),num:x});
  
  drawNumberLine();
  rectMode(CENTER);
  textSize(12);
  list.forEach((x,i)=>{
  let alph = 255+40*(i-list.length);
    
  // let alph = 255+15*(i-list.length);
    noStroke();
    fill(0,alph)
 // circle(x.x,height/2,15);
    if(i == list.length-1)
    fill(255,0,99)
    else
    fill(255,alph)
    stroke(0,alph)
   // rect(x.x,height/2,26,15)
    circle(x.x,height/2,26);
    fill(0,alph);
    noStroke();
    if( cast.checked())
      text(nf(x.num,0,0),x.x,height/2);
    else      
      text(nf(x.num,0,1),x.x,height/2);
    
    
    if(list.length>15){
      list.splice(0,1);
      
    }
    
  })
  
  
}

function drawNumberLine(){
  stroke(0);
  
  line(lowX,height/2,highX,height/2);
  
  
  for(let i = 0; i<=10;i++){
    let x = map(i,0,10,lowX,highX)
    textSize(16)
    stroke(0)
    line(x,height/2-5,x,height/2+5)
    noStroke();
    text(i,x,height/2+20)
  }
  
}

function keyPressed(){
//   if( key == UP_)
}