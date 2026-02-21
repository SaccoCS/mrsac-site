let c = 0;
function setup(){
    createCanvas(200,200);
    ellipseMode(RADIUS);
    noFill();
    frameRate(10);
    strokeWeight(5);
    background(0);
}


function draw(){
    
    
    if( c < 10){
    let x = random(width);
    let y = random(height);
    stroke(random(256),random(256),random(256));
    circle(x,y,10);
    c++;
    }
}

function mousePressed(){
    background(0);c = 0;
}