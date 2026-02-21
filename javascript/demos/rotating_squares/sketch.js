function setup() {
  createCanvas(240, 160);
  noStroke();
  rectMode(CENTER);
  // colorMode(HSB)
}

function draw() {
  background(0);
  let gap =20; //map(sin(frameCount*0.1),-1,1,10,25);
  for(let x = gap/2; x<width; x+= gap)
  for(let y = gap/2; y<height; y+= gap){
    let n = noise(x*0.01, y*0.01,frameCount*0.005
                 );
    fill(map(n,.2,.8,1,360),0,160)
    
    push()
    translate(x,y);
    rotate(n*TWO_PI*2)
    rect(0,0,map(n,.2,.8,1,gap))
    pop()
  }
}