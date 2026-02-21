var message = "Ask a Question and Click";
var alph = 0;
var choices = ["It is certain."
 ,"It is decidedly so."
 ,"Without a doubt."
 ,"Yes - definitely."
 ,"You may rely on it."
 ,"As I see it, yes."
 ,"Most likely."
 ,"Outlook good."
 ,"Yes."
 ,"Signs point to yes."
 ,"Reply hazy, try again."
 ,"Ask again later."
 ,"Better not tell you now."
 ,"Cannot predict now."
 ,"Concentrate and ask again."
 ,"Don't count on it."
 ,"My reply is no."
 ,"My sources say no."
 ,"Outlook not so good."
 ,"Very doubtful."]
function setup() {
  createCanvas(430, 100);
  textAlign(CENTER,CENTER);
  textSize(32);
  textFont("Permanent Marker");
}

function draw() {
  background(0);
  fill(222,59,59,alph);
  text(message,width/2,height/2);
  
  alph+=2;
  
}

function mousePressed(){
  message = choices[floor(random(choices.length))];
  alph = 50;
}

