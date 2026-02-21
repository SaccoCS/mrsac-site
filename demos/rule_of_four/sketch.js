
    let vals = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];

function setup() {
  noCanvas();
  let info = createP("Click the hexadecimal digits to change their value. Observe how changing one digit will only affect four bits of the binary number");
  info.style('font-size','20px');
  info.style('font-family','Arial');
  info.style('width','400px');
  
  squares = [];
  squares.push( new Square());
  squares.push( new Square());
  squares.push( new Square());
  squares.push( new Square());
 // console.log(s);
  b = createP(toBinary(0));
  b.style('width','380px');
  b.style('font-family','consolas')
  b.style('font-size','32px')
  b.style('text-align','center');
  
  d = createP(0);
  d.style('width','380px');
  d.style('font-family','consolas')
  d.style('text-align','center');
  d.style('font-size','32px')
  
 // up();
}

function draw() {
  background(220);
}

function up(){
  let pv = 1;  
  let sum =0;
  for(let i = squares.length-1;i>=0;i--)
    {
      
       let v = squares[i].val;
       sum += v*pv;
      pv*=16;
    }
  console.log((sum));
  b.html(toBinary(sum));
  d.html(nfc(sum));
}

function toBinary(dec){
  let b = toBinaryRecur(int(dec));
  while (b.length < 4*4) 
  {
    b = "0" + b;
  }
  b=b.slice(0,4)+' '+b.slice(4,8)+' '+b.slice(8,12)+' '+b.slice(12);;
  return b;
}

function toBinaryRecur(dec) {
  if (dec > 0)
    return toBinaryRecur(int(dec / 2)) + (dec % 2).toString();
  else
    return "";
}
