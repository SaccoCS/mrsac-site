var h=0;
function setup() {
  createCanvas(16*12+1, 16*10+1);
  textAlign(CENTER,CENTER);
  textSize(18);
  frameRate(15);
 
}

function draw() {
  background(220);
  var size =16
  for(var i =0 ; i<120; i++)
  {
   var row = floor(i/12);
   var col = i%12; 
    
    if(h==i)
      fill(222,0,0);
    else
      fill(255);
    
    var x = col*size;
    var y = row*size;
    rect(x,y,size,size);
    
    
  
   
    //h%=5;
  
  }
  h = (h+1)%120;
}