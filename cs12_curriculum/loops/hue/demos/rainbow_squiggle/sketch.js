function setup() {
  createCanvas(200, 200);

  noStroke();
  colorMode(HSB);
}

function draw() {
  background(0);
  xs = [];
  ys = [];
  for(let f = 0; f<1000; f++){
    
  xs.push(noise( f*0.005 , 5,frameCount*0.005)*width);
  ys.push( noise( f*0.005 , 10,frameCount*0.005)*height);
  }
  
  xs.forEach( (e,i)=>{
    
  let h = map(i,0,1000,0,360);
  fill(h,255,255);
  circle(e,ys[i],15);
  })
    
  
  
}