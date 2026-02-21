class Bird{
  constructor(){
    this.x = 80;
    this.y = 175;
    this.w = 51;
    this.h = 36;
    
    this.yVect = 0;
    this.gravAccel = 0.6;
  }
  
  
  paintSelf(){
    fill(255,0,0);
    rect(this.x,this.y,this.w,this.h);
  }
  
  update(){
    
    this.y += this.yVect;
    this.yVect += this.gravAccel;
  }
  
  flap(){
    this.yVect = -8;
  }
}