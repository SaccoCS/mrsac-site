class Square {
  constructor(jig) {
    this.jig = jig;
    (this.wid = 0), (this.hei = 0), (this.dWid = 200), (this.dHei = 200);
    this.phaseNum = 0;
    this.ang = 0;
    this.dAng = 0;
    this.cornerRad = 0;
    this.col = COLORS[myId];//color('white')
    this.stroke = color('white');

    this.rot = true;
    this.loc = createVector(width / 2, height / 2);

    this.phase = [];
    // this.phase[REGISTRATION] = {
    //   cx: width / 2,
    //   cy: height / 2,
    //   wid: width*0.6,
    //   hei: 300,
    //   rot: false,
    // };
    // // console.log(windowWidth, )
    // this.phase[MAZE] = {
    //   cx: width / 2,
    //   cy: height / 2,
    //   wid: 200,
    //   hei: 200,
    //   circ:true,
    // };
    // this.phase[CIRCLE] = {
    //   cx: width / 2,
    //   cy: height / 2,
    //   wid: 200,
    //   hei: 350,
    //   rot: true,
    // };
    // this.phase[JIGSAW] = {
    //   cx: width/2,
    //   cy: height*0.3,
    //   wid: 320,
    //   hei: 384,
    //   rot: false,
    // };
    // this.phase[RESULTS] = {
    //   cx: width/2,
    //   cy: height*0.3,
    //   wid: 320,
    //   hei: 384,
    //   rot: false,
    // };

    this.phaseNum = MAZE;
    
//     if(myId == LEE|| myId == SACCO){
//     this.phase[JIGSAW].wid = 384
//     this.phase[JIGSAW].hei = 320
    
//     }
    
  }
  
  getTargets(){
    let minDist = min(width,height)
    let col = COLORS[myId];
    let b = color('black')
    switch(this.phaseNum){
      case MAZE: return {
      cx: width / 2,
      cy: height / 2,
      wid: minDist*0.6,
      hei: minDist*0.6,
      circ:true,
      fill:col,
        stroke:b
        
      }
    
      case JIGSAW: return {
      cx: this.jig.loc.x,
      cy: this.jig.loc.y,
      wid: this.jig.getWidth(),
      hei: this.jig.getHeight(),
      circ:false,
      fill:col,
        stroke:b
      }
    
      case REGISTRATION: return {
      cx: width / 2,
      cy: height / 2,
      wid: minDist*0.5,
      hei: minDist*0.5,
      circ:true,
      fill:bgCol,
        stroke:col
      }
    
      case CIRCLE: return {
      cx: width / 2,
      cy: height / 2,
      wid: minDist*0.3,
      hei: minDist*0.5,
      circ:false,
      fill:col,
        stroke:b
      }
    
      case REGISTRATION: return {
      cx: width / 2,
      cy: height / 2,
      wid: 200,
      hei: 200,
      fill:col,
        stroke:b
      }
    
    
    
    
    }
     
      
  }
  


  isToSize() {
    return (
      abs(this.dWid - this.wid) +
        abs(this.dHei - this.hei) <
      2
    );
  }
  
  snap(){
    this.wid = this.dWid;
    this.hei = this.dHei;
  }

  paint() {
    stroke(0);

    push();
    if (!connected) return;
    
    let myCol = this.col;
    let targets = this.getTargets();
    
    let dWid = targets.wid+this.jig.pSize;//this.phase[this.phaseNum].wid;
    let dHei = targets.hei+this.jig.pSize;//this.phase[this.phaseNum].hei;

    strokeWeight(10);
    translate(this.loc.x, this.loc.y);
    this.loc.lerp( new p5.Vector(targets.cx, targets.cy),0.1);

    let mess = "";
      this.dAng = 0;
    if (this.phaseNum == MAZE) {
      this.dAng = 0;
    } else if (this.phaseNum == CIRCLE) {
      if (rotationX != null && (abs(rotationX) > 8 || abs(rotationY) > 8)) {
        mess = "PUT\nME\nDOWN";
        this.dAng = 0;
      } else {
        this.dAng = map(sin(frameCount * 0.04), -1, 1, -PI * 0.04, PI * 0.04);
      }
    } else if (this.phaseNum == JIGSAW) {
      this.dAng = 0;
    }
    this.ang = lerp(this.ang, this.dAng, 0.2);

    rotate(this.ang);
    
    let dCorn;
    if(targets.circ)
      dCorn = min(this.wid, this.hei)
    else
      dCorn = 10;
   
    
    fill(this.col);
    stroke(this.stroke)
    rect(0, 0, this.wid,this.hei, this.cornerRad);
    fill(0);
    textSize(32);
    noStroke();

    if (this.isToSize()) text(mess, 0, 0, this.wid, this.hei);


    this.wid = lerp(this.wid, dWid, 0.1);
    this.hei = lerp(this.hei, dHei, 0.1);
    this.cornerRad = lerp(this.cornerRad, dCorn, 0.07)
    // console.log(this.fill)
    this.col = lerpColor(this.col,targets.fill,0.1);
    this.stroke = lerpColor(this.stroke,targets.stroke,0.1);
    pop();
  }
}
