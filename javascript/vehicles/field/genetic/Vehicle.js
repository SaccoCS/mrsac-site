class Vehicle {

  constructor() {
    this.pos = createVector(windowWidth / 2, windowHeight / 2);
 

    this.maxSpeed = 5; //random(3, 6);

    this.isActive = true;

    this.field = new FlowField(55, 85);
    this.vel = createVector(0, 0);
    
    this.score = -1;
    this.hitBonus = 1;
    this.closeBonus = 0;
    this.minDist = Infinity;
    
    this.prevPos = this.pos;
  }

  //     desiredVect() {
  //       var vect = createVector(destX - this.pos.x, destY - this.pos.y);
  //       return vect;
  //     }


  

  draw() {
    fill(200,100);
    ellipseMode(CENTER);

    ellipse(this.pos.x, this.pos.y, 7, 7);

    line(this.pos.x - 0.5, this.pos.y - 0.5, this.pos.x + 1.5 * this.vel.x, this.pos.y + 1.5 * this.vel.y);


  }

  update() {
    this.prevPos = this.pos.copy();
    this.pos.add(this.vel);
    //       this.steer();

  }

  randVect() {
    this.vel = createVector(random(-5, 5), random(-5, 5));
  }

  recordDist(d){
    if(d<this.minDist)
      this.minDist = d;
  }

  steer(vect) {
    vect = vect.copy();
    vect.setMag(0.7);
    var len = this.vel.mag();
    this.vel.add(vect);
    this.vel.setMag(this.maxSpeed);
  }

  steerField() {
    try {

      let vect = this.field.get(this.pos.y / 10, this.pos.x / 10);
     // console.log(vect);
      this.steer(vect);
    } catch (error) {
    //  console.log(this.field.vectors);
      console.log(error);

    }
  }

  //     steer() {
  //       var des = this.desiredVect();
  //       des.setMag(0.2);
  //       var len = this.vel.mag();
  //       this.vel.add(des);
  //       this.vel.limit(this.maxSpeed);


  //     }
}