class Choice{
  constructor(c,label){
    this.choice = c;
    this.label = label;
    this.score = 0;
    
  }
  
  paint(x,y){
    fill(255);
    textSize(20);
    text(this.label,x,y-74)
    this.paintIndividual(this.choice,x,y);
    textSize(20);
    noStroke();
    text(this.score,x,y+68)
    
  }
  
  paintIndividual(choice,x,y){
  fill(255);
  stroke("#2E3059");
  strokeWeight(2);
  square(x,y,106,3);
  textSize(60)  
  
    image([rockImage,paperImage,scissorsImage][choice],x,y,90,90)
  
}
  
  
}