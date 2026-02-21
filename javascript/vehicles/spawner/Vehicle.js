function Vehicle(x,y){
    this.pos = createVector(x,y);
    this.randVect(); 
    
    this.maxSpeed = random(4,6);
    this.maxForce = 0.2;

    this.accel = createVector(0,0);
    this.desiredVect = function() {
        var vect =  createVector(destX- this.pos.x  ,destY-this.pos.y );
        vect.limit(this.maxSpeed);
      
        return vect;
    }
    
    
}
  Vehicle.prototype.paint = function()
  {    
   ellipseMode(CENTER);
    fill(255,255,255);
      
   ellipse(this.pos.x,this.pos.y,11,11);
      
      line(this.pos.x-0.5,this.pos.y-0.5, this.pos.x+3*this.vel.x,this.pos.y+3*this.vel.y);
  }

  Vehicle.prototype.update = function()
  {
    
    this.vel.add(this.accel);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.accel.mult(0);
  //  this.steer();
    

  }

 Vehicle.prototype.randVect = function()
  {
      this.vel = createVector(random(-5,5),random(-5,5));
 }
 
 
 
 Vehicle.prototype.steer = function()
{
    var des = this.desiredVect();
    des.setMag(this.maxSpeed);
  //   var len = this.vel.mag();
  //   this.vel.add(des);
  //   this.vel.limit(this.maxSpeed);
      
    var steer = p5.Vector.sub(des,this.vel);
    steer.limit(this.maxForce);
    this.accel.add(steer);
}
