class Orb{
  
  constructor(x,y,r){
    this.pos = createVector(x,y);
    var speed = 0
    this.vel = createVector(random(-speed,speed),random(-speed,speed));
    this.accel = createVector(0,0);
    this.r = r;
    this.color = color('red');
    this.isStationary = false;
  
  
   this.draw = function()
   {
     ellipseMode(CENTER);
     ellipse(this.pos.x,this.pos.y,this.r);
   }
   
   this.randomLoc = function(){
    this.pos.x = random(this.r/2,600-this.r/2);
    this.pos.y = random(this.r/2,600-this.r/2);
   }
  
   this.attract = function(other){
     if(other.isStationary)
       return;
     
     var g = 0.00005;
     
     
     let force = p5.Vector.sub(this.pos,other.pos).normalize();
     let dist1 = dist(this.pos.x,this.pos.y,other.pos.x,other.pos.y);
     let m = g*this.r*other.r/(dist1*dist1);
     force.mag(m);
     
     other.applyForce(force)
     
     
     
     
   }
   
   this.applyForce = function(force){
     this.accel.add(force);
   }
   
   this.update = function(){
      this.vel.add(this.accel);
     this.pos.add(this.vel);
     this.accel.mult(0);
     
   }
   
 
}
}