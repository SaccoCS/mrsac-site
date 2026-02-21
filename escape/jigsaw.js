class Jigsaw{
  
  constructor(img, numRows, numCols){
    this.img = img;
    this.numRows = numRows;
    this.numCols = numCols;
    this.loc = createVector(width/2,height*0.3)
    
    
    
    this.pSize = min(floor(img.width/numCols),floor(img.height/numRows))
    
    
    
    this.pieces = [];
    this.allPieces = [];    
    this.generatePieces();
    
    
    this.selected = undefined;
  }
  
  movePieces(){
    this.allPieces.forEach( p =>{
      p.move();
   })
  }
  
  getWidth(){
    return this.numCols*this.pSize;
  }
  
  getHeight(){
    return this.numRows*this.pSize;
  }
  
  generatePieces(){
    this.pieces = [];
    this.allPieces = [];
    for (let r = 0; r < this.numRows; r++) {
      this.pieces[r] = [];
      for (let c = 0; c < this.numCols; c++) {
        this.pieces[r].push(new Piece(r,c,this));
        this.allPieces.push(this.pieces[r][c]);
      }
    }

    for (let r = 0; r < this.numRows; r++) {
      for (let c = 0; c < this.numCols; c++) {
        if (c < this.numCols - 1) {
          let left = this.pieces[r][c];
          let right = this.pieces[r][c + 1];
          let leftHole = random() < 0.5;

          left.sides[3] = leftHole ? 1 : -1;
          right.sides[2] = leftHole ? -1 : 1;
        }

        if (r < this.numRows - 1) {
          let top = this.pieces[r][c];
          let bot = this.pieces[r + 1][c];
          let topHole = random() < 0.5;

          top.sides[1] = topHole ? 1 : -1;
          bot.sides[0] = topHole ? -1 : 1;
        }
      }
    }
    
    
    
    //IMAGES
     this.allPieces.forEach( p =>{
     p.generateImage();
   })
    
  }
  
  applyPoints(pts){
    
  }
  
  draw(){
    push()
    translate(this.loc.x,this.loc.y)
   this.allPieces.forEach( p =>{
     p.paint();
   })
    
    fill(222,99,0)
    if(this.isSolved() )
      fill('green')
    circle(0,0,20)
    
    
    this.drawSolutions()
    
    if(this.selected){
      fill(0,255,0)
    circle(this.selected.sol.x,this.selected.sol.y,10)
    }
    pop();
    
    
    this.movePieces();
    
    this.moveSelected();
    
    
  }
  
  
  drawSolutions(){
    this.allPieces.forEach( p =>{
     p.paintSolution();
   })
  }
  
  broadcastState(){
     if(phase != JIGSAW)return;
     
    let arr = [];
      for(let r = 0; r<this.numRows; r++)
        for(let c = 0; c<this.numCols; c++){
          let p = this.pieces[r][c];
          if(p.dest)
      arr.push({x:p.dest.x,y:p.dest.y});
          else
      arr.push({x:p.loc.x,y:p.loc.y});
    }
    socket.emit("jigsaw_progress",{progress: this.numSolved(),id:this.id,points:arr})
  }
  
  
  moveSelected(){
    if(this.selected != undefined){    
      this.selected.loc.x = mouseX-this.loc.x;
      this.selected.loc.y = mouseY-this.loc.y;
    
    }
  }
  
    mousePressed() {
      
      if(this.isSolved()){
        this.broadcastState();
        return;
      }
      
      
      
//         if(myClue)
//           return;
        let ind = -1;
        this.allPieces.forEach((p, i) => {
          // if(dist(mouseX,mouseY,p.x,p.y) < 30){
          if (p.containsMouse()) {
            this.selected = p;
            ind = i;
          }
        });

        if (this.selected) {
          let sp = this.allPieces.splice(ind, 1);
          this.allPieces.push(sp[0]);
          
          this.selected.loc.x = mouseX-this.loc.x;
          this.selected.loc.y = mouseY-this.loc.y;
          this.selected.dest = undefined;
        }
  }

  mouseReleased() {
    if (this.selected != undefined && this.selected.isSolved()) {
      this.selected.dest = this.selected.sol.copy();

      let pi = this.allPieces.splice(this.allPieces.indexOf(this.selected), 1)[0];
      this.allPieces.splice(0, 0, pi);
      this.broadcastState();
      // console.log(this.numSolved())

  }
    this.selected = undefined;
  
  

  } 
  
  isSolved(){
    return this.numSolved() == this.numRows*this.numCols;
  }
  
  
  numSolved(){
    let count = 0;
    for(let p of this.allPieces){
      if(p.isSolved() && p != this.selected && p.dest == undefined)
        count++
    }
    return count;
  }
}



