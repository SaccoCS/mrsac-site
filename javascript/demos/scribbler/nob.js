function setup() {
  
 var p = createP('Use the R, G, and B keys to change brush color');
 
  p.style('font-family','Helvetica');
  var can =createCanvas(300, 300);
  can.style('border','1px solid black');
  var b = createButton("Clear");
  b.mousePressed(function(){background(255);});
  background(255); //Only once in the beginning
}

function draw() {

  //strokeWeight(1);
  //textSize(18);
 // text('Use the R,G,and B keys to change color', 10,28);
  strokeWeight(3);
  if (key == 'r')
    stroke(255, 0, 0);
  else if (key == 'g')
    stroke(0, 255, 0);
  else if (key == 'b')
    stroke(0, 0, 255);
  else
    stroke(0);


  if (mouseIsPressed)
    line(mouseX, mouseY, pmouseX, pmouseY);
}