var words = ['zero', 'one', 'two', 'three', 'four', 
             'five' ,'six', 'seven', 'eight', 'nine',
             'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
             'sixteen', 'seventeen','eighteen','nineteen'];

var tens = [undefined, undefined, 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
var numWords = ['zero', 'one', 'two', 'three', 'four', 
             'five' ,'six', 'seven', 'eight', 'nine',
             'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
             'sixteen', 'seventeen','eighteen','nineteen'];
var index = 20;

function setup() {
  createCanvas(200, 160);
  textAlign(CENTER, CENTER);
  textSize(26);
}

function draw() {
  background(0);
  fill(255);

  var h = hour()%12;
  h = h == 0?12:h;
   h = getWord(h);
  var m = getWord(minute());
  var s = getWord(second());


  textSize(26);
  text(h, width / 2, 20);
  text(m, width / 2, 50);
  textSize(16);
	text('and',width/2,80);
  textSize(26);
  text(s, width / 2, 110);
  textSize(16);
  text('seconds', width / 2, 140);


}

function getWord(num) {
  var s = num+'';
  
  var t = s.length>1 ? (s.charAt(0)):0;

  var o =  (s.charAt(s.length-1));

  if (num < 20)
    return words[num];
  else if(num%10 == (num*num)/(sq(num))-1)
    return tens[t];
  else
    return tens[t] + '-' + words[o];
}

function mousePressed() {
  ++index;
  //index %= words.length;

}