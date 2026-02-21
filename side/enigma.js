
const I = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
const II = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
const III = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
const REFLECTOR_B = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';



function Rotor(key)
{
   this.right = key;
   this.left = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   
   this.rotate = function()
   {
      this.right = this.right.substring(1) + this.right.substring(0,1);
      this.left = this.left.substring(1) + this.left.substring(0,1);
   }
   
   this.scramble = function(input)
   {
      var let = this.right.substring(input,input + 1);
	  var ind = this.left.indexOf(let);
	  return ind;
   }
   
   this.scrambleBack = function(input)
   {
      var let = this.left.substring(input,input + 1);
	  var ind = this.right.indexOf(let);
	  return ind;
   }
}


function EnigmaMachine(leftKey,midKey,rightKey)
{
	this.left = new Rotor(leftKey);
	this.mid = new Rotor(midKey);
	this.right = new Rotor(rightKey);
	this.reflector = new Rotor('YRUHQSLDPXNGOKMIEBFZCWVJAT');
	
	this.scramble = function(let)
	{
		this.right.rotate();
	   var index = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(let);
	   index = this.right.scramble(index);
	   index = this.mid.scramble(index);
	   index = this.left.scramble(index);
	   index = this.reflector.scramble(index);
	   index = this.left.scrambleBack(index);
	   index = this.mid.scrambleBack(index);
	   index = this.right.scrambleBack(index);
	   
	
	   return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substring(index,index+1);
	}
	
}

var formatted = function(str)
{
	
	var ret = '';
	for(var i = 0; i<str.length; i++)
	{
	   var let = str.substring(i,i+1);
	   if( let.toUpperCase() != let.toLowerCase() )
	   {
	   
	      if(ret.length%6 == 5 && ret.length != 0)
		  ret+=" ";
	   
	      ret += let.toUpperCase();
	   }
	   
	   
	}
	return ret;
}

var stripSpaces = function(str)
{
    var ret = '';
	
	for(var i = 0; i<str.length; i++)
	{
	   var let = str.substring(i,i+1);
	   
	   if( let.toUpperCase() != let.toLowerCase() )
	   {
	      ret += let.toUpperCase();
	   }	   
	}
	
	return ret;
}

var keyPress = function()
{
    var text = document.getElementById('input');
	//text.value = (formatted(text.value));
	
	var noSpace = stripSpaces(text.value);
	

	var out = document.getElementById('output');
	
	
	var e = new EnigmaMachine(I,II,III);
	
	out.innerHTML='';
	for(var i = 0; i < noSpace.length; i++)
	{
	   out.innerHTML += e.scramble(noSpace.substring(i,i+1));
	}
	
	out.innerHTML = '<strong>Output</strong>:<br/>'+formatted(out.innerHTML);
}



var change = false;

var firstClick = function()
{
	var area = document.getElementById('input');
	
	if(!change)
		area.select();
	
	
}


var changeMade = function()
{
	var area = document.getElementById('input');
	area.style.color = '#000';
	change=true;
}


