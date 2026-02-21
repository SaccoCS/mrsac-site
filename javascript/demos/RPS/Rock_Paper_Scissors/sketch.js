let message, playerScore=0, compScore=0, playerChoice, compChoice;

function preload(){
  rockImage = loadImage('rock.png');
  paperImage = loadImage('paper.png');
  scissorsImage = loadImage('scissors.png');
}

function setup() {
  createCanvas(350, 285);
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER,CENTER);
  // pixelDensity(2);
  strokeWeight(2)
  textFont("monospace")
  textSize(22);
  
  message = ""
  playerChoice =  compChoice = 0;
  
  player = new Choice(1,"Player");
  computer = new Choice(2,"Computer");
  
}

function drawBoard(){
  background("#6167A3");
  
  stroke("#2E3059");
  let gap = 100;
  rect(175-gap,240,90,36,4)
  rect(175,240,90,36,4)
  rect(175+gap,240,90,36,4)  
  
  noStroke();
  fill("#2E3059");
  textSize(16)
  text("Rock",175-gap,240);
  text("Paper",175,240);
  text("Scissors",175+gap,240);
  
}

function draw() {
  drawBoard();  

  player.paint(100,104);
  computer.paint(250,104); 

  text(message,width/2, 200);
}

function mousePressed(){ 
  
  if(mouseInBox(75,240,80,36)){
    go(0);    
  }
  if(mouseInBox(175,240,80,36)){
    go(1);
  }
  if(mouseInBox(275,240,80,36)){
    go(2);
  }
}



function textChoice(choice){
  return ["Rock","Paper","Scissors"][choice];
}

function go(choice){  
  
  player.choice = choice;
  computer.choice = floor(random(3));
  
  if((player.choice + 1)%3 == computer.choice ){
    message = textChoice(player.choice) +" loses to "+textChoice(computer.choice);
    computer.score++;
  }
 else if((player.choice + 2)%3 == computer.choice ){
    message = textChoice(player.choice) +" defeats "+textChoice(computer.choice);
   player.score++
  }else{
    message = "Tie"
  }
  
  if(playerScore >= 5)
    message = "Player Wins!";
  
  if(compScore >= 5)
    message = "Computer Wins!";
  
}


function mouseInBox(x,y,w,h){
  return mouseX > x-w/2 && mouseX < x+w/2 && mouseY > y-h/2 && mouseY < y+h/2;
}