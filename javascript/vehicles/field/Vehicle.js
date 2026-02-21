class Vehicle{

    constructor() {
      this.pos = createVector(windowWidth / 2, windowHeight / 2);
      this.randVect();

      this.maxSpeed = 8;//random(3, 6);

    this.isActive = true;



    }

//     desiredVect() {
//       var vect = createVector(destX - this.pos.x, destY - this.pos.y);
//       return vect;
//     }



    draw() {
      ellipseMode(CENTER);

      ellipse(this.pos.x, this.pos.y, 11, 11);

      line(this.pos.x - 0.5, this.pos.y - 0.5, this.pos.x + 2 * this.vel.x, this.pos.y + 2 * this.vel.y);
      
      
    }

    update() {
      this.pos.add(this.vel);
//       this.steer();

    }

   randVect() {
      this.vel = createVector(random(-5, 5), random(-5, 5));
    }


  steer(vect){
    vect = vect.copy();
    vect.setMag(1.5);
     var len = this.vel.mag();
      this.vel.add(vect);
      this.vel.setMag(this.maxSpeed);
  }
  
//     steer() {
//       var des = this.desiredVect();
//       des.setMag(0.2);
//       var len = this.vel.mag();
//       this.vel.add(des);
//       this.vel.limit(this.maxSpeed);


//     }
}