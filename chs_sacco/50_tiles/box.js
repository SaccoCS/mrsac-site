class Box{  
 constructor(){
   this.loc = createVector(50,50);
   this.w = 20;
   this.h = 20;
   
   this.color = color(random(255),random(255),random(255));
   
   
     
   
   this.dest = createVector(150,350);
  }
  
  draw(){
    stroke(0);
    strokeWeight(1);
   fill(this.color);
    rect(this.loc.x,this.loc.y,this.w,this.h);
  }
  
  update(){
    if( this.dest != undefined)
    {
      this.loc.lerp(this.dest,0.1);
      
      if(this.loc.dist(this.dest)<1)
      {
        this.loc = this.dest;
        this.dest = undefined;
      }
        
      
     
    }
  }
  
}