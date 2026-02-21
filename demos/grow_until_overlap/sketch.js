function setup() {
  createCanvas(300, 200);
  strokeWeight(2);
  init();
  count = 0

}

function draw() {
  background(0);
  noStroke();
  

  let a = false;
  for (let c of list) {
    c.paint();

    c.grow();

    a = a || c.active;
  }

  if (!a) {
    if (count++ > 130) {
      init();
      count = 0;
    }

  }

  for (let c of list) {

    for (let c2 of list) {
      if (c == c2)
        continue;

      if (c.overlaps(c2)) {
        c.stop();
        c2.stop();
      }
    }
  }
}

function mousePressed() {

  init()
}

function init() {
  list = [];
  for (let i = 0; i < 50; i++)
    list.push(new Circle());
}

function Circle() {

//colorMode(HSB);
  this.x = random(width);
  this.y = random(height);
  this.size = 3;
  this.active = true;
  this.c = color( random(360), random(360), random(360));
  this.rate = random(.1,1.8);
  this.paint = () => {
   
   
fill(this.c); 
    ellipse(this.x, this.y, this.size, this.size);
  }

  this.grow = () => {
    if (this.active)
      this.size += this.rate;

  }

  this.stop = () => {

    this.active = false;
  }


  this.overlaps = (other) => {

    return 2 * dist(this.x, this.y, other.x, other.y) < this.size + other.size;

  }
}