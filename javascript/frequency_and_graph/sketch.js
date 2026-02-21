var vals = [];
var uIn;
var val_str = '';

function setup() {
  noCanvas();
  
  updateHtml();



  // createHtml();
}

function changeEvent() {
  let val = uIn.value();
  if (val.toUpperCase() == 'X')
    vals = [];
  else if (isValid(val)) {
    add(val);
  }
  updateHtml();
  uIn.html('');
}

function isValid(val) {
  if (isNaN(val))
    return false;

  val = parseInt(val);


  return val > -100 && val < 100;
}

function add(val) {
  // createP(val);
  val = parseInt(val);
  var go = true;
  for (let i = 0; i < vals.length; i++) {
    if (val == vals[i].value) {
      vals[i].counter += 1;
      go = false;
    }


  }

  let count = 0;
  for (let i = 0; i < vals.length; i++) {
    if (parseInt(vals[i].value) < val)
      count++;



  }


  let obj = {
    counter: 1,
    value: parseInt(val)
  }
  if (go) {
    // console.log('Adding ' + val + ' at ' + count);
    vals.splice(count, 0, obj);
  }



}

function updateHtml() {
  removeElements();
  let bigDiv = createDiv('');

  let head = createP('Frequency Objects');
  head.style('font-family', 'Arial');
  head.style('font-size', '18pt');
  head.style('margin', '5px');
//  bigDiv.child(head);

  let inputDiv = createDiv('');
  inputDiv.style('clear','right');
//  bigDiv.child(inputDiv);

  let p = createP('Add int Values:');
  p.style('font-family', 'Arial');
  p.style('float', 'left');
  p.style('margin', '5px');

  inputDiv.child(p);
  uIn = createInput('')
  uIn.style('text-align', 'center');
  uIn.style('margin', '2px');
  uIn.style('width', '20px');

  uIn.changed(changeEvent);
  inputDiv.child(uIn);
  createP('');
  
  let listBar = createDiv('');
//  bigDiv.child(listBar);
 // listBar.style('background-color','blue');
 // listBar.style('border','blue');
 // listBar.style('display','inline');
 // listBar.style('height','75px');
  
  for (let i = 0; i < vals.length; i++) {
    let h = createHtml(vals[i].value, vals[i].counter);
    listBar.child(h);
  }
  
  uIn.html('');
  uIn.elt.focus();
 // console.log(listBar.parent());
  
  createP('');
   p = createP('<br/>Adding a NEW value will cause a new Frequency Object to be added to the List (in order)<br/>' +
    'Adding a REPEAT value will simply cause the existing Frequency Object to be incremented.' +
    '<br/><br/>Type x to clear the list');

  p.style('font-family', 'Arial');
  p.style('font-size', "10pt");
  p.style('clear', 'left');
  p.style('margin', '5px');
}


function updateHtml0() {
  removeElements();
  let bigDiv = createDiv('');
  bigDiv.mouseOver(focusOnIt);
  let h1 = createP('Frequency Objects');
  h1.style('font-family', 'Arial');
  h1.style('font-size', '18pt');

  h1.style('margin', '5px');
  bigDiv.child(h1);

  let d1 = createDiv('');
  bigDiv.child(d1);

  let p = createP('Add int Values:');
  p.style('font-family', 'Arial');
  p.style('float', 'left');
  p.style('margin', '5px');
  d1.child(p);

  uIn = createInput('')
  uIn.style('text-align', 'center');

  //uIn.size(20, 16);
  uIn.style('margin', '2px');
  uIn.style('width', '20px');
  uIn.changed(changeEvent);
  // d1.child(uIn);
  let d = createDiv('');
  d.style('align', 'left');
  bigDiv.child(d);

  //d.style('border','1px solid black');
  for (let i = 0; i < vals.length; i++) {
    let h = createHtml(vals[i].value, vals[i].counter);
   
    h.parent(d);
  }


  p = createP('<br/>Adding a NEW value will cause a new Frequency Object to be added to the List (in order)<br/>' +
    'Adding a REPEAT value will simply cause the existing Frequency Object to be incremented.' +
    '<br/><br/>Type x to clear the list');

  p.style('font-family', 'Arial');
  p.style('font-size', "10pt");
  p.style('clear', 'left');
  p.style('margin', '5px');
  p.mouseOver(focusOnIt);
  d = createDiv('');
  d.child(p);
  uIn.html('');
  uIn.elt.focus();
  
 
   
}

function focusOnIt() {

  console.log('f');
  uIn.elt.focus();
}

function createHtml(v, c) {
  let d = createDiv('');
  d.size(50, 50);
  d.style('border-radius', '10px')
  d.style('background-color', color(230));
  d.style('border', '2px solid black');
  d.style('margin', '5px');
 // d.style('display', 'inline-block');
  d.style('float', 'left');

  var num = createP(v);
  num.style('margin', '1px')
  num.style('font-family', 'Arial')
  num.style('font-size', '20pt')
  num.style('text-align', 'center')
  d.child(num);


  num = createP(c);
  num.style('margin', '1px')
  num.style('font-family', 'Arial')
  num.style('font-size', '10pt')
  num.style('text-align', 'center')
  d.child(num);

  // d.mouseOver(focusOnIt);

  return d;

}

function draw() {



}