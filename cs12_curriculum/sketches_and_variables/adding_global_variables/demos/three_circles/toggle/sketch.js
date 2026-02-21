var showLeft, showCenter, showRight;

function setup() {
  createCanvas(400, 140);

  showLeft = true;
  showCenter = true;
  showRight = true;
}

function draw() {
  background(0);
  strokeWeight(6);
  stroke(255);


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
}

function mousePressed() {

  var distRed = dist(80, 70, mouseX, mouseY);

  if (distRed < 50) {
   
    showLeft = !showLeft;

    
    
  }
  
  

  var dGreen = dist(200, 70, mouseX, mouseY);

  if (dGreen < 50) {
   showCenter = !showCenter;
  }


  var dBlue = dist(320, 70, mouseX, mouseY);

  if (dBlue < 50) {
  showRight = !showRight;
  }

}