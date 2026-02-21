function Tile(val) {

  this.loc = new p5.Vector(width / 2, height / 2);
  this.dest = new p5.Vector(100, 100);
  this.value = val;
  this.onArrival = undefined;
  this.color = -1;
  this.showVal = false;



  this.paint = () => {
    strokeWeight(2);

    if (this.color!=-1) {
    //  colorMode(HSB);
      fill(this.color);
    //  colorMode(RGB);
    } else {
      fill(255);
    }
    rect(this.loc.x, this.loc.y, 36, 36,5);

    fill(0);
    // if (this.color!=-1 ){
    //   colorMode(HSB);
    //   fill(this.color, 255, 255);
    //   colorMode(RGB);
    // }

    textSize(22);
if(this.showVal)
    text(this.value, this.loc.x, this.loc.y + 2)
  }



  this.move = () => {


    if (this.dest != undefined) {
      this.loc = p5.Vector.lerp(this.loc, this.dest, 0.15);

      if (this.loc.dist(this.dest) < 1) {
        this.loc = this.dest;
        this.dest = undefined;

        if (this.onArrival) {
          this.onArrival();
          this.onArrival = undefined;

        }

      }
    }


  }

  this.contains = (x, y) => {
    return x > this.loc.x - 18 && x < this.loc.x + 18 && y > this.loc.y - 18 && y < this.loc.y + 18;


  }

  this.isMoving = () => {
    return this.dest != undefined;
  }


}