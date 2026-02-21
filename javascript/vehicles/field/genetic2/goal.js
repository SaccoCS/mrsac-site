class Goal{
  
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.r = 25;
    this.w = 2*this.r;
    this.h = 2*this.r;
  }
  
  draw(){
    fill(51,100);
    ellipseMode(CENTER);
    ellipse(this.x,this.y,2*this.r);
  }
  
  distTo(v){
    return dist(v.pos.x,v.pos.y,this.x,this.y);
  }
  
  overlaps(rect)
  {
    
    return rect.overlaps(new Rectangle(this.x-this.r,this.y-this.r,this.w,this.h));
  }
}