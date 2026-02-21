let bird;
let fr;
let pipes = [];
function setup() {
  createCanvas(350, 750);
  

  bird = new Bird();
  fr = createP('');
  
  pipes.push(new Pipes(275,275,160));
  pipes.push(new Pipes(625,275,160));

}



function draw() {
  scale(0.5);
  stroke(0);
//  frameRate(45);
  background(255);
  

 // noFill();
let str = "pipeXs = ["+pipes[0].x+","+pipes[1].x+"]";
 
    
  
  
  for( let p of pipes){
    p.paintSelf();
  }

  bird.paintSelf();



  bird.update();
  for( let p of pipes){
    p.update();
    if(p.x<-100){
      p.x = 625;
      p.randomize();
    }
  }
  

  if (bird.y > 550 - bird.h)
    bird.y = 550 - bird.h;
  
  
  noStroke();
  textSize(16);
  fill(0);
  text('Click to Flap',width/2 - textWidth('Click to Flap')/2,40);
  
  stroke(0);
  noFill();
  rect(0, 0, width , 550 );
  
  noStroke();
  textSize(22);
  fill(0);
    text(str,80,600)

}

function mousePressed(){
  bird.flap();
}

function keyPressed(){
  bird.flap();
}