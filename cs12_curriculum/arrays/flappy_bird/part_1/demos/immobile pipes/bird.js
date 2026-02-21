class Bird{
  constructor(){
    this.x = 40;
    this.y = 85;
    this.w = 25;
    this.h = 18;
    
    this.yVect = 0;
    this.gravAccel = 0.3;
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
    this.yVect = -6;
  }
}