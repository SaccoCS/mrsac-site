let size = 18;
let slices = [];

function setup() {
  lower = createButton('Search lower half');
  lower.mousePressed(low);

  upper = createButton('Search upper half');
  upper.mousePressed(high);

  rev = createCheckbox("Show all numbers");
  
  resetBut = createButton('Reset');  
  resetBut.mousePressed(init);
  
  createCanvas(920, 240);
  strokeWeight(2);
  textAlign(CENTER);
  init();
}

function init() {
  let min = random(0, 40)
  let max = random(50, 100)
  list = [];
  slices = []
  for (let i = 0; i < 42; i++) {
    list.push(new Slot(30 + i * (size + 5), 30, int(random(min, max))))
  }
  list = list.sort((a, b) => {
    return a.val - b.val;
  })
  for (let i = 0; i < list.length; i++) {
    list[i].x = 30 + i * (size + 3);
  }
  mindex = 0;
  maxdex = list.length - 1;
  slices.push({
    mindex,
    maxdex
  });


  toFind = random(list).val
}

function draw() {
  background(255);
  fill(0)
  textSize(18)
  noStroke();
  text("Binary Search\nGoal: Find " + toFind, width / 2, 20);
  translate(0, 40)

  //drawList(list,30,30)

  for (let i = 0; i < slices.length; i++) {
    drawSlice(slices[i]);
    translate(0, 30)
  }

}

function drawList(list, x, y) {
  for (let i = 0; i < list.length; i++) {
    list[i].show();
  }
}

function drawSlice(slice) {
  let mindex = slice.mindex;
  let maxdex = slice.maxdex;
  let middex = mindex + int((maxdex - mindex) / 2);
  list[middex].reveal = true;
  for (let i = mindex; i <= maxdex; i++) {
    let ent = list[i];
    if (i == middex) {
      ent.tar();
    } else if (rev.checked() || keyIsDown(16)) {
      ent.show();
    } else {
      ent.blank();
    }
  }
}

function mousePressed() {
  for (let x of list) {
    if (x.containsMouse()) {
      x.reveal = true;
    }
  }
}

function low() {
  if (mindex >= maxdex)
    return
  let middex = mindex + int((maxdex - mindex) / 2);
  maxdex = middex - 1
  slices.push({
    mindex,
    maxdex
  });
}

function high() {
  if (mindex >= maxdex)
    return
  let middex = mindex + int((maxdex - mindex) / 2);
  mindex = middex + 1
  slices.push({
    mindex,
    maxdex
  });
}

function keyPressed() {
  if (keyCode == 37)
    low();
  if (keyCode == 39)
    high();

  if (keyCode == 38) {
    if (slices.length > 1) {
      slices.splice(slices.length - 1, 1)
      var c = slices[slices.length - 1];
      mindex = c.mindex;
      maxdex = c.maxdex;
    } else {
      init();
    }
  }
  if (keyCode == 32)
    init();
}


class Slot {
  constructor(x, y, val) {
    this.reveal = true;
    this.x = x;
    this.y = y;
    this.val = val
    this.size = 18;
  }

  show() {

    line(this.x - this.size / 2, this.y, this.x + this.size / 2, this.y);
    line(this.x - this.size / 2, this.y, this.x - this.size / 2, this.y - 3);
    line(this.x + this.size / 2, this.y, this.x + this.size / 2, this.y - 3);

    if (!this.reveal) {
      fill(222)

      rect(this.x - this.size / 2, this.y - this.size, this.size)
    } else {
      textSize(12)

      if (this.val != toFind)
        fill(0);
      else {
        fill(0, 0, 190)

        textSize(16)
      }
      noStroke()
      text(this.val, this.x, this.y - 4);
    }

    // noFill();
    // circle(this.centerPoint().x,this.centerPoint().y,20);

  }

  blank() {
    fill(222)
    stroke(0)
    rect(this.x - this.size / 2, this.y - this.size, this.size)
  }

  tar() {
    stroke(255, 0, 0)
    this.show()
  }

  centerPoint() {
    return createVector(this.x, this.y - this.size / 2);

  }

  containsMouse() {
    let cp = this.centerPoint();
    return cp.dist(createVector(mouseX, mouseY)) < 10;
  }

}