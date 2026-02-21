var cnt2, cnt3, cnt4, cnt5, cnt6, cnt7, cnt8, cnt9, cnt10, cnt11, cnt12;
var d1, d2;

function setup() {
  createCanvas(500, 310);
  rectMode(CENTER);


  cnt2 = 0;
  cnt3 = 0;
  cnt4 = 0;
  cnt5 = 0;
  cnt6 = 0;
  cnt7 = 0;
  cnt8 = 0;
  cnt9 = 0;
  cnt10 = 0;
  cnt11 = 0;
  cnt12 = 0;

  d1 = 1;
  d2 = 2;
}

function draw() {
  fill(0);
  background(151);
  translate(48, 60);
  dice(d1, 50);

  translate(70, 0);
  dice(d2);
  resetMatrix();
  
  histogram();


  
  
  
  
  rectMode(CORNER);
  noFill();
  fill(200);
  stroke(0);
  rect(35,120,100,45,5);
  
  textAlign(CENTER,CENTER);
  //noFill();
  fill(0);
  noStroke();
  strokeWeight(1);

  textSize(14);
  text("Roll",35,120,100,50);
  
  //////////////////////
  
  rectMode(CORNER);
  strokeWeight(3);
  noFill();
  fill(200);
  stroke(0);
  rect(35,190,100,45,5);
  
  textAlign(CENTER,CENTER);
  //noFill();
  fill(0);
  noStroke();
  strokeWeight(1);

  textSize(14);
  text("Reset",35,190,100,50);

}

function rollDice() {
  d1 = int(random(1, 7));
  d2 = int(random(1, 7));
}

function tallyResult(){
 var sum = d1 + d2;
  
 switch(sum){
   case 2:cnt2++;break;
   case 3:cnt3++;break;
   case 4:cnt4++;break;
   case 5:cnt5++;break;
   case 6:cnt6++;break;
   case 7:cnt7++;break;
   case 8:cnt8++;break;
   case 9:cnt9++;break;
   case 10:cnt10++;break;
   case 11:cnt11++;break;
   case 12:cnt12++;break;
           }
}

function mousePressed() {
  
  if( mouseX >= 35 && mouseX <= 135 && mouseY >= 110 && mouseY <= 160 )
  {rollDice();
  tallyResult();}
  
  
  if( mouseX >= 35 && mouseX <= 135 && mouseY >= 180 && mouseY <= 230 )
  { cnt2 = 0;
  cnt3 = 0;
  cnt4 = 0;
  cnt5 = 0;
  cnt6 = 0;
  cnt7 = 0;
  cnt8 = 0;
  cnt9 = 0;
  cnt10 = 0;
  cnt11 = 0;
  cnt12 = 0;}
}

function histogram() {
  fill(0);
  textSize(12);
  rectMode(CORNER);
  textAlign(CORNER,CORNER);

  var wid = 10;

  text("2", 180, 40);
  text("3", 180, 65);
  text("4", 180, 90);
  text("5", 180, 115);
  text("6", 180, 140);
  text("7", 180, 165);
  text("8", 180, 190);
  text("9", 180, 215);
  text("10", 180, 240);
  text("11", 180, 265);
  text("12", 180, 290);
  
  
  fill(200);
  stroke(0);
  
  rect(200, 30, cnt2 * wid, 16);
  rect(200, 65 - 10, cnt3 * wid, 16);
  rect(200, 90 - 10, cnt4 * wid, 16);
  rect(200, 115 - 10, cnt5 * wid, 16);
  rect(200, 140 - 10, cnt6 * wid, 16);
  rect(200, 165 - 10, cnt7 * wid, 16);
  rect(200, 190 - 10, cnt8 * wid, 16);
  rect(200, 215 - 10, cnt9 * wid, 16);
  rect(200, 240 - 10, cnt10 * wid, 16);
  rect(200, 265 - 10, cnt11 * wid, 16);
  rect(200, 290 - 10, cnt12 * wid, 16);


}

function dice(num, size) {
  
  textSize(12);
  rectMode(CENTER);
  noStroke();
  text(num, 0, 40);
  if (!size) {
    size = 48;
  }

  var gap = .25 * size;
  var pip = size * .15;
  stroke(0);
  strokeWeight(3);
  fill(255);
  rect(0, 0, size, size, size / 10);

  noStroke();
  fill(0);
  if ([2, 3, 4, 5, 6].includes(num))
    ellipse(-gap, -gap, pip);

  if (num == 6)
    ellipse(-gap, 0, pip);


  if ([4, 5, 6].includes(num))
    ellipse(-gap, gap, pip);


  if ([4, 5, 6].includes(num))
    ellipse(gap, -gap, pip);

  if ([6].includes(num))
    ellipse(gap, 0, pip);

  if ([2, 3, 4, 5, 6].includes(num))
    ellipse(gap, gap, pip);



  if ([1, 3, 5].includes(num))
    ellipse(0, 0, pip);
}