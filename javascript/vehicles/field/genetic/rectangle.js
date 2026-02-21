class Rectangle {

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(x, y) {
    return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;
  }
  
  overlaps(rect){
    if(this.x+this.w+8<rect.x || this.y+this.h+8<rect.y || rect.x+rect.w+8<this.x || rect.y+rect.h+8<this.y )
      return false;
    return true;
  }

  draw() {
    fill(245);
    rectMode(CORNER);
    rect(this.x, this.y, this.w, this.h);
  }

  abs(){
    if(this.w < 0)
        this.x += this.w;
    if(this.h < 0)
        this.y += this.h;
    this.w = abs(this.w);
    this.h = abs(this.h);
  }
}