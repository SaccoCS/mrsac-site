let bird;
let fr;
let pipes = [];
let isRunning = true;
let score = 0;
let pscore,padd,ptot;

function setup() {
  createCanvas(900/2, 550/2);
  

  bird = new Bird();
  fr = createP('');
  
  pipes.push(new Pipes(475,275,160));
  pipes.push(new Pipes(825,275,160));

  pscore = createP('Pipes reset:'+score);

  padd = createP('Pipes Passed Onscreen:0');
  ptot = createP('Total Points: 0');
  
}



function draw() {
//  frameRate(45);
  pscore.html('Pipes Reset:'+score);
  padd.html('Onscreen Pipe Points:'+(getScore()-score));
  ptot.html('Total Points: '+getScore());
  scale(.5);
  background(255);
  
  translate(150,0);

 // noFill();


  
  

  bird.paintSelf();

  

for( let p of pipes){
    p.paintSelf();
  }
  
  
  noStroke();
  textSize(16);
  fill(0);
  textSize(32);
  text('Score:'+getScore(),350/2 - textWidth('Score:'+getScore())/2,40);
  
  
  stroke(0);
  noFill();
  rect(0, 0, 350 - 1, 550 - 1);
  
  
  
  
  
  if(!isRunning){
    fill(0);
    textSize(32);
    noStroke();
   text('Press R to Reset',350/2 - textWidth('Press R to Reset')/2,240);
  stroke(0);
  }
  
  
  if(!isRunning)
    return;
  bird.update();
  for( let p of pipes){
    p.update();
    
    if(p.x<-100){
      p.x = 625;
      p.randomize();
      score++;
    }
    
    if(p.overlapsBird(bird))
      isRunning = false;
  }
  

  if (bird.y > 550 - bird.h)
    bird.y = 550 - bird.h;
  
  

}

function getScore(){
  var cnt = 0;
  for( let p of pipes){
    if(p.x<bird.x)
      cnt++;
  }
  
  return cnt+score;
}

function mousePressed(){
  bird.flap();
}

function keyPressed(){

  
  if(key == 'r'){
    isRunning = true;
    bird = new Bird();
    pipes = [];
  
  pipes.push(new Pipes(475,275,160));
  pipes.push(new Pipes(825,275,160));
    
    score = 0;
  }
  
  if( keyCode == 32){
     bird.flap();  
  }
}