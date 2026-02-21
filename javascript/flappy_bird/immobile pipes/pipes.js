class Pipes{
  
  constructor(x,cY,gap){
    this.x = x;
    this.centerY = cY;
    this.gapSize = gap;
    this.width = 39;
    this.xVect = -3;
  }
  
  
  paintSelf(){
    
    fill(0,255,0);
    rect(this.x,0,this.width,this.centerY-this.gapSize/2);
    rect(this.x,this.centerY + this.gapSize/2, this.width,height-this.centerY-this.gapSize/2);
    
    push();
    stroke(0,0,255);
    strokeWeight(3);
    line(this.x,this.centerY,this.x+this.width,this.centerY);
    textSize(10);
    noStroke();
    fill(155);
    
    
  
//   textSize(11);
//   text("centerY",this.x + this.width+10,this.centerY);
    
    
  
    pop();
  }
  
  
  update(){
    this.x += this.xVect;
  }
  
  randomize(){
  //  this.centerY = random(50+this.gapSize/2,height - 50-this.gapSize/2);
    this.centerY = 250;
  }
  
}