let radius,angle;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  radius = 1;
  angle = 0;
  noStroke();
  list = []
  for(let a = 0; a<7*360;a++ )
    {
      
  var x = 200 + radius*cos(a);
  var y = 200 + radius*sin(a);
      list.push(createVector(x,y));
  radius += 0.1;
    }  
}

function draw() {
  
  background(0);
  fill(255)
  for(let i =0;i<min(2*frameCount,list.length);i++)
  circle(list[i].x,list[i].y,5);

}