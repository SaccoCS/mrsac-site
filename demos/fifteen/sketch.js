

function setup() {
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
 
  textFont('Consolas');
  createCanvas(174, 174);
 
  document.oncontextmenu = function() {
    return false;
  }



  




  init();
  shuff();
  position();
  
  
}

function shuff(){
  
  for(let i = 0; i<1000; i++){
    randomMove();
  }
  
  
}

function randomMove(){
  
  let nullLoc= locate(null);
  
  let rand = floor(random(4));
 
  let r = floor(nullLoc/4);
  let c = nullLoc%4;
  if( rand == 0)
    { 
      r-=1;
    }
  else if (rand == 1)
   r+=1
  else if(rand == 2)
    c-=1;
  else
   c+=1;
  
  if( r>=0 && c>=0 && r<4 && c<4)
    {
      swap(4*r+c,nullLoc)
    }
  else{
    randomMove();
  }
  
}

function init() {  
  tiles = [] ;
  
  for(let i =0; i<15; i++){
    let t;
   tiles.push( t = new Tile(i)); 
//     t.color = color(25,158,200);
    
    t.color = color(255,255,255);
  }
  tiles.push(null);
 position();

}


function mousePressed()
{
    for( let t of tiles){
     if( t == null)
       continue;
       
       if(t.contains(mouseX,mouseY))
       {
        tileClick(t); 
         return;
       }
      
    }
  
  
}

function tileClick(t)
{
  let a = locate(t);
  let nullLoc= locate(null);
  
  let aR = floor(a/4);
  let aC = a%4;
  let nR = floor(nullLoc/4);
  let nC = nullLoc%4;
  
  let dr = abs(aR-nR);
  let dc = abs(aC-nC);
  
  if(dc <=1 && dr <= 1 && dr != dc)
  swap(a,nullLoc);
  
  position();
  
}



function locate(toFind){
 for(let i = 0; i<tiles.length ;i++){
   
  let t = tiles[i];
  if( t == toFind)
    return i;
 }
  
  return -1;
}


function swap(a,b){
  let hodor = tiles[a];
  tiles[a] = tiles[b];
  tiles[b] = hodor;
}


function position(){  
  for(let i =0; i<tiles.length; i++){
   let t = tiles[i];
    
    if(t == null)
      continue;
      
    let y = 23 + 42*floor(i/4);
    let x = 23 + 42*floor(i%4);
    t.dest = createVector(x,y);
    
  }
}



function draw() {
  background(235);
 drawTiles()
  moveTiles();

}

function moveTiles(){
 for(let t of tiles){ 
   if(t == null)
      continue;
  t.move(); 
 }
}

function drawTiles(){
 for(let t of tiles){
    if(t == null)
      continue;
  t.paint(); 
 }
}

