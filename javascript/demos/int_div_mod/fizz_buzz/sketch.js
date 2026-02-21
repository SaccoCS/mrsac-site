var y  =20;
var val =0;
function setup() {
  createCanvas(90, 800);
  noSmooth();
  textSize(16)
  textAlign(CENTER);
}

function draw() {
  background(220);
  y = 20
  for(var x = 1; x<40;x++){
    var t = x;
    if(x%15 == 0)
      t = "FizzBuzz";
    else if(x%5 ==0)
      t = "Buzz"
    else if( x%3 == 0)
      t = "Fizz"
    
   text(t,45,y);
    y+=20;
  }
  
}