function setup() {
  createCanvas(180, 180);
  rectMode(CENTER);
}

function draw() {
  scale(.5);
  background(50);

  if ( mouseInBox(120, 70, 200, 100))
    fill(222, 0, 0);
  else
    fill(0,222,99);  
  rect(120, 70, 200, 100);

  if ( mouseInBox(290, 120, 100, 200)) 
    fill(222, 0, 0);
  else
    fill(0,222,99);
  rect(290, 120, 100, 200);

  if ( mouseInBox(240, 290, 200, 100)) 
    fill(222, 0, 0);
  else
    fill(0,222,99);
  rect(240, 290, 200, 100);

  if ( mouseInBox(70, 240, 100, 200) ) 
    fill(222, 0, 0);
  else
    fill(0,222,99);  
  rect(70, 240, 100, 200);


}

//returns true if the (mouseX,mouseY) is currently within the box defined by x, y, w, and h
function mouseInBox(x, y, w, h) {
  var mx = mouseX;
  var my = mouseY;
  return mx>(x-w/2)/2 && my>(y-h/2)/2 && mx<(x+w/2)/2 && my<(y+h/2)/2;
}