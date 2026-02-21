let rows = [
  {
    data: [6,1, 9, 8, 6, 7, 5, 3, 0, 9],
    render: numSq,
    title: "randomize()",
    button_action: randomize,
  },
  {
    data: [1,0,1,4,0,9,2,1],
    render: numSq,
    title: "incrementAll()",
    button_action: incrementAll,
  },
  {
    data: [0, 25, 51, 76, 102, 128, 153, 179, 204, 230, 255],
    render: brightSq,
    title: "darken()",
    button_action: darken,
  },
  {
    data: [0,36,72,108,144,180,216,252,288,324,360],
    render: hueSq,
    title: "cycle()",
    button_action: cycle,
  },
  {
    data: [ true, false, true, false,true, true, false,false,true],
    render: booSq,
    title: "flipAll()",
    button_action: flipAll,
  },
  {
    data: [0,30,60,90,120],
    render: rotSq,
    title: "fill360()",
    button_action: fill360    
  },  
  {
    data: "HELLO WORLD!!".split(""),
    render: txtSq,
    title: "shift()",
    button_action:shift,
  },
  {
    data: [1,1],
    render: numSq,
    title: "fib()",
    button_action: fib,
  },
];

let resetData=[];

function setup() {
  let up = getURLParams();
  focusIndex = up.row;
  
   let r = rows[focusIndex];
  resetData = [];
  
  for(let v of r.data)
    resetData.push(v);
  let w = 150+r.data.length*32;
  createCanvas(550, 80);
  let y = 30;
  
    let b = createButton(r.title);
    b.position(20, y);
    b.mousePressed(() => {
      r.button_action(r.data);
    });
  
}

function draw() {
  background(111);
  translate(140, 40);
  let r = rows[focusIndex];
    push();
      r.render(r.data);
    pop();
    translate(0, 40);
  
}

function txtSq(arr) {
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  for (let i = 0; i < arr.length; i++) {
   noFill();
    stroke(0);
    strokeWeight(1);
    square(0, 0, 31,3);
    fill(255);
    noStroke();
    textSize(24);
    text(arr[i], 0, 1);

    translate(32, 0);
  }
}
function numSq(arr) {
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  for (let i = 0; i < arr.length; i++) {
    fill(244);
    stroke(0);
    strokeWeight(2);
    square(0, 0, 30, 5);
    fill(0);
    noStroke();
    strokeWeight(1);
    stroke(0);
    textSize(18);
    text(nf(arr[i],0,0), 0, 1);

    translate(32, 0);
  }
}
function brightSq(arr) {
  noStroke();
  textAlign(CENTER, CENTER);

  rectMode(CENTER);
  for (let b of arr) {
    fill(b);
    square(0, 0, 30, 5);
    if (b < 130) fill(255);
    else fill(0);
    text(nf(b, 1, 1), 0, 1);
    translate(32, 0);
  }
}
function hueSq(arr) {
  noStroke();
  colorMode(HSB);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  for (let b of arr) {
    fill(b, 255, 255);
    stroke(0);
    strokeWeight(2);
    circle(0, 0, 30);
    noStroke();
    fill(0);
    text(nf(b,0,0), 0, 1);
    translate(32, 0);
  }
  colorMode(RGB);
}
function booSq(arr) {
  noStroke();
  textSize(16);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  for (let b of arr) {
    fill(200, 0, 0);
    noStroke();
    if (b) circle(0, 0, 30);
    fill(0);
    text(b ? "T" : "F", 0, 1);

    translate(32, 0);
  }
}

function rotSq(arr) {
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  for (let i = 0; i < arr.length; i++) {
    push();
    rotate(radians(arr[i]));
    fill(244);
    stroke(0);
    strokeWeight(2);
    square(0, 0, 30, 5);
    fill(0);
    noStroke();
    textSize(12);
    text(nf(arr[i],0,0), 0, 1);
    pop();

    translate(32, 0);
  }
}

function keyPressed(){
  if( key == "r"){
  let r = rows[focusIndex];
    r.data = [];
    for(let v of resetData)
      r.data.push(v);
  }
}

