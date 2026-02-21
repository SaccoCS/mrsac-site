class Circ{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  
  paint(){
    let s = sin(frameCount+this.x+this.y);
    let r = map(s,-1,1,4,14);
   
   
    circle(this.x,this.y,r)
  }
}