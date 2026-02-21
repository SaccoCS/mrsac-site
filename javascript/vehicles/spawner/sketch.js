
var vehicles = [];
var canvas;
var destX,destY;
var spawner;
var p;

function setup() { 
  canvas  = createCanvas(window.innerWidth-0, window.innerHeight-4);
  
  destX = windowWidth/2;
  destY = windowHeight/2;
  spawner = new Spawner(windowWidth/2,windowHeight/2,20);
console.log(0);
    
    for(var i = 0; i<0; i++)
    vehicles.push(new Vehicle(windowWidth/2,windowHeight/2));
  
  p = createP(50);
 
  
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
  
  spawner.draw();
  var val = spawner.update();
  if(val)
    vehicles.push(val);
  
  if(vehicles.length>100)
    vehicles.splice(0,1);
  
  p.html(vehicles.length);

 
}