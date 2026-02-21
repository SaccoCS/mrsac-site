class Label{
  
  constructor(txt,index){
    this.txt = txt;
    this.index = index;
    this.x = x(index);
    
    this.moving = false;
    
    this.speed = 1;
    this.delay = 0;
    this.pause = 25;
  }
  
  paint(){ 
    fill(0)
    this.paintLabel();
    this.move()
    
   
  }
  
  paintLabel(){
    textSize(10);
    fill(0)
    let wid = BOX_WID/2;
    let y = yLine + wid+10;;
    line(this.x - wid*0.8,y,this.x+wid*0.8,y)
    text(this.txt,this.x,y+10);
  }
  
  move(){
     if( this.moving){
      let i2 = this.index+1;
      let x2 = x(i2);
      this.x += this.speed;
    
      if(this.x > x2){
        this.x = x2;
        this.delay++;
        if(this.delay > this.pause){
        this.index = i2;
        this.moving =false;
        this.delay = 0;
        }
      }
    }
  }
  
}

class SwapLabel extends Label{
  
  constructor(){
    super("swap",0)
  }
  
   
  paintLabel(){
    textSize(10)
    let wid = BOX_WID/2;
    let y = yLine + wid+10;
    stroke(0)
    line(this.x - wid*0.8,y,this.x+wid*0.8,y)
    
    
    noStroke();
    text(this.txt,this.x,y+9)
  }
  
}

class ILabel extends Label{
  
  
  constructor(){
    super("i",0)
  }
   
  paintLabel(){
    textSize(10)
    let wid = BOX_WID/2;
    let y = yLine - wid-10;
    stroke(0)
    line(this.x - wid*0.8,y,this.x+wid*0.8,y)
    noStroke();
    text(this.txt,this.x,y-9)
  }
  
}