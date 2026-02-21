var counts;
function setup() {
  createCanvas(281, 41);
  textAlign(CENTER, CENTER);
  textSize(18);
  counts = [0,0,0,0,0,0,0];
}

function draw() {
  background(220);

  //loop through values 0 - 6
  for (var i = 0; i < 7; i++) {
    
    //calculate x based on a box width of 40
    var x = 40 * i;
    
    //Draw Box
    fill(255);
  
    rect(x, 0, 40, 40);

    fill(0);
    
    var f = counts[i];
    text(f, x + 20, 22);
  }
  
}

function mousePressed(){
 var clickedIndex = floor(mouseX/40);
  counts[clickedIndex] ++
}

function keyPressed(){
  if( key === 'r')
    counts = [0,0,0,0,0,0,0];

}