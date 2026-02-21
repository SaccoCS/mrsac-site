class Hand{
  
  constructor(has){
    this.hasTwo = has;
    this.cards = [];
    
    for(let i = 1; i < 52; i++){
      this.cards.push(i);
    }
    
    while(this.cards.length > 13){
      this.cards.splice(floor(random(this.cards.length)),1);
    }
  this.cards =   shuffle(this.cards);
    
    if(has == true){
      this.ind = floor(random(this.cards.length));
      this.cards[this.ind] = 0;
    }
      
    //console.log(this.cards)
    
    this.revealIndex = 0;
  }
  
  amIOkay(b){
    
    if( this.hasTwo != b )
      return false;
    
    if( this.hasTwo == true && this.revealIndex != this.ind)
      return false;
    
    if( this.hasTwo == false && this.revealIndex != this.cards.length-1)
      return false;
    
    return true;
  }
  
  isPerfect(){
    if( this.hasTwo && abs(this.revealIndex - this.ind) <= 2)
      return true;
    if(!this.hasTwo && this.revealIndex == this.cards.length-1)
      return true;
    return false;
  }
  
  
  
  paint(b){
    
    push();
   // imageMode(CENTER);
    
     this.cards.forEach((c,i)=>{
       
       if(i<=this.revealIndex)
       {         
          
         drawCard(c);
         
         
       }
       else  {
         
         image(cardBack,0,0);  
        
         
         
        
         }
       
       //|| !this.hasTwo && this.revealIndex != this.cards.length -1
       
//        let rightPile = this.hasTwo == b;
//        let rightReveal = b&&this.ind == this.revealIndex  || !b&&this.revealIndex >= this.cards.length-1;
       
       // if( (!rightPile || !rightReveal)&& frameCount %50 < 25 && GAME_OVER){
       if(!this.isPerfect() && GAME_OVER&& frameCount %50 < 25){
         fill(222,0,0,30);
         noStroke();
         rect(0,0,72,96)
       }
       
       translate(16,0)
     });
    pop();
  }
}