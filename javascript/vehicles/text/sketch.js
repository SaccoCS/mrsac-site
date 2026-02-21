
var vehicles = [];
var canvas;
var destX,destY;
var font;

function preload(){
   font = loadFont('Tangerine');
  
}

function setup() { 
  canvas  = createCanvas(window.innerWidth-0, window.innerHeight-4);
  
  destX = windowWidth/2;
  destY = windowHeight/2;
console.log(0);
    
    for(var i = 0; i<10; i++)
    vehicles.push(new Vehicle());
  
} 


function windowResized() {
  resizeCanvas(window.innerWidth-0, window.innerHeight-4);
}

function mouseDragged()
{
  destX = mouseX;
  destY = mouseY;
}

function mousePressed()
{
  destX = mouseX;
  destY = mouseY;
}

function fontY(letter)
{
  
    var bounds = font.textBounds("HELLO",0,0,50,50);
  
  return (windowHeight+bounds.h)/2;
  
}


function draw() 
{ 
    
 background(255);
 // fill(0,0,255);  
  textFont('Helvetica');
  print(fontY("I"));
  textSize(400);
text('Helvetica', 12, fontY("H"),50,50);
 textFont()
  
   

  
   for(var i = 0; i<vehicles.length; i++)
      {
          vehicles[i].paint();
      }
   for( i = 0; i<vehicles.length; i++)
      {
          vehicles[i].steer();
          vehicles[i].update();
      }

 
}