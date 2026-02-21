const UP = 1,DOWN = 2,DURATION = 40;
class Arc{
  constructor(a,b){
    this.sX = a.x;
    this.sY = a.y;
    this.eX = b.x;
    this.eY = b.y;
    
 
    
    this.startAngle = this.sX<=this.eX?180:0;
    
    this.startFrame = frameCount;
    
    
  }
  
  loc(){
    let perc = (frameCount-this.startFrame)/DURATION*100;
    if( perc > 100){
      perc = 100;
      this.finished = true;
    }
    
    let cX = (this.sX + this.eX)/2;
    let cY = (this.sY + this.eY)/2;
    let rad = (this.eX - this.sX)/2;
    
    let dy = 26;
    let x = map(perc,0,100,this.sX,this.eX);
    
    let ang = map(perc,0,100,0,180);
    ang += this.startAngle;
    let y = map(sin(ang),-1,1,cY-dy,cY+dy)
    
    return {x:x,y:y};
    
  }
  
  
}