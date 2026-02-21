let expression = '';

function setup() 
{
  createCanvas(400, 200);
  createP();
  createButton("T").mousePressed(trueButton);
  createButton("F").mousePressed(falseButton);
  createButton("||").mousePressed(orButton);
 
  createButton("&&").mousePressed(andButton); 
  (b = createButton("←")).mousePressed(delButton);
  //b.style("font-size","12px")
  //createButton("DEL");
  textAlign(CENTER,CENTER);
  textFont("Consolas");
  
//  console.log(eval("true && false || true"));
}

function draw() {
  background(220);
  textSize(26);
  text(expression,width/2,30);
  textSize(66);
  text(evaluate(expression),width/2,120);
  
}

function evaluate(e)
{
  
  if(e.length == 0)
    return '';
  
  if( last(e) == "|" || last(e) == '&')
    {
      return evaluate(e.substring(0,e.lastIndexOf(" ")));
    }
  
  let exp = e.replaceAll("T","true").replaceAll("F","false");
  
  return eval(exp)?"T":"F";
}

function last(e){
  
  if(e.length == 0)
    return '';
  return e.substring(e.length-1);
}

function trueButton(){
  if(expression.length == 0 || expression.length >35)
    expression = "T";
  if(last(expression)=="|")
    expression += " T";
  if(last(expression)=="&")
    expression += " T";
  
}

function falseButton(){
  if(expression.length == 0)
    expression = "F";
  if(last(expression)=="|")
    expression += " F";
  if(last(expression)=="&")
    expression += " F";
  
}

function orButton(){
  if(expression.length == 0|| expression.length >35)
    return;
    
  if(last(expression)=="F"||last(expression)=="T")
    expression += " ||";
}

function andButton(){
  if(expression.length == 0|| expression.length >35)
    return;
    
  if(last(expression)=="F"||last(expression)=="T")
    expression += " &&";
}

function delButton()
{
  
  if(expression.length == 0|| expression.length >35)
    return;
    
    let index = expression.lastIndexOf(" ");
  expression = expression.substring(0,index)
}