class Piece{
  constructor(row, col, parent){
    this.row = row;
    this.col = col;
    this.parent = parent;
    this.sides = [0,0,0,0];
    
    this.pSize = this.parent.pSize;
    
    let x = this.pSize/2 + this.pSize*this.col;
    x -= this.parent.getWidth()/2
    let y = this.pSize/2 + this.pSize*this.row
     y -= this.parent.getHeight()/2
    this.sol = createVector(x,y);
    this.loc = createVector(x,y);
    this.dest = createVector(x,y);
   // this.scatter()
  }
  
  scatter(){
    let x = random(-this.parent.getWidth()*0.6,this.parent.getWidth()*0.6)
    let y = random(this.parent.getHeight()*0.6, this.parent.loc.y + this.parent.getHeight())
    this.dest = createVector(x,y)
  }
  
  generateImage(){
  let pSize = this.pSize;
     if(this.img != undefined)return;
    this.img = new p5.Image(pSize*3,pSize*3);
    
    
    let x = this.pSize*this.col-this.pSize;
    let y = this.pSize*this.row-this.pSize;
    
    this.img.copy(this.parent.img, x,y,pSize*3,pSize*3,0,0,pSize*3,pSize*3);
    
    
    this.mask = createGraphics(pSize*3,pSize*3);
    this.mask.fill(255,0,0,255)
    
    this.mask.rectMode(CENTER);
    this.mask.translate(pSize*1.5,pSize*1.5)
    this.mask.square(0,0,pSize)
    
    if(this.sides[0] != 0){        
      if( this.sides[0] < 0)
      this.mask.erase();
      this.mask.circle(0,(-0.5-this.sides[0]*0.12)*pSize,pSize*0.4)
      this.mask.noErase()    
    }    
    if(this.sides[1] != 0){      
      if( this.sides[1] < 0)
      this.mask.erase();
      this.mask.circle(0,(0.5+this.sides[1]*0.12)*pSize,pSize*0.4)
      this.mask.noErase()  
    }    
    if(this.sides[2] != 0){
      if( this.sides[2] < 0)
      this.mask.erase();
      this.mask.circle((-0.5-this.sides[2]*0.12)*pSize,0,pSize*0.4)
      this.mask.noErase()
    }    
    if(this.sides[3] != 0){
      if( this.sides[3] < 0)
      this.mask.erase();
      this.mask.circle((0.5+this.sides[3]*0.12)*pSize,0,pSize*0.4)
      this.mask.noErase()
    }
    
    
    this.img.mask(this.mask);
  }
  
  
  paint(){
    imageMode(CENTER)
   
    let x = this.loc.x;
    let y = this.loc.y;
    
    fill(255);
    if(keyIsDown(CONTROL))
   image(this.img,x,y,this.pSize*3,this.pSize*3)
      else
    rect(x,y,this.pSize,this.pSize)
    
    if(this.isSolved())
    fill(222,0,99)
    else
      fill(255)
    circle(x,y,20)
    // this.paintSolution();
  }
  
  paintSolution(){
    noFill();
    stroke(100,30)
    
    square(this.sol.x,this.sol.y,this.pSize)
    
    
  }
  
  isSolved(){
    return abs( this.sol.x-this.loc.x )+abs( this.sol.y-this.loc.y ) <this.pSize*0.8;
  }
  
  move(){
    if(this.dest == undefined)
      return;
    
    // if(this.loc.x +this.parent.x < 0 ||this.loc.y +this.parent.y < 0 ||this.loc.x +this.parent.x >width ||this.loc.y +this.parent.y >height)
    //     this.loc.lerp(this.sol,0.2) 
    
    if((abs( this.dest.x-this.loc.x )+abs( this.loc.y-this.dest.y ) > 1)){
        this.loc.lerp(this.dest,0.06)
      }
    else{
      this.loc = this.dest.copy();
      this.dest = undefined;
      // console.log(this.dest)
    }
  }
  
  
  
  
  containsMouse(){
    
      let mX = mouseX - this.parent.loc.x;
      let mY = mouseY - this.parent.loc.y;
      // let mX = mouseX 
      // let mY = mouseY 
   
    // fill(255,255,0)
    
     // console.log(max (abs(mX - this.loc.x) , abs(mY - this.loc.x) ))
    let s = this.pSize/2;
      if(mX < this.loc.x + s && mX > this.loc.x - s && mY < this.loc.y + s && mY > this.loc.y - s )
        return true;
    else
      return false;
  }
}