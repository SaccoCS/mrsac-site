class Spawner{
  constructor(x,y,delay){
    this.pos = createVector(x,y);
    this.count = 0;
    this.delay = delay;
    
    
    
    this.draw = function(){
      ellipseMode(CENTER);
      fill(0,0,0,50);
      ellipse(x,y,30);
    }
  
 this.update = function(){
  
    if(this.count > 0)
      this.count--;
    else
      {
         this.count = this.delay;
          return new Vehicle(this.pos.x,this.pos.y);
        }
    return null;
    
  }
  }
}