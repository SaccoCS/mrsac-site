var field;
var vehicles = [];
var frames;

function setup() {
  createCanvas(851, 551);
  field = new FlowField(55, 85);

  console.log(mouseX);

  frameRate(30);
  frames = createP(frameRate());
}


function mousePressed() {
  let v = new Vehicle();
  v.pos = createVector(mouseX, mouseY);
  v.randVect();
  vehicles.push(v);
}


function removeInactives() {
  for (let i = vehicles.length - 1; i >= 0; i--) {
    let v = vehicles[i];
    if (!v.isActive)
      vehicles.splice(i, 1);
  }
}


function draw() {
  background(200);
  //field.draw();

  for (let index = 0; index < vehicles.length; index++) {
    let element = vehicles[index];

    element.draw();

  }



  frames.html(frameRate());



  for (let index = vehicles.length - 1; index >= 0; index--) {
    let v = vehicles[index];


    v.update();
    if (!field.isValid(v.pos.y / 10, v.pos.x / 10)) {
      v.isActive = false;

      let v2 = new Vehicle();
      v2.pos = createVector(mouseX, mouseY);
      v2.randVect();
      vehicles.push(v2);
      continue;
    }
    try {
      let vect = field.get(v.pos.y / 10, v.pos.x / 10);
      v.steer(vect);
    } catch (error) {
      console.log(v.pos);

    }

    if (!v.isActive) {
      vehicles.splice(index, 1);

      console.log(index);
      let v2 = new Vehicle();
      v2.pos = createVector(mouseX, mouseY);
      v2.randVect();
      vehicles.push(v2);
    }
  }

  removeInactives();
}