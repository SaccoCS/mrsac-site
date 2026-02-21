var bList = [];
var onArrival;

var scores;

function setup() {
  let can = createCanvas(675, 140);
  textAlign(CENTER, CENTER);
  can.style('border', '1px solid black');
  //rectMode(CENTER);


  stroke(1);
  var num = 50;
  var wid = 10; //0.8*570/(num);
  for (var i = 0; i < num; i++) {
    var b = new Box();
    bList.push(b);

    b.dest = createVector(random(width), random(height));

    if (i < 14)
      b.color = 'orange';
    else
      b.color = 'blue';


    b.w = wid;
  }

  arrange(bList, 10, 20, 570);
}

function draw() {
  background(240);
  noStroke();
  fill(255, 160);
  rect(20, 70, 220, 60);
  rect(250, 70, 400, 60);
  rect(5, 15, 660, 30);

  stroke(240);
  strokeWeight(2);
  var x = 10 + 13 * 16 - 1;
  line(x, 0, x, 50);

  for (let b of bList) {
    b.draw();

    b.update();
  }




  textSize(18);
  noStroke();
  fill(0);


  if (scores) {
    text(scores[0], 220, 90);
    text(16, 220, 90 + 22);
    text(scores[2], 630, 90);
    text(34, 630, 90 + 22);

    stroke(0);

    line(210, 90 + 9, 230, 99);

    line(620, 90 + 9, 640, 99);
  }


  arrivalCheck();
}

function arrivalCheck() {

  var movin = false;
  for (let b of bList) {
    if (b.dest != undefined) {
      movin = true;
    }
  }

  if (movin == false && onArrival != undefined) {
    var call = onArrival;
    onArrival = undefined;
    call();
  }

}

function shuff() {
  bList = shuffle(bList);
  arrange(bList, 10, 20, 570);
}

let count = 0;

function mousePressed() {
  switch (count) {
    case 0:
      shuff();
      scores = undefined;
      onArrival = undefined;
      break;
    case 1:
      splitt();
      onArrival = function() {
        scores = getScores();
      }
      break;
  }
  count = (count + 1) % 2;
}

function getScores() {
  let s = [0, 0, 0, 0];
  for (var i = 0; i < bList.length; i++) {
    if (i < 16) {
      if (bList[i].color == 'orange')
        s[0]++;
      else
        s[1]++;
    } else {
      if (bList[i].color == 'orange')
        s[2]++;
      else
        s[3]++;
    }
  }

  return s;
}

function splitt() {

  let left = [];
  let right = [];
  for (var i = 0; i < bList.length; i++) {
    let b = bList[i];

    if (i < 16)
      left.push(b);
    else
      right.push(b);
  }

  rb(25, 78, left);
  rb(255, 78, right);

}

function rb(x, y, list) {
  var rX = x;
  var gX = x;
  for (var b of list) {
    if (b.color == 'orange') {
      b.dest = createVector(rX, y);
      rX += 13;
    } else {

      b.dest = createVector(gX, y + 24);
      gX += 13;
    }

  }
}

function arrange(list, x, y, w) {
  var spacing = 13; //(w-list[0].w)/list.length
  for (var i = 0; i < list.length; i++) {
    list[i].dest = createVector(x + i * spacing, y);
  }
}