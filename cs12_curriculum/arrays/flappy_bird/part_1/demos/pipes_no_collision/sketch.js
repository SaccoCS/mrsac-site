let bird;
let fr;
let pipes = [];
function setup() {
  createCanvas(500, 300);
  

  bird = new Bird();
  fr = createP('');
  
  pipes.push(new Pipes(120,130,100));
 // pipes.push(new Pipes(625,275,160));

}



function draw() {
//   scale(0.5);
//  frameRate(45);
  background(255);
  

 // noFill();


  
  for( let p of pipes){
    p.paintSelf();
  }

  bird.paintSelf();



  bird.update();
  for( let p of pipes){
    p.update();
    if(p.x<-100){
      p.x += 700;
      p.randomize();
    }
  }
  

  if (bird.y > height - bird.h)
    bird.y = height - bird.h;
  
  
  noStroke();
  textSize(12);
  fill(0);
  text('Click to Flap',100 - textWidth('Click to Flap')/2,40);
  
  stroke(0);
  noFill();
  rect(0, 0, 199 , height-1 );

}

function mousePressed(){
  bird.flap();
}

function keyPressed(){
  bird.flap();
}