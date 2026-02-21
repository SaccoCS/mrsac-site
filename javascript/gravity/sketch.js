

var orbs = [];
function setup() 
{ 
    createCanvas(800,800);
   for( var i = 0; i<3; i++)
   {
      var r = random(30,100);
      orbs.push(new Orb(random(r/2,600-r/2),random(r/2,400-r/2),r));
    }

} 

function mousePressed(){
    orbs.push(new Orb(mouseX,mouseY,random(30,100)));
  
}


function draw() 
{ 
    background(51);
  
  for( let i = 0; i<orbs.length; i++)
    orbs[i].draw();
  
  
  
  for( let i = 0; i<orbs.length; i++)
    orbs[i].update();
  
  for(let i = 0; i<orbs.length; i++)
  for(let j = 0; j<orbs.length; j++)
    {
          orbs[i].attract(orbs[j]);
    }
  
}