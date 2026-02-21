let rotHeight = 913;
let lastRot = undefined;
let wrapAround = false;

let mouseCanPress = 0;

let allShift = 0;

function preload(){
  img = loadImage("enigma.png") 
  inpt = createImage(73,rotHeight)
  rot1 = new p5.Image(145,rotHeight);
  rot2 = new p5.Image(145,rotHeight);
  rot3 = new p5.Image(145,rotHeight);
  refl = createImage(73,rotHeight);
  rotors = [rot1,rot2,rot3]
  shifts = [0,0,0]
}

function drawRotor(num){
  let rot = rotors[num-1];
  push();
      image(rot.img,rot.x,rot.y)
  
     // image(rot.img,rot.x,rot.y-34*26)
     // image(rot.img,rot.x,rot.y-34*26)
  
  pop();
  
}
function setup() {
  d = createDiv();
  
  // d.child(createP("Use the Mouse to Rotate the Wheel"))
  // d.child(createCanvas(579,913+34*3 ));
  d.child(createCanvas(575,34*26 ));
  noSmooth();

  inpt.copy(img,6,0,73,rotHeight,0,0,73,rotHeight);
  inpt = new Rotor(inpt, 0,0)
  rot1.copy(img,78,0,145,rotHeight,0,0,145,rotHeight);
  rot2.copy(img,78+144,0,145,rotHeight,0,0,145,rotHeight);
  rot3.copy(img,77+144*2,0,145,rotHeight,0,0,145,rotHeight);
  refl.copy(img,77+144*3,0,72,rotHeight,0,0,72,rotHeight);
  refl = new Rotor(refl,432+72,0)
  
   rotors = [   new Rotor(rot1, 72, 0), new Rotor(rot2,72+144,0), new Rotor(rot3,72+144*2,0) ]
}

function draw() {
  background(255);
  
  translate(0,allShift)
  
  
  
  //paint rotors
  for(let r of rotors){
    r.paint();
  }
 
  //paint input and refector
  // image(inpt,0,0);  
  inpt.paint()
  refl.paint();
  // image(refl,432+72,0);
  
  
  
  //Mouse Held
  if( mouseIsPressed ){
    moveMouseOver();
  } 

  
  //Keys Held
  
    if(keyIsDown(38) ){        
      moveAll(-8)
    } else if(keyIsDown(40) ){        
      moveAll(8)      
    }
  
  
  
 

  
  
  
  
  mouseCanPress = max(mouseCanPress-1,0)
  
  }

function moveAll(dY){
  wrapAround=true
   for(let r of rotors){
    r.destY += dY
  }
    inpt.destY += dY
    refl.destY += dY
  
  
}



function mouseWheel(e){
  ;
  
// allShift += e.deltaY/4
  let dY = 18*(e.deltaY>0 ?-1:1);;
   this.moveAll(dY);
 
  
//   if(allShift > height)
//     allShift -= rotHeight;
//   if(allShift < -height)
//     allShift += rotHeight;
  

}



function mousePressed(){
 
    moveMouseOver();
    
}

function moveMouseOver(){
  for(let r of rotors){
    if(r.containsMouse()){
      lastRot = r;
      if(mouseButton == RIGHT || (keyIsDown(CONTROL) && mouseButton == LEFT)){

        r.down()
      }
    else if (mouseButton == LEFT)

      r.up();

    }
  }
}

function keyPressed(){
  
}


class Rotor{
  constructor(img, x,y){
    this.img = img;
    this.x = x;
    this.y = y;
    this.shift = 0;
    
    this.destY = 0;
    
    this.topDY = rotHeight;
    
    this.infinite = false;
  }
  
  paint(){
    image(this.img,this.x,this.y+26*34);
    image(this.img,this.x,this.y);
    image(this.img,this.x,this.y-26*34-this.topDY);
    
    if( this.y != this.destY){
      this.y = lerp(this.y,this.destY,0.2);
    }
    
    if(this.y < -rotHeight*0.2){
      this.y += 26*34;
      this.destY += 26*34;
      
    }
    
    if(this.y > rotHeight*0.2){
       this.y -= 26*34;
        this.destY -= 26*34;
       }
    
    if( this.infinite || wrapAround){
      this.topDY= lerp(this.topDY, 0,0.15)
    }
  }
  
  up(){
    this.move(-1);
  }
  
  down(){
    this.move(1)
    wrapAround = true;
  }
  
  move(x){
    if(mouseCanPress == 0){
      
      this.destY += x*34
      
      
      mouseCanPress = 10;
      
    }
  }
  
  containsMouse(){
    return ( mouseX>this.x && mouseX< this.x+144)
  }
}

