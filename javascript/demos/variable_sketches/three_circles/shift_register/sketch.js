var showLeft, showCenter, showRight,last,last2,last3;

function setup() {
  createCanvas(400, 200);

  showLeft = true;
  showCenter = true;
  showRight = true;
  last = "None"
  last2 = "None"
  last3 = "None"
}

function draw() {
  background(0);
  console.log(last3);
  if(last3 == "Blue" && last2 == "Red" && last == "Red")
    background(random(255),random(255),random(255));
  
  strokeWeight(6);
  stroke(255);
  
  textFont('Black Han Sans');


  if (showLeft) {
    //Draw Red  
    fill(222, 0, 0);
    ellipse(80, 70, 100);
  }


  if (showCenter) {
    //Draw Green
    fill(0, 222, 0);
    ellipse(200, 70, 100);
  }


  if (showRight) {
    //Draw Blue
    fill(0, 0, 222);
    ellipse(320, 70, 100);
  }
  
  fill(255);
  noStroke();
  textSize(20);
  text("1 : " + last,150,150);
  text("2 : " + last2,150,170);
  text("3 : " + last3,150,190);
}

function mousePressed() {

  var distRed = dist(80, 70, mouseX, mouseY);
  
  if (distRed < 50) {
    last3 = last2;
    last2 = last;  

    last = "Red" 
  }
  

  var dGreen = dist(200, 70, mouseX, mouseY);

  if (dGreen < 50) {
    last3 = last2;
    last2 = last;
    
    last = "Green"
  }


  var dBlue = dist(320, 70, mouseX, mouseY);

  if (dBlue < 50) {
    last3 = last2;
    last2 = last;
    
    last = "Blue"
  }

}