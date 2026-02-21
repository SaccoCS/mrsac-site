class Pipes {

  constructor(x, cY, gap) {
    this.x = x;
    this.centerY = cY;
    this.gapSize = gap;
    this.width = 78;
    this.xVect = -3;
  }


  paintSelf() {

    fill(0, 255, 0);
    rect(this.x, 0, this.width, this.centerY - this.gapSize / 2);
    rect(this.x, this.centerY + this.gapSize / 2, this.width, 550 - this.centerY - this.gapSize / 2);

    push();
    stroke(0, 255, 0, 45);
    strokeWeight(1);
    line(this.x, this.centerY, this.x + this.width, this.centerY);
    textSize(10);
    noStroke();
    fill(155);

    //   textSize(11);
    //   text("centerY",this.x + this.width+10,this.centerY);

    pop();
  }

  overlaps(bird, x, y, w, h) {
  
    if (bird.x + bird.w < x)
      return false;
    if (bird.x > x + w)
      return false;

    if (bird.y + bird.h < y)
      return false;
    if (bird.y > y + h)
      return false;

    return true;
  }


  overlapsBird(bird){
   // console.log(bird);
    let top=      this.overlaps(bird,this.x, 0, this.width, this.centerY - this.gapSize / 2);
    let bot=      this.overlaps(bird,this.x, this.centerY + this.gapSize / 2, this.width, 550 - this.centerY - this.gapSize / 2);
    return top||bot;
  }
  
  
  update() {
    this.x += this.xVect;
  }

  randomize() {
    this.centerY = random(50 + this.gapSize / 2, height - 50 - this.gapSize / 2);

  }

}