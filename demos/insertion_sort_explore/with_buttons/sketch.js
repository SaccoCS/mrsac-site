var focus = 1;
var mover = 1;
var STARTING_MESSAGE = "Click to Sort"
var check = '✔';

function setup() {
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  // instructions = createP("Instructions:<br/>Right-Click to send values to be compared.<br>Left-Click to Drag into place.<br>Try to place squares in ascending order.");
  // instructions.style('font-family','Consolas');
  // instructions.style('font-size','12px');
  // instructions.style('margin','2px');
  textFont('Consolas');
  createCanvas(600*9/12, 50);
  cycle = 0;

  document.oncontextmenu = function() {
    return false;
  }

  
  leftButton = createButton("<---")
  leftButton.mousePressed(left)
  stopButton = createButton("next")
  stopButton.mousePressed(next);


  message = "";




  init();
  
   p = createP("Goal: Sort without using the right-arrow");
  p.style('margin','2px');
  p.style('font-family','Consolas');
  p.style('font-size','12px');
  p.hide();

}

function init() {
  rightCount = 0
  message = ""
  enable = true;
  tiles = [];
  for (let i = 0; i < 9; i++) {
    let t;
    tiles.push(t = new Tile(i));
    //toss(t);
    t.loc = t.dest
  }

  gridLocs = [];

  locked = [];
  setColors();
  tiles = shuffle(tiles);
  for (let i = 0; i < tiles.length; i++) {
    let d;
    gridLocs.push(d = new p5.Vector(i * 48 + 24 + 12, 25, 20));
    tiles[i].loc = createVector(width/2, height/2);
    tiles[i].dest = d;

    locked.push(undefined);
  }




  //endMessage = nums ? "Cheater!" : "Good Work!";

   setFocus(1);

}



function draw() {
  background(255);

  moveTiles();

  drawGrid();
  drawTiles();


  if( message != "")
    drawMessage();
  
  
  leftButton.position(tiles[mover].loc.x-leftButton.width/2,52)
  stopButton.position(tiles[mover].loc.x-leftButton.width/2,73)
  

}

function drawMessage() {
  fill(0, 120);
  rect(width / 2, height / 2, 576, height);


  fill(255,200);
  rect(width / 2, height / 2 - 2, width * .3, height * .6);
  fill(0);
  text(message, width / 2, height / 2);
}

function drawTiles() {
  for (let t of tiles) {

    t.paint();
  }
}

function setColors() {
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].color = color('hsb(' + int(i / tiles.length * 360) + ',70%,100%)');

  }
}

function moveTiles() {
  for (let t of tiles) {

    t.move();
  }
}

function setFocus(i){
  tiles[mover].border = color(0);
  
  mover = focus = i;
  tiles[mover].border = color(255,0,255);
  
}

function keyPressed() {
  
  
  
  if( message == STARTING_MESSAGE)
  {
    
   message = ""; 
    return;
    
  }
  else if( message != "")
  {
   message = ""; 
     init();
    return;
  }

  //  console.log(keyCode, LEFT);
  if (keyCode == LEFT_ARROW && mover > 0) {
    let hodor = tiles[mover];
    tiles[mover] = tiles[mover - 1];
    tiles[mover - 1] = hodor;
    
    tiles[mover].dest = gridLocs[mover];
    tiles[mover-1].dest = gridLocs[mover-1];

    mover--;
  }

  if (keyCode == RIGHT_ARROW && mover < tiles.length - 1) {
    let hodor = tiles[mover];
    tiles[mover] = tiles[mover + 1];
    tiles[mover + 1] = hodor;

    tiles[mover].dest = gridLocs[mover];
    tiles[mover+1].dest = gridLocs[mover+1];
    mover++;
    
    rightCount++;
  }
  
  if( key == " "){
    
    
    if( focus + 1<tiles.length)
   setFocus(focus+1);
    else if( inOrder()){
      message = "Sorted!";
     
      
      if(rightCount == 0)
        p.html(check +' ' + p.html());
        
      
    }else{
      message = ("Try Again")
      
      //init();
    }
    
  }
  
  if( key == "r"){
    init(); 
    
  }

}


function left(){
  if(message != ""){
    init(); 
    return;
  }
  if(mover==0)
    return;
  let hodor = tiles[mover];
    tiles[mover] = tiles[mover - 1];
    tiles[mover - 1] = hodor;
    
    tiles[mover].dest = gridLocs[mover];
    tiles[mover-1].dest = gridLocs[mover-1];

    mover--;
}

function next(){
  if(message != "")
    init(); 
    else if( focus + 1<tiles.length){
   setFocus(focus+1);}
    else if( inOrder()){
      message = "Sorted!";
     
      
      if(rightCount == 0)
        p.html(check +' ' + p.html());
        
      
    }else{
      message = ("Try Again")
      
      
      
      //init();
    }
}


function mousePressed() {
  if(mouseY > height)return;

  if( message == "")
  {
    
  }
  else if( message == STARTING_MESSAGE)
  {
    message = ""; 
  }
  else
  {
   message = ""; 
     init();
  }

}




function drawGrid() {

  strokeWeight(2);
  stroke(150);
  for (let i = 0; i < gridLocs.length; i++) {
    if (i != focus)
      fill(245);
    else
      fill(200);
    let loc = gridLocs[i];
    rect(loc.x, loc.y, 48, 48);

  }

}

function mouseDragged() {

}

function mouseReleased() {



}






function inOrder() {

  for (let i = 0; i < tiles.length - 1; i++) {
   
    if (tiles[i].value > tiles[i + 1].value)
      return false;
  }
  return true;
}