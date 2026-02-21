var focus = 1;
var mover = 1;
var STARTING_MESSAGE = "Click to Sort"
var check = '✔';

function setup() {
  createCanvas(600, 140);
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
   instructions = createP("<strong>Instructions:</strong><br/>As the program visits each location, use the mouse to decide which value should be swapped into that location.");
  instructions.style('font-family','monospace');
  instructions.style('font-size','12px');
  instructions.style('margin','2px');
  textFont('monospace');
  cycle = 0;

  document.oncontextmenu = function() {
    return false;
  }



  message = STARTING_MESSAGE;




  init();
  
   p = createP("If you make an error, use the 'R' key to reset the tiles");
  p.style('margin','2px');
  
  p.style('font-family','monospace');
  p.style('font-size','12px');

}

function init() {
  rightCount = 0
  enable = true;
  tiles = [];
  for (let i = 0; i < 10; i++) {
    let t;
    tiles.push(t = new Tile(int(random(16))));
    //toss(t);
    t.loc = t.dest
  }

  gridLocs = [];

  locked = [];
  setColors();
  tiles = shuffle(tiles);
  for (let i = 0; i < tiles.length; i++) {
    let d;
    gridLocs.push(d = new p5.Vector(i * 48 + 24 + 12+30, 25, 20));
    tiles[i].loc = createVector(width/2, height/2);
    tiles[i].dest = d;

    locked.push(undefined);
  }




  //endMessage = nums ? "Cheater!" : "Good Work!";

   setFocus(0);

}



function draw() {
  background(255);
// translate(30,0)
  moveTiles();

  drawGrid();
  drawTiles();


  if( message != "")
    drawMessage();
  else
    drawFocusArrow();
  
  

}

function drawFocusArrow(){
  let loc = gridLocs[focus];
  textSize(40)
  text("🠕",loc.x,loc.y+50)
  textSize(18)
  text("Which tile\ngoes here?",loc.x,loc.y+80)
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

//   //  console.log(keyCode, LEFT);
//   if (keyCode == LEFT_ARROW && mover > 0) {
//     let hodor = tiles[mover];
//     tiles[mover] = tiles[mover - 1];
//     tiles[mover - 1] = hodor;
    
//     tiles[mover].dest = gridLocs[mover];
//     tiles[mover-1].dest = gridLocs[mover-1];

//     mover--;
//   }

//   if (keyCode == RIGHT_ARROW && mover < tiles.length - 1) {
//     let hodor = tiles[mover];
//     tiles[mover] = tiles[mover + 1];
//     tiles[mover + 1] = hodor;

//     tiles[mover].dest = gridLocs[mover];
//     tiles[mover+1].dest = gridLocs[mover+1];
//     mover++;
    
//     rightCount++;
//   }
  
//   if( key == " "){
    
    
//     if( focus + 1<tiles.length)
//    setFocus(focus+1);
//     else if( inOrder()){
//       message = "Sorted!";
     
      
//       if(rightCount == 0)
//         p.html(check +' ' + p.html());
        
      
//     }else{
//       message = ("Try Again")
      
//       //init();
//     }
    
//   }
  
  if( key == "r"){
    init(); 
    
  }

}



function mousePressed() {
  
  
  

  if( message == "")
  {
    let found=false;
  tiles.forEach((e,i)=>{
    if(i<focus)
      return;
    //if a tile is clicked
    if( dist(e.loc.x,e.loc.y,mouseX,mouseY) < 24){
      found = true;
      // console.log("swapping "+i +" and "+focus)
      let hodor = tiles[i];
      tiles[i] = tiles[focus];
      tiles[focus] = hodor;

      tiles[focus].dest = gridLocs[focus];
      tiles[i].dest = gridLocs[i];
      //swap with focus
      //increase focusIndex
      // let fLoc = g
      
     // console.log(tiles)
      
      
      
    }
  })
  if( found){
      focus++;
    if(focus>= tiles.length-1){
      if(inOrder())
      message = "Good Job"
      else
        message = "Try Again"
    }
  
  }
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