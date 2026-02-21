function setup() {
  noCanvas();
  
  button = createButton("New Example").style('display', 'inline:block');

 
  let params = getURLParams();
  let fun = undefined;
  if(params){
    switch(params.question){
      case 'average':fun = averageDemo ;break;
      case 'colSum':  fun = colSumDemo;break;
      case 'rowSum':  fun = rowSumDemo;break;
      case 'largestValue':  fun = largestValueDemo;break;
      case 'lengthVerifier': fun = lengthVerifierDemo;break;
      case 'seatFinder':  fun = seatFinderDemo;break;
      case 'serial':  fun = serialDemo;break;
    }
  }
  

  
  out = createP().style('font-family', 'consolas').style('width', '500px');
  
    button.mousePressed(fun);
  fun();
}

function toStr(list) {

  let ret = "{";
  for (let r = 0; r < list.length; r++) {
    let row = "{";
    for (let c = 0; c < list[0].length; c++) {
      let element = list[r][c];
      row += element + (c < list[0].length - 1 ? ", " : "}");
    }
    ret += row + "" + (r < list.length - 1 ? ",<br>&nbsp;" : "}");
  }
  return ret;
}


function gen(rows, cols, type) {
  let ret = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      row.push(randVal(type));
    }
    ret.push(row);
  }
  return ret;
}

function randVal(type) {
  if (type == "int") {
    return int(random(-9, 31));
  }
  if (type == "boolean") {
    return random() < .5;
  } else if (type == "double") {
    return random(-4, 21);
  } else if (type.length > 5 && type.substring(0, 6) == "string") {

    return randStr(int(type.substring(6)));
  } else
    return "STR";
}

function averageDemo() {
  let arr = gen(random(2, 7), random(2, 7), "int");

  let a = 0;
  arr.forEach(x => x.forEach(y => a += y));
  let s = "";
  s += toStr(arr) + "<br>" + "<br>";
  s += "Correct Average: " + a / (arr.length * arr[0].length);
  out.html(s)



}

function colSumDemo() {
  let arr = gen(random(2, 7), random(2, 7), "int");
  let col = int(random(arr[0].length));
  let sum = 0;
  for (let r = 0; r < arr.length; r++) {
    sum += arr[r][col];
  }




  let a = 0;
  arr.forEach(x => x.forEach(y => a += y));
  let s = toStr(arr);
  s += "<br><br>Column: " + col;
  s += "<br>Correct Sum: " + sum;
  out.html(s);



}

function rowSumDemo() {
  let arr = gen(random(2, 7), random(2, 7), "int");
  let row = int(random(arr.length));
  let sum = 0;
  for (let c = 0; c < arr[0].length; c++) {
    sum += arr[row][c];
  }

  let a = 0;
  arr.forEach(x => x.forEach(y => a += y));
  let s = toStr(arr);
  s += "<br><br>Row: " + row;
  s += "<br>Correct Sum: " + sum;
  out.html(s);



}

function largestValueDemo() {
  let arr = gen(random(2, 5), random(2, 4), "int");
  let large = undefined;

  let a = 0;
  arr.forEach(x => x.forEach(y => {
    if (large == undefined || y > large)
      large = y
  }));
  let s = "";
  s += toStr(arr) + "<br>" + "<br>";
  s += "Largest Value: " + large;
  out.html(s);

}

function lengthVerifierDemo() {
  let len = int(random(3, 7));
  let arr = gen(random(2, 5), random(2, 4), "string" + len);

  let allGood = random() > .5;

  if (!allGood) {
    let numBad = random(0, 4);
    for (let i = 0; i < numBad; i++) {
      let r = int(random(arr.length));
      let c = int(random(arr[0].length));
      arr[r][c] = randStr(random() < .5 ? int(random(len + 1, 8)) : int(random(3, len)));
    }
  }

  let r = int(random(arr.length));
  let c = int(random(arr[0].length));



  let s = "";
  s += toStr(arr) + "<br>" + "<br>";
  s += `All Length ${len}: ${allGood}`;

  out.html(s);
}

function randStr(num) {
  let s = '"';

  for (let i = 0; i < num; i++) {
    s += char(random(65 + 32, 65 + 32 + 26))
  }
  return s + '"';
}


function seatFinderDemo() {
  let arr = gen(random(2, 7), int(random(3, 5)), "boolean");

 arr.forEach(row =>{
   
    for (let c = 0; c < row.length - 1; c++) {
        // console.log(row[c+1])
      if (row[c] && row[c + 1]) {
        row[c+1] = false;
      }
    }

  });
  
  let avail = random() > .5?int(random(1,4)):0;
  
  for(let i =0; i<avail; i++){
    
  let r = int(random(arr.length));
  let c = int(random(arr[0].length-1));
    arr[r][c] = true;
    arr[r][c+1] = true;
  }
  


  let s = "";
  s += toStr(arr) + "<br>" + "<br>";
  s += "Available?: "+(avail>0);
  out.html(s);
}

function serialDemo(){
  let arr = gen(random(2, 7), int(random(3, 5)), "boolean");
  
  let list = [];
  
  arr.forEach(row=>row.forEach(element=>{
    list.push(element);
  }))
  

 let prettier = "[";
  list.forEach((x,i)=>{
    prettier += x + (i<list.length-1?", ":"]")
  })
  


  let s = "";
  s += toStr(arr) + "<br>" + "<br>";
  s += `Serial: ${prettier}`;
  out.html(s);
}