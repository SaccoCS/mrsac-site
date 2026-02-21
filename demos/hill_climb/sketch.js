var goButton;
var running = false;
var count = 0;

function setup() {

 can =  createCanvas(70, 60);
  can.style('margin','10px 0px');
  frameRate(3);
  
  
  goButton = createButton("GO");

  goButton.mousePressed(start);
  out = createP();
  out.style('font-family','monospace');
  out.hide();
 

  list = [];
  currentNumber = "#"

}

function start(){
  running = true;
  
  
}

function showScores(){
  
  out.show();
  goButton.html('Reset');
  goButton.mousePressed(reset);
}

function reset(){
  
  out.html('');
  out.hide();
  goButton.mousePressed(start);
  goButton.html('Go');
  list = [];
}

function draw() {
 
  

  if (running) {

    if (list.length < 20) {
      nextNumber();
    } else {
      currentNumber = '#'
      goButton.html("Show");
      goButton.mousePressed(showScores);
      running = false;
     // paint();
    }
  }

  
   background(251);
  textAlign(CENTER, CENTER);
  textFont('monospace');
  textSize(40);
  stroke(0);
  strokeWeight(2);
  noFill();
  rect( 0,0,70,60);
  
  noStroke();
  fill(0);
  text(currentNumber, width / 2, height / 2 + 2);
  

}

function nextNumber() {
  currentNumber = int(random(0, 100));
  list.push(currentNumber);
  out.html(list);


}