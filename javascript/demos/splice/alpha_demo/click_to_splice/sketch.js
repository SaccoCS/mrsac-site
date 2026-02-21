var chars;

function setup() {
  createCanvas(521, 21);
  textAlign(CENTER, CENTER);
  textSize(11);
  chars = [];
  
  for(let c of "Click Me!")
    chars.push(c)

}

function draw() {
  background(0);

  for (var i = 0; i < chars.length; i++) {
    //calculate x value based on index
    var x = 20 * i;

    //Draw Rectangle
    fill(255)
    rect(x, 0, 20, 20);

    //Draw text
    fill(0);
    text(chars[i], x + 10, 12);

  }

}

function mousePressed() {
  var index = floor(mouseX / 20);
  chars.splice(index, 1);
}

function keyPressed() {
  
  var character = char(unchar(key));

  if (character != undefined)  //if character is ASCII
    
    //Pushes the recent key press to the array
    chars.push(key);
  if(keyCode == BACKSPACE)
    chars.splice(chars.length-1);
}