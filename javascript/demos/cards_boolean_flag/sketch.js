function preload(){
  cardsImg = loadImage("AllCards.png");
  cardBack = loadImage("b1fv.png");
}

function initi(){
  allHands = [];
  for(let i =0; i< 4; i++){
    allHands.push(new Hand(i%2==1));
  }
  allHands = shuffle(allHands);
allHands.splice(0,0,new Hand(false));
  h = new Hand(true);
  
  
  trueHands = [];
  falseHands = [];
  
  //h = undefined;
  
  GAME_OVER = false;
}

function setup() {
  createCanvas(610,400);
 noSmooth();
  //console.log(cardsImg.width, cardsImg.height);
  initi();
  
  
 
  
  let bX = 380;
  let bY = 52;
  revealBut = createButton("Reveal Another");
  revealBut.position(bX,bY);
  revealBut.mousePressed(()=>{
    if(h == undefined)
      return;
     h.revealIndex++;
    lastAction = "REVEAL"
  })
  
  retTrue = createButton("return true;");
  retTrue.position(bX,bY+24);
  retTrue.mousePressed(()=>{
    if(h == undefined)
      return;
     trueHands.push(h);
    h = allHands[0];
    allHands.splice(0,1);
    lastAction = "TRUE"
  })
  
  retFalse = createButton("return false;");
  retFalse.position(bX,bY+48);
  retFalse.mousePressed(()=>{
    if(h == undefined)
      return;
      falseHands.push(h);
    h = allHands[0];
    allHands.splice(0,1);
    lastAction = "FALSE"
  })
  
  resetButton = createButton("Reset All");  
  resetButton.position(bX,bY+72);
  resetButton.mousePressed(()=>{
    initi();
  })
  
  
  
  lastAction = undefined;
}

function draw() {
  
  fill(0,100,0);
  strokeWeight(3);
  rect(3,3,width-6,height-6,20);
  
  fill(255)
  textFont('monospace')
  textSize(22)
  text("containsTwoOfClubs()",30,32);
  
  textSize(18)
  text("true",130,195);
  text("false",420,195);
  
  
  
  if(h == undefined){
    GAME_OVER = true;
    let result = "PERFECT!";
    trueHands.forEach((hand)=>{
      //console.log(hand.cards[hand.revealIndex]);
      if(hand.hasTwo != true || !hand.isPerfect())
        result = "ERROR";
        
    })
    
    falseHands.forEach((hand)=>{
      //console.log(hand.cards[hand.revealIndex]);
      if(hand.hasTwo != false || !hand.isPerfect() )
        result = "ERROR";
        
    })
    
    rectMode(CENTER);
    stroke(0)
    rect(110,124,110,50,5)
    
    noStroke();
    fill(255,0,0)
    if(result == "PERFECT!")
      fill(0)
    
    textAlign(CENTER,CENTER);
    text(result, 110,124)
    textAlign(LEFT)
    
    rectMode(CORNER);
  }
 

  translate(50,50)
  
  
  if(h != undefined)
  h.paint();
  
  
  
  if(h != undefined && h.revealIndex == 12){
    revealBut.hide()
  }
  else{
    revealBut.show();
  }
  
  
  
  translate(-4-26,160);
  push();
  trueHands.forEach((th)=>{
    
   th.paint(true);
    translate(4,20)
  })
  pop();
  
  translate(300,0);
  
  push();
  falseHands.forEach((th)=>{
    th.paint(false);
    translate(4,20)
  })
  pop();
  
}

function drawCard(cNum, x, y, scl){
  if(!scl)
    scl = 1;
  if(!x)x = 0;
  if(!y)y=0;
  
    let hei = 96*scl;
  
   let  wid = 72*scl;
  push();
  translate(x,y);
  let suit = floor(cNum/13);
  let val = cNum%13;
  
  image(cardsImg,0,0,wid,hei,val*72,suit*96,71,96);
  
  pop();
  
}

function keyPressed(){
  if(keyIsDown(CONTROL) && key == "z"){
    
    if(h != undefined && h.revealIndex>0 &&lastAction == "REVEAL"){
    h.revealIndex--;
    }
    if(lastAction == "TRUE"){
      h = trueHands[trueHands.length-1]
      trueHands.splice(trueHands.length-1,1);
      lastAction = "REVEAL"
      
    }
    if(lastAction == "FALSE"){
      h = falseHands[falseHands.length-1]
      falseHands.splice(falseHands.length-1,1);
      lastAction = "REVEAL"
    }
  }
}