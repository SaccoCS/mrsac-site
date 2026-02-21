let a,b,ans;

function setup() {
  createCanvas(320, 100);
  textSize(46);
  textAlign(LEFT,CENTER)
  
  a = floor(random(12,13))
  b = floor(random(12,13));
  
  ans="";
  
  correct=0;
  total=0;
  
  
}

function draw() {
  background(255);
  noFill();
  stroke(0)
  rect(2,2,width-2,height-2);
  
  noStroke();
  fill(0);
  let sol = "";
  if( ans != "")
    sol = Number(ans);
  
  
  textSize(46);
  text( a +" x "+b +" = "+sol, 20, 45);
  
  
  textSize(12)
  let percent = correct/total*100;
  
  // text(`Correct: ${correct},\tTotal: ${total},\tPercent: ${nf(percent,0,`2`)}%`,20,height-10)
  text(`Correct: ${correct},\tTotal: ${total}`,20,height-10)
}




function keyPressed(){
  console.log(`key: "${key}"`);
  console.log(`keyCode: ${keyCode}\n`);
  
  if( keyCode == ENTER ){
    
    if( (ans) == a*b){
      correct++;
    }
    total++;
    
    
  a = floor(random(2,13))
  b = floor(random(2,13));
    ans = ""
    
  }
  
  if( Number(key) >=0 && Number(key) <=9){
    ans += key;
  }
}