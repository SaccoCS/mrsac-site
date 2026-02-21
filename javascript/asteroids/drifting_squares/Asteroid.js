class Asteroid {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = p5.Vector.random2D(); //createVector(random(-5,5),random(-5,5));
    this.size = 30;
    this.speed = random(1, 5);
    this.vel.setMag(this.speed);

    this.color = color(random(0, 256), random(0, 256), random(0, 256));
    this.color = color(25, 158, 189);
    
    this.angle = 0;//random(0,360);

  }


  randVect() {
    this.vel = p5.Vector.random2D();
    this.vel.setMag(this.speed);
  }

  draw() {
    push();
    rectMode(CENTER);
    fill(this.color);
    translate(this.pos.x, this.pos.y);
    angleMode(DEGREES);
    rotate(this.angle);
    rect(0,0, this.size, this.size);
    
    pop();
  }

  update() {
    this.pos.add(this.vel);
  }


}