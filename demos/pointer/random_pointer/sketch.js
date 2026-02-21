function setup() {
  createCanvas(200,100);
  list = [];
  for (let i = 0; i < 1; i++) {

    list.push(new Pointer());
  }
  let b = createButton("Reload");
  b.mousePressed(()=>{list[0] = new Pointer();});
  b.style('padding','5px');
  b.style('margin-top','5px');

}

function draw() {
  background(220);


  for (let p of list) {
 //   p.pointTo(mouseX, mouseY)
    p.paint();
  }

}

function mousePressed(){
  
 
}


function Pointer() {

  
  var a = random(TWO_PI);
  this.dx = 30 * cos(a);
  this.dy = 30 * sin(a);

  this.paint = function() {
    strokeWeight(3);
    ellipse(this.x, this.y, 20, 20);

    line(this.x, this.y, this.x + this.dx, this.y + this.dy);

  }
  
  this.randomize = ()=>{
    
    this.x = random(15,width-15);
  this.y = random(15,height-15);
  }
this.randomize();
  this.pointTo = (x, y) => {
    let DX = x - this.x;
    let DY = y - this.y;
    
    let len = dist(x,y,this.x,this.y);

    this.dx = DX*30/len;
    this.dy = DY*30/len;

  }


}