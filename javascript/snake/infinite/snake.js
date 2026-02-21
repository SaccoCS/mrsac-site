class Snake{
  
  constructor(){
    this.head = new Loc(3,3);
    this.dir = new Loc(0,1);
    this.body = [];
    
    for(let i =0; i<7; i++){
      this.go();
    }
  }
  
  draw(){
    fill('red')
  let x = this.head.c*10;
  let y = this.head.r*10;
  rect(x,y,10);
   // fill(200);
    for(let l of this.body){
      let p = l.xy();
      rect(p.x,p.y,10)
    }
  }
  
  go(){
   this.body.push(this.head);
    this.head = this.head.plus(this.dir);
    
    if(this.body.length>7)
    this.body.splice(0,1)
  }
  
  turn(d){
    switch(d){
      case 37: this.dir = new Loc(0,-1);break;
      case 38: this.dir = new Loc(-1,0);break;
      case 39: this.dir = new Loc(0,1);break;
      case 40: this.dir = new Loc(1,0);break;
    }
  }
}

function keyPressed(){
  snake.turn(keyCode);
}


class Loc{
  constructor(r,c){
    this.r = r;
    this.c = c;
  }
  
  plus(l){
    
    return new Loc(this.r+l.r,this.c+l.c);
  }
  
  xy(){
    let x = this.c*10;
  let y = this.r*10;
    return {x,y};
  }
  
  toString(){
    return `${r},${c})`;
  }
}