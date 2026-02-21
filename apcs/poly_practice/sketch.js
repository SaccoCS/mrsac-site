function setup() {
  noCanvas();
  
  
  
  let cls = select('#classes');
  
  
  
  let rightDiv= createDiv();
  // rightDiv.style('border','1px solid black')
  rightDiv.style('width','310px')
  rightDiv.style('display','float')
  rightDiv.style('margin-left','490px')
  
  
  
  
  let origQList = ["AA1ABC2","AA2ABC2","AA5ABC1","AB2ABC3","AB1ABC2",
               "BB5ABC3","BA3ABC0","AC1ABC4","AC2ABC2","CA1ABC0",
                "CD3ACD4","CD1ACD3","AD4ACD1","AD2ACD2","DC3ACD0"]
  
  let qList = ["AA1ABC2","BB5ABC3","AA5ABC1","CC2ABC2","AB2ABC3","AC1ABC4","AB1ABC2",
               "CC3ABC2","BA3ABC0","AC2ABC2","CA1ABC0",
                "CD3ACD4","AD1ACD3","AD4ACD1","AD2ACD2","DC3ACD0"]
  
  
  let ques = []
  qList.forEach((s,i)=>{ 
  ques.push(new Question(i+1,s));
  })
  
  
  ques.forEach((q)=>{
    rightDiv.child(q.div);
  })
  
}






class Question{ 
  
  constructor(quNum, code){
    
    let vObj = code.charAt(0);
    let cObj = code.charAt(1);
    
    
    let words = ["","methodOne()","methodTwo()","methodThree()","methodFour()","methodFive()"];
    
    let num = int(code.charAt(2));
    let sol = int(code.charAt(6));
    
    this.locked = false;
    
    
    
    
    
    this.div = createDiv();
    this.div.style('width','300px')
    this.div.style('border','1px solid black');
    this.div.style('display','inline-block')
    
    
    let qNum = createP("Question "+quNum);
    qNum.style("margin","4px")
    
    this.div.child(qNum);
    
    let assn = createP(vObj+" obj = new "+cObj+"();</br>obj."+words[num]+";");
    assn.style('padding','5px 15px')
    assn.style("font-size","16px")
    assn.style("margin-top","8px")
    
    this.div.child(assn);
    
    
    let a,b,c,d,e;   
    
    this.questions = [];
    this.questions.push( a = createP("a) Compiler Error: Incompatible Types") )
    this.questions.push(b = createP("b) Compiler Error: No Such Method"));
    this.questions.push(c = createP("c) "+code.charAt(3)+num));
    this.questions.push(d = createP("d) "+code.charAt(4)+num));
    this.questions.push(e = createP("e) "+code.charAt(5)+num));
    
    
    this.questions = [a,b,c,d,e];
    
    
    this.div.child()
    
    this.questions.forEach((q,i)=>{
      this.div.child(q);
      
      q.style('margin','2px 7px');
      q.style('padding','3px 3px');
      q.style("font-size","12px");
      q.style("width","260px");
      
      q.style("user-select","none");
      
      q.mouseOver(()=>{
        if(this.locked)return;
        q.style('color','#607D8B')
      })      
      q.mouseOut(()=>{
        if(this.locked)return;
        q.style('color','black')
      })
      q.mousePressed(()=>{
       
        if(this.locked)return;
        this.locked = true;
        
        if( i == sol){
        q.style('background-color','#4CAF50')
          q.style('color','white')
        }
        else{
          q.style('color','white')
        q.style('background-color','#F44336')
        this.questions[sol].style('border',"2px solid #4CAF50")}
        
          // this.questions[sol].style('color','white')
        
      })
    });
    
    
    this.questions[4].style("margin-bottom","8px")
  }
  
  
}