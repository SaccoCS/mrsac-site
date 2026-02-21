
function setup() {
  randomSeed(2222)
   frameRate(10);
  d2 = createDiv();
  d2.style('display','inline-block');
  
  inst = createDiv("");
  inst.style('width','400px')
  inst.hide();
  
  d = createDiv("");
  d.hide()
  d.style('width','100px')
  d.style('display','inline-block')
  d.style('margin-left','10px')
  size = 16;
  numRows = 15;
  numCols = 15;
  can = createCanvas(size * numCols + 2, size * numRows + 2);
  can.style('margin-top','5px')
  d2.style('float','left')

  cnBut = createButton("Next")
  cnBut.hide();
  d2.child(can)
  d2.child(cnBut)
  
  cnBut.mousePressed(()=>{
    if(locList.length>0)
    chooseNext();
   // updateList();
  })
  
  resetBut = createButton("Reset");
  d2.child(resetBut);
  
  d2.child(inst);
  resetBut.mousePressed(()=>{
    init();
    
  })

  
  init();
}

function init(){
  
  locList = [new Loc(0,0)];
  //fupdateList();
  vBorders = gridMe(numRows, numCols, true)
  hBorders = gridMe(numRows, numCols, true)
  visited = gridMe(numRows,numCols,false);
  visited[0][0]=true;
  
  currentIndex = 0;
}

function draw() {
  background(222);
  translate(1,1);
  noFill()
  rect(0,0,width-2,height-2)
  drawVisited();
  drawPath();
  drawWalls();
  drawCurrent()
  //drawNext();
  
if(locList.length>0)
    chooseNext();
  else
    init();
    //updateList();
}

function updateList(){
  let str = "<strong>Locations<strong>";
  for(let loc of locList){
    str += `<br>[${loc.r},${loc.c}]`;
  }
  
  if(locList.length == 0)
    str += "<br>FINISHED"
  
  
  d.html(str);
  
}

function drawPath(){
  for(let l of locList){
break;
    let x = l.c*size;
    let y = l.r*size;
    fill(222)
    noStroke();
    circle(x+size/2,y+size/2,size*.3);
    
  }
  
  stroke(255,0,0);
  strokeWeight(3);
  for(let i in locList){
    
    if(i>0){
      let x = locList[i-1].c*size+size/2;
    let y = locList[i-1].r*size+size/2;
      let x2 = locList[i].c*size+size/2;
    let y2 = locList[i].r*size+size/2;
      
      line(x,y,x2,y2)
    }
  }
}

function drawNext(){
  let list = avail();
  for(let loc of list){
    let x = loc.c*size;
    let y = loc.r*size;
    fill(222)
    square(x,y,size);
  }
}

function chooseNext(){
  
  let cur = current();
  let list = avail();
  if(list.length == 0 || cur.r == numRows-1 && cur.c == numCols -1){

    locList.splice(currentIndex,1);
    currentIndex = floor(random(locList.length))
   currentIndex = (locList.length-1)
    return;
  }
  
  let r = random(list);
  open(r,cur);
  visited[r.r][r.c] = true;
  locList.push(r);
  currentIndex = locList.length-1;
  //  currentIndex = floor(random(locList.length))
  
}

function open(a,b){
  // console
  // if(dist(a.r,a.c,b.r,b.c) != 1)
  //   return;
    
  if(a.r < b.r || a.c < b.c)
    open(b,a);
  
  if( a.r > b.r){
    hBorders[b.r][b.c] = false;
    
  }
  if(a.c > b.c){
    vBorders[b.r][b.c] = false;
  }
}

function current(){
  
  return locList.length==0?new Loc(0,0):locList[currentIndex];
}

function avail(){
  let cu = current();
  let r = cu.r;
  let c = cu.c;
  let list = [];
  if(r>0 && visited[r-1][c] == false)
    list.push({r:r-1,c})
  if(c>0 && visited[r][c-1] == false)
    list.push({r,c:c-1})
  if(r<numRows-1 && visited[r+1][c] == false)
    list.push({r:r+1,c})
  if(c<numCols-1 && visited[r][c+1] == false)
    list.push({r,c:c+1})
    
  return list;
}

function drawVisited(){
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      let x = size*c;
      let y = size*r;
      fill(255);
      noStroke()
      if(visited[r][c]){
        rect(x,y,size)
      }
    }
  }
  
  
}


function drawCurrent() {
  let x = size*current().c;
  let y = size*current().r;
  strokeWeight(2)
  fill(0);
  circle(x+size/2,y+size/2,size*.6);
}


function drawWalls() {
stroke(0)
  strokeWeight(2);
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      let x = size*c;
      let y = size*r;
      if(hBorders[r][c]){
        line(x+size,y+size,x,y+size)
      }
      if(vBorders[r][c]){
        line(x+size,y,x+size,y+size)
      }
    }
  }
}

function gridMe(rows, cols, val) {
  let grid = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      grid[r][c] = val;
    }
  }
  return grid;
}



class Loc {
  constructor(r, c) {
    this.r = r;
    this.c = c;
  }
}