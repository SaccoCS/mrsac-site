class Asteroid {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = p5.Vector.random2D(); //createVector(random(-5,5),random(-5,5));
    this.size = random([15,25,35]);
    this.speed = random(0.5, 2);
    this.vel.setMag(this.speed);

    this.color = color(random(0, 256), random(0, 256), random(0, 256));
    this.color = color(25, 158, 189);
    
    this.angle = random(0,360);
    this.angSpeed = random(-4,4);
    
    this.img = random(roidImages);
    
    

  }


  randVect() {
    this.vel = p5.Vector.random2D();
    this.vel.setMag(this.speed);
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    push();
    
    angleMode(DEGREES);
    rotate(this.angle);
     imageMode(CENTER);
    image(this.img,0,0, this.size*1.4, this.size*1.4);
    pop();
     rectMode(CENTER);   
    noFill();
    stroke(this.color);
    strokeWeight(2);    
   // rect(0,0, this.size, this.size);
    
   
   
    pop();
    
  }

  update() {
    this.pos.add(this.vel);
    this.angle += this.angSpeed;
  }


}