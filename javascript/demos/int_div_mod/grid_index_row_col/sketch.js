var rad;
function setup() {
  createCanvas(42*5+1, 42*4+1);
  textAlign(CENTER,CENTER);
  textSize(18);
   rad = createRadio('h');
  rad.option('index',0);
  rad.option('index/5',1);
  rad.option('index%5',2);
  rad.style('font-family:helvetica;font-size:12px');
  rad._getInputChildrenArray()[0].checked = true;
}

function draw() {
  background(220);
  var size =42
  for(var i =0 ; i<20; i++)
  {
   var row = floor(i/5);
   var col = i%5; 
    
    var x = col*size;
    var y = row*size;
    rect(x,y,size,size);
    var t = i;
    
    if(rad.value()==1)
      t= floor(t/5);
    if(rad.value()==2)
      t%=5
      
    
    
    text(t,x+size/2,y+size/2);
  }
}