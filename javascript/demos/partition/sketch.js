const BOX_WID = 30;
const yLine = 45;
let arr = new Array(10);

function setup() {
  createCanvas(385, 90);
  rectMode(CENTER);
  angleMode(DEGREES);
  initAll();
  
  startDelay = 50;
  
  
  
  
  

}


function initAll(){
  let ave = 0;
  for(let i =0; i<arr.length; i++){
   arr[i] = new Num(floor(random(50)),x(i),yLine)
    
    ave += arr[i].val;
  }
  
  ave /= arr.length
  
  
  
  //Color#F44336#FA948D
  let p = arr[arr.length-1].val = floor(ave);
  for(let n of arr)
  {
    if(n.val > p){
      n.fill = 100;
      n.numFill = 255
    }
    else{
      n.fill = 210
      n.numFill = 0
    
   }
  }
  
  arr[arr.length-1].fill = 170
  
  
  swapLabel = new SwapLabel();
  iLabel = new ILabel();
  
  partVal = p;
   resetDelay = 0;
  startDelay = 50;
  
}


function swap(indA,indB){
  let a = arr[indA];
    let b = arr[indB];

    b.arc = new Arc(b,a);
    a.arc = new Arc(a,b);
    
    setXs();
}

function setXs(){
 
  for(let i in arr){
    arr[i].x = x(i);
    arr[i].index = i;
  }
}

function draw() {
  background(245);
  let moving = false;
  let arcs = [];
  
  for(let i in arr){
    let n = arr[i]
    if(n.arc){
        arcs.push(n)
       moving = true;
    }
    
  }
      swapLabel.paint();
  iLabel.paint();
  if( iLabel.index < arr.length-1 || moving){

  }else if( resetDelay < 300){
    resetDelay++;
  }
  else{
    initAll();
    resetDelay=0;
  }
  
  for(let n of arr)
    n.paint();
  
  
  for(let n of arcs)
    n.paint();
  
  if( startDelay > 0){
    startDelay--;
    return;
    }
  
//     if( resetDelay > 0){
//     resetDelay--;
//     return;
//     }else {
      
//     }

 
  
  
  
  
 
  if( arcs.length > 0 && arcs[0].arc.finished){
    let aInd = arcs[0].index
    let bInd = arcs[arcs.length-1].index;
    
    let a = arr[aInd];
    let b = arr[bInd];
    arr[bInd] = a;
    arr[aInd] = b;
    
    setXs();
    a.arc = undefined;
    b.arc = undefined;
    
    
    if( iLabel.index < arr.length-1){
    iLabel.moving = true;
    swapLabel.moving = true;
    }
  }

  
  
  if( !moving && !iLabel.moving && iLabel.index < arr.length){
    
    
    // let indA = floor(random(arr.length));
    // let indB = floor(random(arr.length));
    // swap(indA,indB)
    
    let indA = swapLabel.index;
    let indB = iLabel.index;
    
    if(arr[indB].val <= partVal){
      swap(indA,indB);
    }else if(iLabel.index < arr.length-1){
      iLabel.moving = true;
    } else {
      
    }
    
    // console.log(indA,indB,arr[indA].val <= partVal)
  }
  
  

}

// function swap()


function x(index){
  
  let left = 20+BOX_WID/2;
  return left+index*(BOX_WID+5)
}