function setup() {
  noCanvas();
  but = createButton("Min-Sec");
  but.mousePressed( () =>{
    let sum = [];
    sum.push(int(prompt("Enter a number of seconds")));
    
    let t = 0;
    sum.forEach(v=>{
      t += v;
    })
    alert(`${t} seconds is ${floor(sum[0]/60)} minutes and ${t%60} seconds`);
  
  });
}

