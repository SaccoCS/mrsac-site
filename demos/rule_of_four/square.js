class Square{
  
   constructor(){
     this.div = createDiv();
     //this.div.style('border','1px solid black');
     this.div.style('width','96px');
     //this.div.style('height','40px');
     this.div.style('text-align','center');
     this.div.style('v-align','center');
     this.div.style('display','inline-block');
     
     this.p = createP(0);
     this.p.style('font-family','consolas');
     this.p.parent(this.div);
     this.p.style('font-size','64px');
     this.p.style('margin','0px 0px');
     this.p.style('padding','10px');
    // this.p.style('border','1px solid black');
     this.p.attribute('oncontextmenu','return false;');
     
     this.val = 0;
     
    
     this.p.mousePressed( ()=>{
       if(mouseButton == LEFT)
       this.increment();
       else
         this.decrement();
     
     });
     
   }
  
  setVal(v){
    this.val = v;
    this.p.html(vals[this.val]);
    up();
  }
  
   increment(){
     this.setVal((this.val+1)%16);
   }
      
   decrement(){
    this.setVal((this.val+15)%16);
   }
  
            
}