class Num{
  constructor(val,x,y){
    this.val = val;
    this.x = BOX_WID/2+3;
    this.y = BOX_WID/2+3;
    
    this.fill = "white";
    this.numFill = "black"
    
    if(x) this.x = x;
    if(y) this.y = y;
  }
  
  paint(){
   noStroke()
    let x = this.x;;
    let y = this.y;
    
    if(this.arc){
      let pos = this.arc.loc();
      x = pos.x;
      y = pos.y;
    }
    textSize(BOX_WID*0.6)
    fill(this.fill);
    square(x,y,BOX_WID,4);
    
    fill(this.numFill)
    textAlign(CENTER,CENTER);
    text(this.val,x, y+1)
  }
}