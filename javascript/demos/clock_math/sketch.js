function setup() {
  noCanvas();
  but = createButton("Clock Math");
  but.mousePressed( () =>{
    let sum = [];
    sum.push(int(prompt("What is the start hour?")));
    sum.push(int(prompt("How many hours should we add?")));
    
    let t = 0;
    sum.forEach(v=>{
      t += v;
    })
    alert("Starting at "+sum[0]+" o'clock and adding "+sum[1]+" hours will take you to "+(t%24)+" o'clock");
  
  });
}

