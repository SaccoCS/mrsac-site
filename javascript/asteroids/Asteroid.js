class Asteroid {
  constructor() {
    this.pos = createVector(width/2,height/2);
    this.vel = p5.Vector.random2D();//createVector(random(-5,5),random(-5,5));
    this.size = 20;
    this.speed = random(1,5);
    this.vel.setMag(this.speed);

  }

  draw() {
    rectMode(CENTER);
    rect(this.pos.x,this.pos.y,this.size,this.size);
  }

update(){
  this.pos.add(this.vel);
}


}