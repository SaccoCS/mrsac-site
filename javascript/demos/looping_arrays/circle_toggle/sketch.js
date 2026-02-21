var states;

function setup() {
  createCanvas(426, 61);
  textAlign(CENTER, CENTER);
  textSize(18);
  strokeWeight(4);
  states = [true, false, true, false, true, false];
}

function draw() {
  background(99);

  for (var i = 0; i < 6; i++) {

    var x = 70 * i + 35;

    if (states[i]) {
      fill(255);
      stroke(0);
    } else {
      fill(0);
      stroke(255);
    }

    ellipse(x, 30, 40);

   


  }

}

var states;

function setup() {
  createCanvas(426, 61);
  textAlign(CENTER, CENTER);
  textSize(18);
  strokeWeight(4);
  states = [true, false, true, false, true, false];
}

function draw() {
  background(99);

  for (var i = 0; i < 6; i++) {

    var x = 70 * i + 35;

    if (states[i]) {
      fill(255);
      stroke(0);
    } else {
      fill(0);
      stroke(255);
    }

    ellipse(x, 30, 40);




  }

}

function mousePressed() {
  var i =0;
  for (let s of states) {
var x = 70 * i + 35;
    if(dist(x,40,mouseX,mouseY)<20)
    {
     states[i] =(states[i]+9)%2
    }
    
    i++
  }
}