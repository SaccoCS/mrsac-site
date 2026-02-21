function setup() {
  createCanvas(200, 100);
  strokeWeight(3);
  list = [{x:140,y:314,size:30}];
  for(let i =0; i<3;i++)
  list.push({x:random(30,width-30),
             y:random(30,height-30),
             size:30})
  
  drag = undefined;
}

function draw() {
  background(220);
  
  for( let p of list)
  {
    drawPoint(p);
  }
}

function drawPoint(p)
{
   var d = dist(mouseX,mouseY,p.x,p.y);
  if( d < p.size/2 )    
    ellipse(p.x,p.y,1.5*p.size,1.5*p.size)
  else
    ellipse(p.x,p.y,p.size,p.size)
}


function mousePressed()
{
   for( let p of list)
   {
     var d = dist(mouseX,mouseY,p.x,p.y);
      if(  d<p.size)
        drag = p;
   }
}

function mouseReleased()
{
   drag = undefined; 
}

function mouseDragged()
{
   if( drag )
   {
     drag.x = mouseX;
     drag.y = mouseY;
     
   }
}