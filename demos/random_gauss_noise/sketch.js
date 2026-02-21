function setup() {
  createCanvas(400, 150);
  background(255);
  textAlign(CENTER,CENTER)
  bg = createGraphics(width,height);
  bg.background(0);
  img = createGraphics(width,height);
  img.textFont('consolas')
  img.fill(200)
  img.strokeWeight(2)
  
  img.textAlign(CENTER,CENTER);
  img.textSize(18)
  img.text('random()',width/2,height/12);
  img.text('randomGaussian()',width/2,height/3+height/12);
  img.text('noise()',width/2,height*2/3+height/12);
}

function draw() {
  background(255);
  image(bg,0,0);
  image(img,0,0)
  
  bg.background(0,1);
  let gauss = randomGaussian(200,80); //noise(frameCount*0.005)*width;
  bg.noStroke();
  bg.fill(255,10);
  bg.rect(gauss,height/3,5,height/3);
  let r = random(width);
  bg.rect(r,0,5,height/3);
  
  let n = noise(frameCount*0.005)*width;
  bg.rect(n,height*2/3,5,height/3)
  
  fill(0)
  
  if(frameCount%1500==0)
    {
      bg.background(0);
    }
  
}

function mousePressed(){
  bg.background(0);
}