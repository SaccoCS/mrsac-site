var inCount,outCount;

var inP, totP,ratioP,piEstP,errP,closeP
var go;

function setup() {
 // frameRate(20);
  
 var c= createCanvas(300, 300);
  inP = createP("Dots Inside: ");
  totP = createP("Total Dots: ");
  ratioP = createP("Ratio: inside/total: ");
  piEstP = createP("Pi Estimate: ");
  piEstP.style('margin-top','10px');
  //piEstP.style('margin','10px 0px');
  piEstP.style('font-size','26px');
  
  errP = createP("error: ");
 
  textAlign(CENTER,CENTER);
  
  c.style('border','1px solid black');
  background(255);
  fill(255);
  ellipse(width/2, height/2, width);
  inCount = 0;
  outCount = 0;
  fill(0);
  textSize(20);
  text("Click to Start",width/2,height/2);
 low = 99;
}

function dot(){
  var x = random(width);
  var y = random(height);
  
  
  if(dist(x,y,width/2, height/2) <= width/2){
     stroke(200,0,0,50);
    inCount++;
  }
  else{
     stroke(150,150,255,50);
    outCount++;
  }
    
  strokeWeight(1);
  point(x,y);
  
          
  
}

function draw() {
  //background(220);
  
  if(!go){
    return;
  }
  
  for( var i = 0; i<100+random(-15,15); i++)
  dot();
  
  
  var total = inCount+outCount;
   var ratio = inCount/(total);
  inP.html("Inside Dots: "+inCount);
  totP.html("Total Dots  &nbsp;:   "+total);
  ratioP.html("Ratio: inside/total: "+nfs(ratio,0,6));
  piEstP.html("Pi Estimate: "+nfs(4*ratio,0,6));
  errP.html("error: "+nfs(abs(Math.PI-4*ratio),0,6));
 
}

function mousePressed(){ 
  background(255);
  go = true;
  inCount = 0;
  outCount = 0;
  fill(255);
  stroke(0);
  ellipse(width/2, height/2, width);
}