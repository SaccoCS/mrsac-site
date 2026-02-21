
var vehicles = [];
var window;

function setup() { 
  createCanvas(windowWidth, windowHeight);
 
    
    for(var i = 0; i<100; i++)
    vehicles.push(new Vehicle());
  
} 

function mousePressed()
{
  for(var i = 0; i<vehicles.length; i++)
      {
          vehicles[i].pos = createVector(mouseX,mouseY);
          vehicles[i].randVect();
      }
}




function draw() 
{ 
    
  background(250);
 // fill(0,0,255);   
 
   

  
   for(var i = 0; i<vehicles.length; i++)
      {
          vehicles[i].paint();
      }
   for( i = 0; i<vehicles.length; i++)
      {
          vehicles[i].update();
      }

 
}