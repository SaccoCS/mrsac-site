class Spaceship {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(0, 0);
    this.size = 23;

    this.color = color(25, 158, 189);


    this.angle = 90;


    this.img = shipImages[0];



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
    rotate(-this.angle);
    imageMode(CENTER);
    image(this.img, 0, 0, this.size * 1.4, this.size * 1.4);
    pop();

    rectMode(CENTER);
    noFill();
    stroke(this.color);
    strokeWeight(2);
   // rect(0, 0, this.size, this.size);

    pop();
    
    this.img = shipImages[0];

  }

  update() {
    this.pos.add(this.vel);

  }

  boost() {
    var boostStrength = 0.15;
    var maxSpeed = 7


    this.vel.x += boostStrength * cos((this.angle));
    this.vel.y -= boostStrength * sin((this.angle));

    var speedSqrd = this.vel.x * this.vel.x + this.vel.y * this.vel.y;
    if (speedSqrd > maxSpeed * maxSpeed) {
      var speed = sqrt(speedSqrd);
      this.vel.x = this.vel.x / speed * maxSpeed;
      this.vel.y = this.vel.y / speed * maxSpeed;
    }
    
    this.img = shipImages[1];
  }
  
  turnLeft(){
    this.angle += 5;
    
  }
  turnRight(){
    this.angle -= 5;
    
  }


}