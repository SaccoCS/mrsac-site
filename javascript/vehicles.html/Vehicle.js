function Vehicle(){
  this.pos = createVector(windowWidth/2,windowHeight/2);
    this.randVect();
    
    this.maxSpeed = 5;

    
    this.desiredVect = function()
    {
         var vect =  createVector(mouseX- this.pos.x  ,mouseY-this.pos.y );
    return vect;
    }
    
    
}
  Vehicle.prototype.paint = function()
  {    
   ellipseMode(CENTER);
      
   ellipse(this.pos.x,this.pos.y,11,11);
      
      line(this.pos.x-.5,this.pos.y-.5, this.pos.x+3*this.vel.x,this.pos.y+3*this.vel.y);
  }

  Vehicle.prototype.update = function()
  {
    this.pos.add(this.vel); 
      this.steer();

  }

 Vehicle.prototype.randVect = function()
  {
      this.vel = createVector(random(-5,5),random(-5,5));
 }
 
 
 
 Vehicle.prototype.steer = function()
{
    var des = this.desiredVect();
    des.setMag(.8);
     var len = this.vel.mag();
     this.vel.add(des);
     this.vel.setMag(this.maxSpeed);
     
    
}
