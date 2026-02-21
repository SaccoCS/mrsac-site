function drawField(){
   let gap = 10; 
  let index = 0;
  for(let x = gap/2; x<width; x+= gap)
  for(let y = gap/2; y<height; y+= gap){
    translate(x,y);
    strokeWeight(1);
    
    let a = field[index++]
    rotate(a)
    line(0,0,8,0)
     resetMatrix();
  }
  
}