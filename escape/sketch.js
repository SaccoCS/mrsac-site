let jig;
let squar;
let REGISTRATION = 0,
  MAZE = 1,
  CIRCLE = 2,
  JIGSAW = 3,
  RESULTS = 4;
let LEE = 2,
  SACCO = 0,
  CRAWFORD = 3,
  BIGGERSTAFF = 1;
let phase = MAZE;
let myId = 0
let myClue;
let clueAlpha=0;
let debugDiv;

let firstAng = true;
let connected = false;
let saws = [];
let squars = [];

let bgCol;

function preload() {
  images = [
    loadImage("sacco.png"),
    loadImage("biggerstaff.png"),
    loadImage("lee.png"),
    loadImage("crawford.png"),
  ];
}
function setup() {
  let params = getURLParams();
  if (params.id) {
    myId = params.id;
  }

  COLORS = [
    color(90, 255, 255),
    color(90, 255, 90),
    color(255, 255, 90),
    color(255, 90, 90),
  ];
  initSockets();
  debugDiv = initReg();
  pixelDensity(1);

  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  createCanvas(windowWidth, windowHeight-50);

  FAMS = [];
  FAMS[LEE] = { numRows: 4, numCols: 5, img: images[2] };
  FAMS[SACCO] = { numRows: 4, numCols: 5, img: images[0] };
  FAMS[BIGGERSTAFF] = { numRows: 4, numCols: 5, img: images[1] };
  FAMS[CRAWFORD] = { numRows: 4, numCols: 5, img: images[3] };

  otpt = createP();
  
  for(let i  in COLORS){
    let f = FAMS[i]
    saws[i] = new Jigsaw(images[i],f.numRows,f.numCols);
   
    squars[i] = new Square(saws[i])
    
    
    
  }
  debugDiv.child(createP())
  pbs=[];
  for(let i =0; i<4; i++){
    pbs.push(createButton(i+""))
    debugDiv.child(pbs[i])
    pbs[i].style("width","32px")
    pbs[i].style("height","32px")
    pbs[i].mousePressed(()=>{
      
      socket.emit('phase_set',i)
    });
    
  }
  
  bgCol = color(120)
  
  

}

function draw() {
  background(240);
  background(bgCol)
  let squar = squars[myId];

  stroke(0);
  squar.paint();

  if (phase == JIGSAW) saws[myId].draw();
  
  
  
  
  
  myClue = '_'+rotationZ
  
  let d =99

  if (phase == CIRCLE) {
    if (
      rotationZ != null &&
      connected &&
      abs(rotationX) < 10 &&
      abs(rotationY) < 10
    ) {
      if (firstAng == true) firstAng = rotationZ;

      let d = firstAng - rotationZ;
      while (d < -180) {
        d += 360;
      }
      while (d > 180) {
        d -= 360;
      }
      // myClue = firstAng;
    }
    
    
    
  
  }
  
    
      socket.emit("angle_update", { index: myId, angle: d });
  if(myClue){
    // let c = saws[myId].getCenter();
    
    noStroke();
    fill(255,min(255,clueAlpha+=10))
    //stroke(0,clueAlpha++);
    strokeWeight(15)
    textAlign(CENTER,CENTER)
    textSize(20)
    text(nf(myClue+"",0,1),width/2,height/2+24)
  }
  
  
}

function initSockets() {
  socket = io.connect("https://serverdemo.mrsacco.repl.co");
  socket.on("who_dis", (data) => {
    setPhase(data.phase);
    // squar.phaseNum = data.phase;

    // socket.emit('identity',0);
    // socket.emit('identity',1);
    // socket.emit('identity',2);
    // socket.emit('identity',3);
    socket.emit("identity", myId);
    connected = true;
  });

  socket.on("phase_update", (data) => {
    setPhase(data.phase);
   
    
    if(data.puzzlePoints[myId]){
     let arr = (data.puzzlePoints[myId]);
      saws[myId].applyPoints(arr);
    }
   // console.log( data)
    if(data.results[myId] != -1)
      myClue = data.CLUE[myId];
    else
      myClue = undefined;
    
    connected = true;
  }); 
  
  socket.on("clue", (data) => {
    
    
    if(data.results[myId] != -1)
      myClue = data.CLUE[myId];
    else
      myClue = undefined;
  });
}

function setPhase(p) {
  phase = p;

  squars[myId].phaseNum = p;

  if (p == REGISTRATION) {
  } else if (p == MAZE) {
  } else if (p == CIRCLE) {
  } else if (p == JIGSAW) {
  } else {
  }
}

function keyPressed() {
  let k = keyCode - 48;

  if (k >= 0 && k < 4) {
    myId = k;
  }
}

let lastMilli = 0;
function mousePressed() {
  let mis = millis();
  let passed = floor(mis - lastMilli);
  if (passed < 200) return;
  lastMilli = mis;
  //
  // squar.phaseNum = (squar.phaseNum+1)%3;

  if (phase == MAZE) {
    socket.emit("color_update", myId);
  } else if (phase == 1) {
  } else if (phase == 2) {
  } else {
  }
  saws[myId].mousePressed();
}

function mouseReleased() {
  saws[myId].mouseReleased();
}



function initReg(){
  let regButs=[];
  let regDiv = select("#hax");
  regDiv.position(30,30)
  regDiv.style("width","340px")
  let d1 = 
  // regDiv.child(createP("REGISTRATION"))
  regDiv.child(regButs[0] = createButton(" "))
  regDiv.child(regButs[1] = createButton(" "))
  let p = createP("</br>")
  p.style("clear","left")
  regDiv.child(regButs[2] = createButton(" "))
  regDiv.child(regButs[3] = createButton(" "))
  
  regButs.forEach((but,i)=>{
    but.style("background-color",COLORS[i])
    but.style("width","30px")
    but.style("height","30px")
    
    but.mousePressed(()=>{
      console.log("Clicked")
      // socket.emit("identity",i)
      myId = i;
    socket.emit("identity", i);
});
  
    
  })
  
  
  return regDiv
}