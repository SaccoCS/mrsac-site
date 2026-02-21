function setup() {
  createCanvas(200, 200);
  frameRate(2);
  list = [];
  for (let i = 0; i < 16; i++) {
    list.push({
      x: width / 2 + .4 * width * cos(i * TWO_PI / 16),
      y: height / 2 + .4 * height * sin(i * TWO_PI / 16),

    });
  }

  index = 0;
  fillLast = false;
}

function draw() {
  background(220);



  strokeWeight(3);
index%=list.length

  for (let i = 0; i < index; i++) {
    let p = list[i];
    ellipse(p.x, p.y, 30, 30);
  }
  if (list.length > 0) {
    let loc = list[index];

    line(width / 2, height / 2, loc.x, loc.y);

    if (fillLast){
      ellipse(loc.x, loc.y, 30, 30);
      index++; 
    }
    else
      ellipse(loc.x, loc.y, 5, 5);
    
      ellipse(width / 2, height / 2, 5, 5);
  }



  fillLast = !fillLast;

}