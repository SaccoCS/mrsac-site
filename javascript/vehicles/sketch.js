
var vehicles = [];
var canvas;
var destX,destY;

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




function draw() 
{ 
    
 background(255);
 // fill(0,0,255);   
 
   

  
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